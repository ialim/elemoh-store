import { NextApiRequest, NextApiResponse } from "next";
import { validateRoute } from "../../../../lib/auth";
import prisma from "../../../../lib/prisma";

export default validateRoute(
  async (req: NextApiRequest, res: NextApiResponse, user: any) => {
    if (!user.role.permissions.product.includes("delete")) {
      res.status(401);
      res.json({ error: "Not Authorized" });
      return;
    }

    const { collectionId } = req.body;
    try {
      let collection;
      collection = await prisma.collection.findUnique({
        where: { id: collectionId },
      });

      if (!collection) {
        res.status(401);
        res.json({ error: "collection not found" });
        return;
      }

      collection = await prisma.collection.update({
        where: { id: collectionId },
        data: {
          facetVales: {
            deleteMany: {},
          },
          variants: {
            deleteMany: {},
          },
        },
      });

      collection = await prisma.collection.delete({
        where: { id: collectionId },
      });
      res.json(collection);
    } catch (error) {
      res.status(500);
      res.json({ error: "Something went wrong" });
    }
  }
);

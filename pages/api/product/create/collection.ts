import { NextApiRequest, NextApiResponse } from "next";
import { validateRoute } from "../../../../lib/auth";
import prisma from "../../../../lib/prisma";

export default validateRoute(
  async (req: NextApiRequest, res: NextApiResponse, user: any) => {
    if (!user.role.permissions.product.includes("create")) {
      res.status(401);
      res.json({ error: "Not Authorized" });
      return;
    }

    const { name } = req.body;

    let collection;

    try {
      collection = await prisma.collection.findUnique({ where: { name } });

      if (collection) {
        res.status(401);
        res.json({ error: "collection already exist" });
        return;
      }

      collection = await prisma.collection.create({
        data: {
          name,
        },
      });
      res.json(collection);
    } catch (error) {
      res.status(500);
      res.json({ error: "Something went wrong" });
    }
  }
);

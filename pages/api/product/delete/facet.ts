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

    const { facetId } = req.body;
    try {
      let facet;
      facet = await prisma.facet.findUnique({ where: { id: facetId } });

      if (!facet) {
        res.status(401);
        res.json({ error: "facet not found" });
        return;
      }

      facet = await prisma.facet.update({
        where: { id: facetId },
        data: {
          values: {
            deleteMany: {},
          },
        },
      });

      facet = await prisma.facet.delete({ where: { id: facetId } });
      res.json(facet);
    } catch (error) {
      res.status(500);
      res.json({ error: "Something went wrong" });
    }
  }
);

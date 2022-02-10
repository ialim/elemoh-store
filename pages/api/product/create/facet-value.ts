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

    const { name, facetId } = req.body;

    let facetValue;

    try {
      facetValue = await prisma.facetValue.findUnique({ where: { name } });

      if (facetValue) {
        res.status(401);
        res.json({ error: "facet already exist" });
        return;
      }

      const facet = await prisma.facet.findUnique({ where: { id: facetId } });

      if (!facet) {
        res.status(401);
        res.json({ error: "facet does not exist" });
        return;
      }

      facetValue = await prisma.facetValue.create({
        data: {
          name,
          facet: {
            connect: { id: facet.id },
          },
        },
      });
      res.json(facetValue);
    } catch (error) {
      res.status(500);
      res.json({ error: "Something went wrong" });
    }
  }
);

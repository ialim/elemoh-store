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

    let facet;

    try {
      facet = await prisma.facet.findUnique({ where: { name } });

      if (facet) {
        res.status(401);
        res.json({ error: "facet already exist" });
        return;
      }

      facet = await prisma.facet.create({
        data: {
          name,
        },
      });
      res.json(facet);
    } catch (error) {
      res.status(500);
      res.json({ error: "Something went wrong" });
    }
  }
);

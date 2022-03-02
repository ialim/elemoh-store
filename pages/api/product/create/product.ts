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

    const { name, description, facetValues, variants } = req.body;

    let product;

    try {
      product = await prisma.product.findUnique({ where: { name } });

      if (product) {
        res.status(401);
        res.json({ error: "product already exist" });
        return;
      }

      product = await prisma.product.create({
        data: {
          name,
          description,
          facetValues: { connect: facetValues },
          variants: {
            create: variants,
          },
        },
      });
      res.json(product);
    } catch (error) {
      res.status(500);
      res.json({ error: "Something went wrong" });
    }
  }
);

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

    const { name, barcode, productId, facetValues } = req.body;

    let variant;

    try {
      variant = await prisma.productVariant.findUnique({ where: { barcode } });

      if (variant) {
        res.status(401);
        res.json({ error: "variant already exist" });
        return;
      }

      const product = await prisma.product.findUnique({
        where: { id: productId },
      });

      if (!product) {
        res.status(401);
        res.json({ error: "product does not exist" });
        return;
      }

      variant = await prisma.productVariant.create({
        data: {
          name,
          barcode,
          product: {
            connect: { id: product?.id },
          },
          facetValues: { connect: facetValues },
        },
      });
      res.json(variant);
    } catch (error) {
      res.status(500);
      res.json({ error: "Something went wrong" });
    }
  }
);

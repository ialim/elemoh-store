import { NextApiRequest, NextApiResponse } from "next";
import { validateRoute } from "../../../../lib/auth";
import prisma from "../../../../lib/prisma";

export default validateRoute(
  async (req: NextApiRequest, res: NextApiResponse, user: any) => {
    if (!user.role.permissions.product.includes("edit")) {
      res.status(401);
      res.json({ error: "Not Authorized" });
      return;
    }

    const { name, barcode, productId, facetValues, productVariantId } =
      req.body;

    let productVariant;

    try {
      let product;
      if (productId) {
        product = await prisma.product.findUnique({
          where: { id: productId },
        });

        if (!product) {
          res.status(401);
          res.json({ error: "product does not exist" });
          return;
        }
      }

      productVariant = await prisma.productVariant.update({
        where: {
          id: productVariantId,
        },
        data: {
          ...(name && { name }),
          ...(barcode && { barcode }),
          ...(facetValues && { facetValues: { connect: facetValues } }),
          ...(productId && { product: { connect: { id: product?.id } } }),
        },
      });
      res.json(productVariant);
    } catch (error) {
      res.status(500);
      res.json({ error: "Something went wrong" });
    }
  }
);

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

    const { productVariantId } = req.body;
    try {
      let productVariant;
      productVariant = await prisma.productVariant.findUnique({
        where: { id: productVariantId },
      });

      if (!productVariant) {
        res.status(401);
        res.json({ error: "productVariant not found" });
        return;
      }

      productVariant = await prisma.productVariant.update({
        where: { id: productVariantId },
        data: {
          stockLevels: {
            deleteMany: {},
          },
          stockHistory: {
            deleteMany: {},
          },
          suppliers: {
            deleteMany: {},
          },
          collections: {
            deleteMany: {},
          },
          productPurchases: {
            deleteMany: {},
          },
          facetValues: {
            deleteMany: {},
          },
        },
      });

      productVariant = await prisma.productVariant.delete({
        where: { id: productVariantId },
      });
      res.json(productVariant);
    } catch (error) {
      res.status(500);
      res.json({ error: "Something went wrong" });
    }
  }
);

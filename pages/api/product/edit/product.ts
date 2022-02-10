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

    const { name, description, brandId, productId } = req.body;

    let product;

    try {
      let brand;

      if (brandId) {
        brand = await prisma.brand.findUnique({ where: { id: brandId } });

        if (!brand) {
          res.status(401);
          res.json({ error: "brand does not exist" });
          return;
        }
      }

      product = await prisma.product.update({
        where: {
          id: productId,
        },
        data: {
          ...(name && { name }),
          ...(description && { description }),
          ...(brandId && {
            brand: {
              connect: { id: brand?.id },
            },
          }),
        },
      });
      res.json(product);
    } catch (error) {
      res.status(500);
      res.json({ error: "Something went wrong" });
    }
  }
);

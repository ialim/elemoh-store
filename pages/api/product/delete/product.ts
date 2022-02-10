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

    const { productId } = req.body;
    try {
      let product;
      product = await prisma.product.findUnique({ where: { id: productId } });

      if (!product) {
        res.status(401);
        res.json({ error: "product not found" });
        return;
      }

      product = await prisma.product.update({
        where: { id: productId },
        data: {
          variants: {
            deleteMany: {},
          },
        },
      });

      product = await prisma.product.delete({ where: { id: productId } });
      res.json(product);
    } catch (error) {
      res.status(500);
      res.json({ error: "Something went wrong" });
    }
  }
);

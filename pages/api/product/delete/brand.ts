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

    const { brandId } = req.body;
    try {
      let brand;
      brand = await prisma.brand.findUnique({ where: { id: brandId } });

      if (!brand) {
        res.status(401);
        res.json({ error: "Brand not found" });
        return;
      }

      brand = await prisma.brand.update({
        where: { id: brandId },
        data: {
          products: {
            deleteMany: {},
          },
        },
      });

      brand = await prisma.brand.delete({ where: { id: brandId } });
      res.json(brand);
    } catch (error) {
      res.status(500);
      res.json({ error: "Something went wrong" });
    }
  }
);

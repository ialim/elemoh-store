import { NextApiRequest, NextApiResponse } from "next";
import { validateRoute } from "../../../../lib/auth";
import prisma from "../../../../lib/prisma";

export default validateRoute(
  async (req: NextApiRequest, res: NextApiResponse, user: any) => {
    if (!user.role.permissions.product.includes("create")) {
      res.status(401);
      res.json({ error: "Not permitted Authorized" });
      return;
    }

    const { name, code } = req.body;

    let brand;

    try {
      brand = await prisma.brand.findUnique({ where: { code } });

      if (brand) {
        res.status(401);
        res.json({ error: "brand already exist" });
        return;
      }

      brand = await prisma.brand.create({
        data: {
          name,
          code,
        },
      });
      res.json(brand);
    } catch (error) {
      res.status(500);
      res.json({ error: "Something went wrong" });
    }
  }
);

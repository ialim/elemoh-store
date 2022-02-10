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

    const { name, code, brandId } = req.body;

    let brand;

    try {
      brand = await prisma.brand.update({
        where: {
          id: brandId,
        },
        data: {
          ...(name && { name }),
          ...(code && { code }),
        },
      });
      res.json(brand);
    } catch (error) {
      res.status(500);
      res.json({ error: "Something went wrong" });
    }
  }
);

import { NextApiRequest, NextApiResponse } from "next";
import { validateRoute } from "../../../../lib/auth";
import prisma from "../../../../lib/prisma";

export default validateRoute(
  async (req: NextApiRequest, res: NextApiResponse, user: any) => {
    if (!user.role.permissions.product.includes("read")) {
      res.status(401);
      res.json({ error: "Not Authorized" });
      return;
    }

    try {
      const productVariants = await prisma.productVariant.findMany({
        orderBy: { name: "asc" },
        include: { facetValues: true, stockHistory: true, stockLevels: true },
      });
      res.json(productVariants);
    } catch (error) {
      res.status(500);
      res.json({ error: "Something went wrong" });
    }
  }
);

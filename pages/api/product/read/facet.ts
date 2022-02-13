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

    const { facetId } = req.body;

    try {
      const facet = await prisma.facet.findUnique({
        where: { id: facetId },
        include: { values: true },
      });
      res.json(facet);
    } catch (error) {
      res.status(500);
      res.json({ error: "Something went wrong" });
    }
  }
);

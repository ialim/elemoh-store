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

    const { serchTerm } = req.body;

    try {
      const facets = await prisma.facet.findMany({
        where: { name: serchTerm },
        orderBy: { name: "asc" },
        include: { values: true },
      });
      res.json({ data: facets });
    } catch (error) {
      res.status(500);
      res.json({ error: "Something went wrong" });
    }
  }
);

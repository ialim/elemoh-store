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

    const { searchTerm, type } = req.body;

    let facetValues;

    try {
      if (type === "variant") {
        facetValues = await prisma.facetValue.findMany({
          where: { name: { contains: searchTerm } },
          orderBy: { name: "asc" },
          include: { facet: { select: { name: true } } },
        });
      } else {
        facetValues = await prisma.facetValue.findMany({
          where: {
            name: { contains: searchTerm },
            facet: { name: { in: ["brand", "note"] } },
          },
          orderBy: { name: "asc" },
          include: { facet: { select: { name: true } } },
        });
      }
      res.json(facetValues);
    } catch (error) {
      res.status(500);
      res.json({ error: "Something went wrong" });
    }
  }
);

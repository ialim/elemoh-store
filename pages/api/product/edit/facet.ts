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

    const { name, facetId } = req.body;

    let facet;

    try {
      facet = await prisma.facet.update({
        where: {
          id: facetId,
        },
        data: {
          ...(name && { name }),
        },
      });
      res.json(facet);
    } catch (error) {
      res.status(500);
      res.json({ error: "Something went wrong" });
    }
  }
);

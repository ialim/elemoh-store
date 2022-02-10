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

    const { name, facetId, facetValueId } = req.body;

    let facetValue;

    try {
      if (facetId) {
        const facet = await prisma.facet.findUnique({ where: { id: facetId } });

        if (!facet) {
          res.status(401);
          res.json({ error: "facet does not exist" });
          return;
        }
      }

      facetValue = await prisma.facetValue.update({
        where: {
          id: facetValueId,
        },
        data: {
          ...(name && { name }),
          ...(facetId && { facetId }),
        },
      });
      res.json(facetValue);
    } catch (error) {
      res.status(500);
      res.json({ error: "Something went wrong" });
    }
  }
);

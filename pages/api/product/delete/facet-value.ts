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

    const { facetValueId } = req.body;
    try {
      let facetValue;
      facetValue = await prisma.facetValue.findUnique({
        where: { id: facetValueId },
      });

      if (!facetValue) {
        res.status(401);
        res.json({ error: "facetValue not found" });
        return;
      }

      facetValue = await prisma.facetValue.delete({
        where: { id: facetValueId },
      });
      res.json(facetValue);
    } catch (error) {
      res.status(500);
      res.json({ error: "Something went wrong" });
    }
  }
);

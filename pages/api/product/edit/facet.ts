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

    const { name, id, values } = req.body;

    const valuesOpt = values.map((value: any) => {
      return {
        where: (value.id && { id: value.id }) || { name: value.name },
        create: { name: value.name },
        update: { name: value.name },
      };
    });

    let facet;

    try {
      facet = await prisma.facet.update({
        where: {
          id,
        },
        data: {
          ...(name && { name }),
          values: {
            upsert: [...valuesOpt],
          },
        },
        include: {
          values: {
            select: {
              name: true,
            },
          },
        },
      });
      res.json(facet);
    } catch (error) {
      res.status(500);
      res.json({ error: "Something went wrong" });
    }
  }
);

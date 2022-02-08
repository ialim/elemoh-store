import { NextApiRequest, NextApiResponse } from "next";
import { validateRoute } from "../../../lib/auth";
import prisma from "../../../lib/prisma";

export default validateRoute(
  async (req: NextApiRequest, res: NextApiResponse, user: any) => {
    if (!user.role.permissions.settings.includes("role-permission")) {
      res.status(401);
      res.json({ error: "Not Authorized" });
      return;
    }

    const { name, description, roleId } = req.body;

    try {
      const role = await prisma.role.update({
        where: {
          id: roleId,
        },
        data: {
          ...(name && { name }),
          ...(description && { description }),
        },
      });
      res.json(role);
    } catch (error) {
      res.status(500);
      res.json({ error: "Something went wrong" });
    }
  }
);

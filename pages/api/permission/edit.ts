import { NextApiRequest, NextApiResponse } from "next";
import { validateRoute } from "../../../lib/auth";
import prisma from "../../../lib/prisma";

export default validateRoute(
  async (req: NextApiRequest, res: NextApiResponse, currentUser: any) => {
    if (!currentUser.role.permissions.settings.includes("role-permission")) {
      res.status(401);
      res.json({ error: "Not Authorized" });
      return;
    }

    const {
      user,
      customer,
      supplier,
      purchase,
      settings,
      employee,
      product,
      roleId,
      permissionId,
    } = req.body;

    try {
      const permission = await prisma.permission.update({
        where: {
          id: permissionId,
        },
        data: {
          ...(user && { user }),
          ...(customer && customer),
          ...(supplier && supplier),
          ...(settings && { settings }),
          ...(purchase && { purchase }),
          ...(employee && { employee }),
          ...(product && { product }),
          ...(roleId && { roleId }),
        },
      });
      res.json(permission);
    } catch (error) {
      res.status(500);
      res.json({ error: "Something went wrong" });
    }
  }
);

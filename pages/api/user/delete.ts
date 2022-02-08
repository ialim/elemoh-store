import { NextApiRequest, NextApiResponse } from "next";
import { validateRoute } from "../../../lib/auth";
import prisma from "../../../lib/prisma";

export default validateRoute(
  async (req: NextApiRequest, res: NextApiResponse, user: any) => {
    if (!user.role.permissions.user.includes("delete")) {
      res.status(401);
      res.json({ error: "Not Authorized" });
      return;
    }

    const { userId } = req.body;

    try {
      const deleteUser = await prisma.user.delete({
        where: {
          id: userId,
        },
      });

      res.json({ deleteUser });
    } catch (error) {
      res.status(500);
      res.json({ error: "Something went wrong" });
    }
  }
);

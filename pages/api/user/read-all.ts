import { NextApiRequest, NextApiResponse } from "next";
import { validateRoute } from "../../../lib/auth";
import prisma from "../../../lib/prisma";

export default validateRoute(
  async (req: NextApiRequest, res: NextApiResponse, user: any) => {
    if (!user.role.permissions.user.includes("read")) {
      res.status(401);
      res.json({ error: "Not Authorized" });
      return;
    }

    try {
      const users = await prisma.user.findMany({
        orderBy: { username: "asc" },
      });
      res.json(users);
    } catch (error) {
      res.status(500);
      res.json({ error: "Something went wrong" });
    }
  }
);

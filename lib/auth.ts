import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "./prisma";

export const validateRoute = (handler: any) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies.TRAX_ACCESS_TOKEN;

    if (token) {
      let user;

      try {
        const { id } = jwt.verify(token, "hello") as any;
        user = await prisma.user.findUnique({
          where: { id },
          include: { role: { include: { permissions: true } } },
        });

        if (!user) {
          throw new Error("Not a real user");
        }
      } catch (error) {
        res.status(401);
        res.json({ error: "Not Authorized Token Error, something wrong" });
        return;
      }

      return handler(req, res, user);
    }

    res.status(401);
    res.json({ error: "Not Authorized No token" });
  };
};

export const validateToken = (token: string) => {
  const user = jwt.verify(token, "hello");
  return user;
};

export const canAccessRoles = async (user: User) => {
  const permissions = await prisma.permission.findUnique({
    where: { roleId: user.roleId },
  });
  if (!permissions?.settings.includes("role-permission")) {
    return false;
  }
  return true;
};

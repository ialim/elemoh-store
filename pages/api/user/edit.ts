import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { validateRoute } from "../../../lib/auth";
import prisma from "../../../lib/prisma";

export default validateRoute(
  async (req: NextApiRequest, res: NextApiResponse, user: any) => {
    if (!user.role.permissions.user.includes("edit")) {
      res.status(401);
      res.json({ error: "Not Authorized" });
      return;
    }

    const salt = bcrypt.genSaltSync();
    const { userId, email, password, username, phoneNumber, role, isActive } =
      req.body;

    let existingUser;

    try {
      if (username) {
        existingUser = await prisma.user.findUnique({ where: { username } });

        if (existingUser) {
          res.status(401);
          res.json({ error: "username already exist" });
          return;
        }
      }

      if (email) {
        existingUser = await prisma.user.findUnique({ where: { email } });

        if (existingUser) {
          res.status(401);
          res.json({ error: "email already exist" });
          return;
        }
      }

      if (phoneNumber) {
        existingUser = await prisma.user.findUnique({ where: { phoneNumber } });

        if (existingUser) {
          res.status(401);
          res.json({ error: "phoneNumber already exist" });
          return;
        }
      }

      let Role;
      if (role) {
        Role = await prisma.role.findUnique({ where: { id: role } });

        if (!Role) {
          res.status(401);
          res.json({ error: "user role is required" });
          return;
        }
      }

      user = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          ...(username && { username }),
          ...(email && { email }),
          ...(password && { password: bcrypt.hashSync(password, salt) }),
          ...(phoneNumber && { phoneNumber }),
          ...(role && {
            role: {
              connect: { id: Role?.id },
            },
          }),
          ...(isActive && { isActive }),
        },
      });
      res.json(user);
    } catch (error) {
      res.status(401);
      res.json({ error: "Something went wrong" });
    }
  }
);

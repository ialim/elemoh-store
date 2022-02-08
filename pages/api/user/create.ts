import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { validateRoute } from "../../../lib/auth";
import prisma from "../../../lib/prisma";

export default validateRoute(
  async (req: NextApiRequest, res: NextApiResponse, user: any) => {
    if (!user.role.permissions.user.includes("create")) {
      res.status(401);
      res.json({ error: "Not Authorized" });
      return;
    }

    const salt = bcrypt.genSaltSync();
    const { email, password, username, phoneNumber, role, isActive } = req.body;

    let newUser;

    try {
      newUser = await prisma.user.findUnique({ where: { username } });

      if (newUser) {
        res.status(401);
        res.json({ error: "username already exist" });
        return;
      }

      newUser = await prisma.user.findUnique({ where: { email } });

      if (newUser) {
        res.status(401);
        res.json({ error: "email already exist" });
        return;
      }

      newUser = await prisma.user.findUnique({ where: { phoneNumber } });

      if (newUser) {
        res.status(401);
        res.json({ error: "phoneNumber already exist" });
        return;
      }

      const Role = await prisma.role.findUnique({ where: { id: role } });

      if (!Role) {
        res.status(401);
        res.json({ error: "user role is required" });
        return;
      }

      user = await prisma.user.create({
        data: {
          username,
          email,
          password: bcrypt.hashSync(password, salt),
          phoneNumber,
          role: {
            connect: { id: Role.id },
          },
          isActive,
        },
      });
      res.json(user);
    } catch (error) {
      res.status(401);
      res.json({ error: "Something went wrong" });
    }
  }
);

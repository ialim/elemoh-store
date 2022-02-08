import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const salt = bcrypt.genSaltSync();
  const { email, password, username, phoneNumber, role } = req.body;

  let user;

  try {
    user = await prisma.user.findUnique({ where: { username } });

    if (user) {
      res.status(401);
      res.json({ error: "username already exist" });
      return;
    }

    user = await prisma.user.findUnique({ where: { email } });

    if (user) {
      res.status(401);
      res.json({ error: "email already exist" });
      return;
    }

    user = await prisma.user.findUnique({ where: { phoneNumber } });

    if (user) {
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
      },
    });
  } catch (error) {
    res.status(401);
    res.json({ error: "Something went wrong" });
    return;
  }

  const token = jwt.sign(
    {
      username: user.username,
      id: user.id,
      time: Date.now(),
    },
    "hello",
    { expiresIn: "8h" }
  );

  res.setHeader(
    "Set-Cookie",
    cookie.serialize("TRAX_ACCESS_TOKEN", token, {
      httpOnly: true,
      maxAge: 8 * 60 * 60,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })
  );

  res.json(user);
};

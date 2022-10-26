import { Prisma } from "@prisma/client";
import { prisma } from "../utils/prisma";

export async function articleSeeder() {
  // ユーザーと記事
  const firstUser: Prisma.UserCreateInput = {
    username: "tekihei2317",
    email: "tekihei2317@example.com",
    password: "password",
  };

  const user = await prisma.user.create({ data: firstUser });
  console.log({ user });

  const article = await prisma.article.create({
    data: {
      title: "Prismaを使ってみた",
      description: "Prismaを使ってみた",
      slug: "prisma-wo-tukatte-mita",
      body: "Prismaを使ってみました",
      author: {
        connect: { id: user.id },
      },
    },
  });
  console.log({ article });
}

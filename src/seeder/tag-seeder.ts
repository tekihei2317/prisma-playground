import { prisma } from "../utils/prisma";

export async function tagSeeder() {
  await prisma.tag.deleteMany();
  const tags = await prisma.tag.createMany({
    data: [
      {
        name: "typescript",
      },
      {
        name: "nodejs",
      },
      {
        name: "prisma",
      },
    ],
  });
  console.log(`${tags.count} tags created.`);

  const [tag1, tag2] = await Promise.all([
    prisma.tag.findUniqueOrThrow({ where: { name: "typescript" } }),
    prisma.tag.findUniqueOrThrow({ where: { name: "nodejs" } }),
  ]);

  const article = await prisma.article.findFirstOrThrow();
  await prisma.article.update({
    where: { id: article.id },
    data: {
      tags: {
        connect: [{ id: tag1.id }, { id: tag2.id }],
      },
    },
    include: { tags: true },
  });
}

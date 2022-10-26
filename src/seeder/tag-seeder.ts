import { prisma } from "../utils/prisma";

export async function tagSeeder() {
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
  const articleAndTags = await prisma.article.update({
    where: {
      id: article.id,
    },
    data: {
      tags: {
        connect: [tag1, tag2],
      },
    },
  });
  console.log({ articleAndTags }); //
}

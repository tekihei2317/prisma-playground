import { prisma } from "../utils/prisma";

export async function commentSeeder() {
  const user = await prisma.user.findFirstOrThrow();
  const article = await prisma.article.findFirstOrThrow();

  // 記事とコメント
  const commentRelation = {
    userId: user.id,
    articleId: article.id,
  };
  const comments = await prisma.comment.createMany({
    data: [
      {
        body: "こんにちは",
        // createManyではconnectは使えない
        ...commentRelation,
      },
      {
        body: "Hello",
        ...commentRelation,
      },
    ],
  });
}

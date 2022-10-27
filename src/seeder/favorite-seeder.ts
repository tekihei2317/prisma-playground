import { prisma } from "../utils/prisma";

export async function favoriteSeeder() {
  // Explicit many-to-many relationの場合は、素直に中間テーブルにInsertするのがよさそう
  const userId = 1;
  const articleId = 1;
  await prisma.favorite.create({
    data: { userId, articleId },
  });
}

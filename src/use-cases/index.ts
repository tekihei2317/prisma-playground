import { PrismaClient, User } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

const prisma = new PrismaClient();

function printObject(obj: object | null) {
  console.log(JSON.stringify(obj, null, 2));
}

async function followerIdList(user: User) {
  return (
    await prisma.follow.findMany({
      select: { followeeId: true },
      where: { followerId: 1 },
    })
  ).map((follow) => follow.followeeId);
}

async function main() {
  // 1. ユーザーと、そのユーザーの記事の一覧を取得する
  const userWithPosts = await prisma.user.findUnique({
    where: { username: "tekihei2317" },
    include: { articles: true },
  });

  printObject({ userWithPosts });

  // findUniqueで見つからなかった場合は、単純にnullになる
  const userWithPosts2 = await prisma.user.findUnique({
    where: { id: 2 },
  });

  printObject({ userWithPosts2 });

  // 2. ある記事のコメント一覧を取得する
  const comments = await prisma.comment.findMany({
    where: { userId: 1 },
  });
  printObject({ comments });

  // 3. 記事を更新する
  const updatedArticle = await prisma.article.update({
    where: { id: 1 },
    data: { title: "Prismaが難しい" },
  });
  printObject({ updatedArticle });

  // 更新するデータが存在しない場合はエラーになる
  try {
    const updatedArticle2 = await prisma.article.update({
      where: { id: 2 },
      data: { title: "Prismaが楽しい" },
    });
    printObject({ updatedArticle2 });
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      console.log(e.meta);
    }
  }

  // 4. フォローしているユーザー一覧を取得する
  const user = await prisma.user.findFirstOrThrow();
  const followingUsers = await prisma.user.findMany({
    where: {
      id: { in: await followerIdList(user) },
    },
  });
  printObject(followingUsers);

  // リレーションを使って取得する場合
  const user2 = await prisma.user.findFirstOrThrow({
    include: {
      followingUsers: {
        include: { followee: true },
      },
    },
  });
  printObject(user2.followingUsers);

  // 5. フォロワー（自分をフォローしているユーザー）を取得する
  const user3 = await prisma.user.findUniqueOrThrow({
    where: { id: 2 },
    include: {
      followers: {
        include: { follower: true },
      },
    },
  });
  printObject(user3.followers);

  // 6. 記事とその記事のタグ一覧を取得する
  const articleAndtag = await prisma.article.findUnique({
    where: { id: 1 },
    include: { tags: true },
  });
  printObject(articleAndtag);
}

main();

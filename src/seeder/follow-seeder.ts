import { prisma } from "../utils/prisma";

export async function followSeeder() {
  const user = await prisma.user.findFirstOrThrow();

  // ユーザーとフォロー
  const anotherUser = await prisma.user.create({
    data: {
      username: "yamadataro",
      email: "ytaro@example.com",
      password: "password",
    },
  });

  // Eloquentはこれなので、敗北感がある
  // $user->followingUsers()->attach($anotherUser)
  const follow = await prisma.follow.create({
    data: {
      followerId: user.id,
      followeeId: anotherUser.id,
    },
  });
  console.log({ follow });
}

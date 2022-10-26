import { databaseSeeder, Seeder } from "./database-seeder";

const seederName = process.argv[2];

async function main() {
  // シーダー名を指定しなかった場合
  if (seederName === undefined) {
    for (const seeder of Object.values(databaseSeeder)) {
      await seeder();
    }
    return;
  }

  if (seederName in databaseSeeder) {
    // TODO: Seeder型に絞り込む
    await databaseSeeder[seederName as Seeder]();
    return;
  }

  throw new Error("シーダー名が間違っています");
}

main();

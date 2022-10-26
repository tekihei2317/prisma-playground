import { databaseSeeder, SeederName, Seeder } from "./database-seeder";

const seederName = process.argv[2];

async function execSeeder(seeder: Seeder) {
  try {
    await seeder();
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
      process.exit(1);
    }
  }
}

async function main() {
  // シーダー名を指定しなかった場合
  if (seederName === undefined) {
    for (const seeder of Object.values(databaseSeeder)) {
      await execSeeder(seeder);
    }
    return;
  }

  if (seederName in databaseSeeder) {
    // TODO: SeederName型に絞り込む
    await execSeeder(databaseSeeder[seederName as SeederName]);
    return;
  }

  console.error("error: シーダー名が間違っています");
  process.exit(1);
}

main();

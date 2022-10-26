import { tagSeeder } from "./tag-seeder";
import { articleSeeder } from "./article-seeder";
import { commentSeeder } from "./comment-seeder";
import { followSeeder } from "./follow-seeder";

export const databaseSeeder = {
  articleSeeder,
  // tagSeeder,
  commentSeeder,
  followSeeder,
};

export type Seeder = keyof typeof databaseSeeder;

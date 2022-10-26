import { tagSeeder } from "./tag-seeder";
import { articleSeeder } from "./article-seeder";
import { commentSeeder } from "./comment-seeder";
import { followSeeder } from "./follow-seeder";

export const databaseSeeder = {
  articleSeeder,
  tagSeeder,
  commentSeeder,
  followSeeder,
};

export type SeederName = keyof typeof databaseSeeder;
export type Seeder = () => Promise<void>;

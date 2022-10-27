import { tagSeeder } from "./tag-seeder";
import { articleSeeder } from "./article-seeder";
import { commentSeeder } from "./comment-seeder";
import { followSeeder } from "./follow-seeder";
import { favoriteSeeder } from "./favorite-seeder";

export const databaseSeeder = {
  articleSeeder,
  tagSeeder,
  commentSeeder,
  followSeeder,
  favoriteSeeder,
};

export type SeederName = keyof typeof databaseSeeder;
export type Seeder = () => Promise<void>;

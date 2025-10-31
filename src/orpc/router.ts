import { me } from "@/modules/auth/server/procedures";
import { getMany } from "@/modules/categories/server/procedures";

export const router = {
  categories: {
    getMany,
  },
  auth: {
    me,
  },
};

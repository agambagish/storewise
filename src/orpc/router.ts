import { me } from "@/modules/auth/server/procedures";
import { getMany } from "@/modules/categories/server/procedures";
import { getOne } from "@/modules/stores/server/procedures";

export const router = {
  categories: {
    getMany,
  },
  auth: {
    me,
  },
  stores: {
    getOne,
  },
};

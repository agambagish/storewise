import { createAccessControl } from "better-auth/plugins/access";

const statement = {
  products: ["create", "read", "update", "delete"],
} as const;

export const ac = createAccessControl(statement);

export const user = ac.newRole({
  products: [],
});

export const seller = ac.newRole({
  products: ["read", "create", "update"],
});

export const admin = ac.newRole({
  products: [...statement.products],
});

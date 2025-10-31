import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth-helpers";

export default async function ({ children }: React.PropsWithChildren) {
  const { data: session } = await getSession();

  if (session?.user) {
    redirect("/");
  }

  return (
    <div className="flex min-h-svh items-center justify-center px-4">
      {children}
    </div>
  );
}

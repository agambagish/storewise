import Link from "next/link";
import { redirect } from "next/navigation";

import { PageCenter } from "@/components/page-center";
import { StoreLogo } from "@/components/store-logo";
import { FieldDescription } from "@/components/ui/field";
import { getCurrentUser } from "@/lib/auth/helpers";

export default async function ({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (user !== null) redirect("/");

  return (
    <PageCenter gap="lg">
      <StoreLogo
        name="Storewise"
        href="/"
        color="var(--primary)"
        icon="Origami"
      />
      <div className="flex w-full max-w-md flex-col gap-6">
        {children}
        <FieldDescription className="px-6 text-center">
          By clicking continue, you agree to our{" "}
          <Link href="#">Terms of Service</Link> and{" "}
          <Link href="#">Privacy Policy</Link>.
        </FieldDescription>
      </div>
    </PageCenter>
  );
}

import type { Metadata } from "next";

import { Hourglass } from "lucide-react";

import { Container } from "@/components/container";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { assertSuccess } from "@/lib/data-access/helpers";
import { StoreSetup } from "@/modules/store/components/store-setup";
import { StoreSetupSidebar } from "@/modules/store/components/store-setup-sidebar";
import { getCurrentStore } from "@/modules/store/server/queries";

export const metadata: Metadata = {
  title: "Setup Your Store",
};

export default async function () {
  const res = await getCurrentStore();

  if (!res.success && res.error.type === "conflict") {
    return (
      <Container height="storefront">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Hourglass />
            </EmptyMedia>
            <EmptyTitle>We Are Currently Reviewing Your Submission</EmptyTitle>
            <EmptyDescription>
              We are reviewing the information you&apos;ve submitted. You will
              receive an email once your details have been processed.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </Container>
    );
  }

  assertSuccess(res);

  return (
    <Container
      direction="row"
      paddingDirection="x"
      className="min-h-[calc((100vh-8rem)-2px)]"
    >
      <StoreSetupSidebar />
      <StoreSetup />
    </Container>
  );
}

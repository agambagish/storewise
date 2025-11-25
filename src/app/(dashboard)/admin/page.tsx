import type { Metadata } from "next";

import { Construction } from "lucide-react";

import { Container } from "@/components/container";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

export default function () {
  return (
    <Container height="dashboard">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Construction />
          </EmptyMedia>
          <EmptyTitle>Work In Progress</EmptyTitle>
          <EmptyDescription>
            I&apos;m currently building this section.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </Container>
  );
}

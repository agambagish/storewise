import Link from "next/link";

import { Home } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function () {
  return (
    <div className="flex min-h-svh items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Email Verified</CardTitle>
          <CardDescription className="text-xs md:text-sm">
            Your email has been successfully verified. You can now continue to
            your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/" className={buttonVariants()}>
            <Home />
            Go to Home
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

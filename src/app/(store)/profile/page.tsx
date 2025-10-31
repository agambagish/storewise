import type { Metadata } from "next";

import { ProfileView } from "@/modules/auth/ui/views/profile-view";

export const metadata: Metadata = {
  title: "Profile",
};

export default function () {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 space-y-0.5">
        <h1 className="font-bold text-3xl">Account Settings</h1>
        <p className="text-muted-foreground">
          View and update your account details.
        </p>
      </div>
      <ProfileView />
    </div>
  );
}

"use client";

import { useState } from "react";

import type { Session } from "better-auth";
import { Ship, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { UAParser } from "ua-parser-js";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth/client";
import { getBrowserInfo, getDeviceIconByType } from "@/lib/ua-parser";
import { formatDate } from "@/lib/utils";

import { revalidate } from "../server/mutations";

interface Props {
  currentSession: Session;
  otherSessions: Session[];
}

export function ActiveDevices({ currentSession, otherSessions }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Devices</CardTitle>
        <CardDescription>
          Manage your currently logged-in devices and active user sessions.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <SessionCard session={currentSession} isCurrentSession />
        {otherSessions.map((session) => (
          <SessionCard key={session.id} session={session} />
        ))}
      </CardContent>
    </Card>
  );
}

interface SessionCardProps {
  session: Session;
  isCurrentSession?: boolean;
}

function SessionCard({ session, isCurrentSession }: SessionCardProps) {
  const userAgent = session.userAgent ? UAParser(session.userAgent) : null;
  const browserInfo = getBrowserInfo(userAgent);
  const DeviceTypeIcon = getDeviceIconByType(userAgent?.device.type);

  const [isLoading, setIsLoading] = useState(false);

  async function onRevoke() {
    await authClient.revokeSession(
      { token: session.token },
      {
        onRequest: () => {
          setIsLoading(true);
        },
        onError: (ctx) => {
          setIsLoading(false);
          toast.error(ctx.error.message);
        },
        onSuccess: async () => {
          setIsLoading(false);
          await revalidate("/account/security");
          toast.success("Device has been revoked.");
        },
      },
    );
  }

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>{browserInfo}</CardTitle>
        {isCurrentSession && <Badge variant="outline">Current Session</Badge>}
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <DeviceTypeIcon className="size-12" />
          <div className="space-y-1 text-sm">
            {session.ipAddress && (
              <p className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-white">
                  <Ship className="size-4" />
                  IP ~
                </span>
                <span className="text-muted-foreground">
                  {session.ipAddress}
                </span>
              </p>
            )}
            <p className="flex items-center gap-2">
              <span className="text-white">Signed In ~</span>
              <span className="text-muted-foreground">
                {formatDate(session.createdAt, {
                  hour: "numeric",
                  minute: "numeric",
                })}
              </span>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-white">Valid Until ~</span>
              <span className="text-muted-foreground">
                {formatDate(session.expiresAt, {
                  hour: "numeric",
                  minute: "numeric",
                })}
              </span>
            </p>
          </div>
        </div>
        {!isCurrentSession && (
          <Button
            variant="outline"
            size="icon-sm"
            onClick={onRevoke}
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : <Trash2 />}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

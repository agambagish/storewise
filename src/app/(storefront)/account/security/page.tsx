import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function () {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-semibold text-foreground text-xl">Security</h2>
        <p className="mt-1 text-muted-foreground text-sm">
          Manage your password and email settings.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Change password</CardTitle>
          <CardDescription>
            Update your password to keep your account secure.
          </CardDescription>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Change email</CardTitle>
          <CardDescription>
            Update the email address associated with your account.
          </CardDescription>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </div>
  );
}

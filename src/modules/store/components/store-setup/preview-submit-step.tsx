import { useMemo } from "react";

import { CheckCircle2 } from "lucide-react";
import type { UseFormGetValues } from "react-hook-form";

import { Card } from "@/components/ui/card";

import type { StoreSetupSchema } from "../../schema/store-setup-schema";

interface Props {
  getValues: UseFormGetValues<StoreSetupSchema>;
}

export function PreviewSubmitStep({ getValues }: Props) {
  const formData = useMemo(() => getValues(), [getValues]);

  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 flex items-center gap-2 font-semibold text-foreground text-lg">
          <CheckCircle2 className="size-5 text-primary" />
          Store Details
        </h3>
        <Card className="border p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <p className="text-muted-foreground text-sm">Store Name</p>
              <p className="font-medium text-foreground">{formData.name}</p>
            </div>
            {formData.description && (
              <div className="md:col-span-2">
                <p className="text-muted-foreground text-sm">Description</p>
                <p className="font-medium text-foreground">
                  {formData.description}
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
      <div>
        <h3 className="mb-4 flex items-center gap-2 font-semibold text-foreground text-lg">
          <CheckCircle2 className="size-5 text-primary" />
          Account Verification
        </h3>
        <Card className="border p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <p className="text-muted-foreground text-sm">Account Type</p>
              <p className="font-medium text-foreground capitalize">
                {formData.accountType.toLowerCase()}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">PAN</p>
              <p className="font-medium text-foreground">{formData.pan}</p>
            </div>
            {formData.accountType === "BUSINESS" && formData.gst && (
              <div>
                <p className="text-muted-foreground text-sm">GST</p>
                <p className="font-medium text-foreground">{formData.gst}</p>
              </div>
            )}
          </div>
        </Card>
      </div>
      <div>
        <h3 className="mb-4 flex items-center gap-2 font-semibold text-foreground text-lg">
          <CheckCircle2 className="size-5 text-primary" />
          Payout Method
        </h3>
        <Card className="border p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <p className="text-muted-foreground text-sm">
                Account Holder Name
              </p>
              <p className="font-medium text-foreground">
                {formData.accountHoldersName}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Account Number</p>
              <p className="font-medium text-foreground">
                {formData.accountNumber}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">IFSC Code</p>
              <p className="font-medium text-foreground">{formData.ifsc}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

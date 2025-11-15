import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export function LoadingButton({
  loading,
  children,
  disabled,
  ...props
}: React.ComponentProps<typeof Button> & { loading?: boolean }) {
  return (
    <Button disabled={disabled} {...props}>
      {loading && <Spinner />}
      {children}
    </Button>
  );
}

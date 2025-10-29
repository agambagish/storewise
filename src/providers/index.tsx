import { QueryProvider } from "./query-provider";

export function Providers({ children }: React.PropsWithChildren) {
  return <QueryProvider>{children}</QueryProvider>;
}

import { Footer } from "@/modules/home/ui/components/footer";
import { Header } from "@/modules/home/ui/components/header";

export default function ({ children }: React.PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}

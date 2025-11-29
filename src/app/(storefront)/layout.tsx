import { Footer } from "@/modules/home/components/footer";
import { Header } from "@/modules/home/components/header";

export default function ({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}

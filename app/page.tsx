import { Welcome } from "@/components/welcome";
import { BtnLogin } from "@/components/btnLogin";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Welcome />
    </main>
  );
}
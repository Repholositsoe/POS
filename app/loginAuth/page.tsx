import { LoginEnter } from "@/components/loginEnter";

// This should display the login form if well linked

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <LoginEnter />
    </main>
  );
}

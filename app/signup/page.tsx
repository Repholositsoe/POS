import { SignupForm } from "@/components/signup";

// Thisnshould display the signup form if well linked

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignupForm />
    </main>
  );
}
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Navbar } from "./_components/navbar";
import { Toaster } from "sonner";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <Toaster />
      <div className="min-h-dvh min-w-full flex flex-col gap-y-10 items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-200 to-blue-900">
        <Navbar />
        {children}
      </div>
    </SessionProvider>
  );
}

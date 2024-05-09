"use client";

import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { defaultLoginRedirect } from "@/route";

export function Social() {
  function onClick(provider: "google" | "github") {
    signIn(provider, {
      callbackUrl: defaultLoginRedirect,
    });
  }
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button size="lg" className="w-full" variant="outline" onClick={() => onClick('google')}>
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button size="lg" className="w-full" variant="outline" onClick={() => onClick("github")}>
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  );
}

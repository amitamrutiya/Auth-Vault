"use client";

import { logout } from "@/actions/logout";
import { Button } from "../ui/button";

type LogoutButtonProps = {
  children?: React.ReactNode;
};

export function LogoutButton({ children }: LogoutButtonProps) {
  return (
    <form action={logout}>
      <button type="submit" className="cursor-pointer">
        {children}
      </button>
    </form>
  );
}

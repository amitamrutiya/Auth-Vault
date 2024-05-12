"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-user";

function SettingsPage() {
  const session = useCurrentUser();

  return (
    <div className="min-h-full bg-white p-10 rounded-xl">
      <form action={logout}>
        <Button type="submit">Sign out</Button>
      </form>
    </div>
  );
}

export default SettingsPage;

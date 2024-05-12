"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { useSession } from "next-auth/react";
import { logout } from "@/actions/logout";

function SettingsPage() {
  const session = useSession();

  return (
    <div>
      {JSON.stringify(session)}
      <form action={logout}>
        <Button type="submit">Sign out</Button>
      </form>
    </div>
  );
}

export default SettingsPage;

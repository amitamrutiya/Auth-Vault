import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { signOut } from "@/auth";

import React from "react";

async function SettingsPage() {
  const session = await auth();
  return (
    <div>
      {JSON.stringify(session)}
      <form
        action={async () => {
          "use server";

          await signOut();
        }}
      >
        <Button type="submit">Sign out</Button>
      </form>
    </div>
  );
}

export default SettingsPage;

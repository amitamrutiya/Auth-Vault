"use client";

import { admin } from "@/actions/admin";
import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";

function AdminPage() {
  const onServerActionClick = async () => {
    const response = await admin();
    if (response.success) {
      toast.success(response.success);
    } else {
      toast.error(response.error);
    }
  };

  const onApiRouteClick = async () => {
    const response = await fetch("/api/admin");
    if (response.ok) {
      toast.success("You are allowed to see this content");
    } else {
      toast.error("You are not allowed to see this content");
    }
  };
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">Admin</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="You are allowed to see this Content" />
        </RoleGate>
        <div className="flex justify-between items-center rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin-only API route</p>
          <Button onClick={onApiRouteClick}>Click to test</Button>
        </div>
        <div className="flex justify-between items-center rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin-only Server Action</p>
          <Button onClick={onServerActionClick}>Click to test</Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default AdminPage;

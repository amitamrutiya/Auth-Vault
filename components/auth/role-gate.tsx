"use client";

import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import { FormError } from "../form-error";

type RoleGateProps = {
  children: React.ReactNode;
  allowedRole: UserRole;
};

export function RoleGate({ children, allowedRole }: RoleGateProps) {
  const role = useCurrentRole();

  if (role === allowedRole) {
    return <>{children}</>;
  }

  return (
    <FormError 
      message="You are not authorized to view this page."
    />
  );
}

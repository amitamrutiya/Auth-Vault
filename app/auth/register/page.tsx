import { RegisterForm } from "@/components/auth/register-form";
import { Suspense } from "react";

function RegisterPage() {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  );
}

export default RegisterPage;

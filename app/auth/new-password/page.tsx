import { NewPasswordForm } from "@/components/auth/new-password-form";
import { Suspense } from "react";
function NewPasswordPage() {
  return (
    <Suspense fallback="Loading...">
      <NewPasswordForm />
    </Suspense>
  );
}

export default NewPasswordPage;

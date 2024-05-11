import { NewVerificationForm } from "@/components/auth/new-verification-form";
import { Suspense } from "react";

function NewVerificationPage() {
  return (
    <Suspense fallback="Loading...">
      <NewVerificationForm />
    </Suspense>
  )
}

export default NewVerificationPage;

"use client";

import { useSearchParams } from "next/navigation";
import { CardWrapper } from "./card-wrapper";
import { BeatLoader } from "react-spinners";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/new-verification";
import { FormSuccess } from "../form-success";
import { FormError } from "../form-error";

export function NewVerificationForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(async () => {
    if (success || error) return;

    if (!token) {
      setError("Token not found!");
      return;
    }
    try {
      const data = await newVerification(token);
      if (data.success) {
        setSuccess(data.message);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("An error occurred!");
    }
  }, [error, success, token]);

  useEffect(() => {
    if (token) {
      onSubmit();
    }
  });

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back to Login"
      backButtonHref="/auth/login"
    >
      <div className="flex item-center w-full justify-center">
        {!success && !error && <BeatLoader />}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
}

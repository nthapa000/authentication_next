"use client";

import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { CardWrapper } from "./card-wrapper";
import { useSearchParams } from "next/navigation";
import { newVerification } from "@/actions/new-verification";
import { FormError } from "../form-errors";
import { FormSuccess } from "../form-success";

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const onSubmit = useCallback(() => {
    // This is to prevent the bug where when we verified the token and then the token got deleted from the database then the error message is showing that the token does not exist, it is happening because in development there is Strict mode which calls useEffect twice
    if(success || error) return;

    if (!token) {
      setError("Missing token!");
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong");
      });
    // in Browser we can see the token being the logging
  }, [token,success,error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirming Your Verification"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="flex items-center w-full justify-center">
        {/* Condition for showing the BeatLoader */}
        {!success && !error && <BeatLoader />}
        <FormSuccess message={success} />
        {!success && (
            <FormError message={error} />
        )}
      </div>
    </CardWrapper>
  );
};

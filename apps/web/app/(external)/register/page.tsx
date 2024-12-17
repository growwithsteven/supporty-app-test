"use client";

import { Suspense, useEffect } from "react";

import { useProjectAuth } from "@/hooks/project-auth";
import { useSearchParams, useRouter } from "next/navigation";

function RegisterComponent() {
  const searchParams = useSearchParams(),
    code = searchParams.get("code");
  const router = useRouter();
  const { register } = useProjectAuth();

  useEffect(() => {
    if (!code) {
      router.push("/");
      return;
    }

    register(code)
      .then(() => {
        router.push("/dashboard");
      })
      .catch((err) => {
        router.push("/");
        throw err;
      });
  }, [code]);

  return null;
}

export default function Register() {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center py-20">
        <span className="loading loading-spinner loading-lg text-base-content" />
      </div>
      <Suspense fallback={null}>
        <RegisterComponent />
      </Suspense>
    </>
  );
}

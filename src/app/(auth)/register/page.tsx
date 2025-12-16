"use client";

import SignupForm from "@/features/auth/components/SignupForm";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
  );
}

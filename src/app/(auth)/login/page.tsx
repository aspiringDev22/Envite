"use client";

import SigninForm from "@/features/auth/components/SigninForm";

export default function SignInPage() {

  return (
    <div className="min-h-screen bg-[#171717] flex items-center justify-center">
      <div className="card pt-8 bg-[#171717] shadow-lg w-95 p-[2rem] border border-[#d1d0d0] rounded-lg flex flex-col gap-[2.2rem]">
        <div className="text-left space-y-2">
          <h1 className="text-3xl font-[550] text-white text-center">Welcome Back!</h1>
          <h2 className="text-lg font-[500] text-white text-center">
            Plan, host, and join events effortlessly.
          </h2>
        </div>
       <SigninForm />
      </div>
    </div>
  );
}

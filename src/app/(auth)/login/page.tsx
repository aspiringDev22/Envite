"use client";

import { useAuthStore } from "@/store/auth/auth-store";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function SignInPage() {
  const { email, password, setEmail, setPassword, signIn } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please Complete All Fields", {
        duration: 3000,
        icon: "⚠️",
      });
      return;
    }
    const response = await signIn({ email, password });
    if (response.success) {
      toast.success("Signin Successful", {
        duration: 3000,
      });
      setEmail("");
      setPassword("");
      router.push("/");
    } else {
      toast.error(response.error ?? "Signin Failed", {
        duration: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#171717] flex items-center justify-center">
      <div className="card pt-8 bg-[#171717] shadow-lg w-95 p-[2rem] border border-[#d1d0d0] rounded-lg flex flex-col gap-[2.2rem]">
        <div className="text-left space-y-2">
          <h1 className="text-3xl font-[550] text-white">Welcome Back!</h1>
          <h2 className="text-lg font-[500] text-white">
            Hosting and Attending Events Made Easy
          </h2>
        </div>
        <form className="space-y-4">
          <div className="form-control flex flex-col gap-2">
            <label className="label">
              <span className="label-text text-white">Email</span>
            </label>
            <input
              type="text"
              placeholder="Enter your Email"
              className="input input-bordered w-full focus:outline-none"
              name="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-control flex flex-col gap-2">
            <label className="label">
              <span className="label-text text-white">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full focus:outline-none"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-control flex flex-col items-center justify-center mt-6 gap-4">
            <button
              type="submit"
              className="btn bg-white text-black text-xl rounded-lg font-[500] w-full"
              onClick={(e: any) => handleSubmit(e)}
            >
              Signin
            </button>
            <p className="text-sm text-white">
              Don't have an account? <a href="/register">Register</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

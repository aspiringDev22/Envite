import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/auth-store";

export default function SigninForm() {
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
          className="btn bg-white text-black text-xl rounded-lg font-[500] w-full active:scale-[0.98] transition-transform duration-150 ease-in-out"
          onClick={(e: any) => handleSubmit(e)}
        >
          Signin
        </button>
        <p className="text-sm text-white">
          New Here? <a href="/register">Register</a>
        </p>
      </div>
    </form>
  );
}

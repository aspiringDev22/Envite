import { useAuthStore } from "../store/auth-store";
import toast from "react-hot-toast";

export default function SignupForm() {
  const { email, setEmail, password, setPassword, signUp, checkEmailExists } =
    useAuthStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please Complete All Fields", {
        duration: 3000,
        icon: "⚠️",
      });
      return;
    }
    const { exists, error } = await checkEmailExists(email);
    if (exists) {
      toast.error(error ?? "Email already exists", {
        duration: 4000,
        icon: "⚠️",
      });
      return;
    }
    const response = await signUp({ email, password });
    console.log(response);
    if (response.success) {
      toast.success("Signup Successful, Please verify your email", {
        duration: 3000,
      });
      setEmail("");
      setPassword("");
    } else if (!response.success) {
      toast.error(response.error ?? "Signup Failed", {
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
          name="email"
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
          Signup
        </button>
        <p className="text-sm text-white">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </form>
  );
}

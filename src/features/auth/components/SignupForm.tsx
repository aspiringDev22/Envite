import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "../store/auth-store";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";

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
   <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle> <h2 className="text-xl font-[500]">
            Bring people together effortlessly.
          </h2></CardTitle>
        <CardDescription>
          Create | Manage | Share your events with ease.
        </CardDescription>
      </CardHeader>
      <CardContent>
    <form className="space-y-4">
      <div className="form-control flex flex-col gap-2">
        <Label className="label">
          Email
        </Label>
        <Input
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
        <Label className="label">
          Password
        </Label>
        <Input
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
        <Button
          type="submit"
          className="btn btn-primary w-full"
          onClick={(e: any) => handleSubmit(e)}
        >
          Register
        </Button>
        <p className="text-sm text-black">
          Existing User? <a href="/login">Login</a>
        </p>
      </div>
    </form>
      </CardContent>
    </Card>
  );
}

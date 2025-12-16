import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/auth-store";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";

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
      router.push("/create-event");
    } else {
      toast.error(response.error ?? "Signin Failed", {
        duration: 3000,
      });
    }
  };
  return (
     <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle> <h2 className="text-xl font-[500]">Login to your account</h2></CardTitle>
        <CardDescription>
          Enter your email below to login to your account
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
          Signin
        </Button>
        <p className="text-sm text-black">
          New Here? <a href="/register">Register</a>
        </p>
      </div>
    </form>
      </CardContent>
    </Card>
  );
}

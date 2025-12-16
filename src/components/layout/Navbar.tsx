'use client';

import { useAuthStore } from "@/features/auth/store/auth-store";
import { Button } from "../ui/button";

export default function Navbar() {
  const {signOut} = useAuthStore();
  return (
    <div className="navbar flex justify-between p-4 shadow-none border-b bg-neutral-50">
      <div className="navbar-start">
        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
          <Button className="btn">
            Envite
          </Button>
        </div>
        <a className="btn btn-ghost text-2xl">Envite</a>
      </div>
      <div className="navbar-center hidden lg:flex"></div>
      <div className="navbar-end">
        <Button variant="outline" className="btn btn-outline shadow-none border-2" onClick={signOut}>
          Logout
        </Button>
      </div>
    </div>
  );
}

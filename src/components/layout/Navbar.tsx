'use client';

import { useAuthStore } from "@/features/auth/store/auth-store";
import Button from "../ui/Button";

export default function Navbar() {
  const {signOut} = useAuthStore();
  return (
    <div className="navbar bg-gradient-to-r from-dark via-[#212121] to-dark shadow-sm border-b border-[#fefefe30]">
      <div className="navbar-start">
        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
          <Button variant="solid" className="btn">
            Envite
          </Button>
        </div>
        <a className="btn btn-ghost text-2xl">Envite</a>
      </div>
      <div className="navbar-center hidden lg:flex"></div>
      <div className="navbar-end">
        <Button variant="outline" className="btn btn-outline" onClick={signOut}>
          Sign Out
        </Button>
      </div>
    </div>
  );
}

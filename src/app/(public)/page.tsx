'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
   return (
    <div className="min-h-screen text-white">
      <main className="min-h-[90vh] flex items-center justify-center px-6 py-12">
        <section className="w-full max-w-3xl rounded-2xl border border-white/10 bg-gradient-to-r from-[#212121] via-white/5 to-[#212121] backdrop-blur-md p-8 shadow-xl">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Plan Smarter, Celebrate Better 🎉
          </h1>

          <p className="mt-4 text-base sm:text-lg text-white/80 leading-relaxed">
            Envite makes creating and managing events effortless. Share beautiful invites,
            track RSVPs in real-time, and keep your guests in the loop — all in one place.
          </p>

          <p className="mt-2 text-base sm:text-lg text-white/60 leading-relaxed">
            Whether it’s a birthday, dinner, or a weekend getaway — you are covered.
          </p>

          <div className="mt-8">
            <Link href="/create-event" className="btn btn-neutral text-white bg-gradient-to-r from-dark to-dark btn-xl rounded-md active:scale-95 transition-transform">
              Give Life to Your Events
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

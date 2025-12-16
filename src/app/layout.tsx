import type { Metadata } from "next"
import "./globals.css";
import { AuthProvider } from "@/providers/auth-provider";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Envite",
  description: "Create & manage events effortlessly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
        <Toaster position="top-right" reverseOrder={false} />
          {children}
          </AuthProvider>
      </body>
    </html>
  );
}

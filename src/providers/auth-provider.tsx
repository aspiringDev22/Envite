'use client';

import { useAuth } from "@/features/auth/hooks/useAuth"
import { ReactNode } from "react";

type Props = {
    children: ReactNode;
}

export const AuthProvider = ({children}: Props) => {
    useAuth();
    return <>{children}</>
}
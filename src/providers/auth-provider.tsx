'use client';

import { useAuth } from "@/lib/hooks/useAuth"
import { ReactNode } from "react";

type Props = {
    children: ReactNode;
}

export const AuthProvider = ({children}: Props) => {
    useAuth();
    return <>{children}</>
}
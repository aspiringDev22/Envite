"use client";

import { AuthService } from "@/features/auth/services/auth-service";
import React, { useEffect } from "react";

export default function TestPage() {
    // const testSignUp = async () => {
    //   const response = await AuthService.signUp({
    //     email: "20uec021@lnmiit.ac.in",
    //     password: "test1234",
    //   });
    //   console.log(response);
    // };

  const testSignin = async () => {
    const response = await AuthService.signIn({
      email: "20uec021@lnmiit.ac.in",
      password: "test1234",
    });
    console.log(response);
  };

const testSignOut = async () => {
    const response = await AuthService.signOut();
    console.log(response);
}

const testGetSession = async() => {
    const response = await AuthService.getSession();
    console.log(response);
}

  useEffect(() => {
    // testSignUp();
    // testSignin();
    // testSignOut();
    testGetSession();
    // deleteUser();
  }, []);

  return <>This page is for testing purposes only!</>;
}

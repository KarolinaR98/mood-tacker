"use client";

import React from "react";
import Link from "next/link";
import Button from "./Button";
import { useAuth } from "@/app/context/AuthContext";

export default function CallToAction() {
  const { currentUser } = useAuth();

  if (currentUser) {
    return (
      <div className="max-w-[600px] mx-auto w-full">
        <Link href={"/dashboard"}>
          <Button dark full text="Go to Dashboard" />
        </Link>
      </div>
    );
  }


  return (
    <div className="grid grid-cols-2 gap-4 w-fit mx-auto">
      <Link href={"/dashboard"}>
        <Button text="Sign Up" />
      </Link>
      <Link href={"/dashboard"}>
        <Button text="Log In" dark />
      </Link>
    </div>
  );
}

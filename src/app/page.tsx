"use client"
import Header from "@/common/components/elements/templatess/Header";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/business/service/auth";

export default function IndexSSPage() {
  const router = useRouter();

  useEffect(() => {
    // Check authentication status when the component mounts
    if (!isAuthenticated()) {
      // If user is not authenticated, redirect to login page
      router.push("/auth/login");
    }
  }, [router]);

  return (
    <main>
      <Header />
    </main>
  )
}

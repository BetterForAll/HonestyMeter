"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const TEXTS = {
  title: "Thank you for your support! 🙏",
  redirectMessage: "You'll be redirected to the main page",
  home: "Home",
};

export default function ThankyouPage() {
  const router = useRouter();

  const redirectToHomePage = () => {
    router.push("/");
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      redirectToHomePage();
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  });

  return (
    <div className="w-full h-[500px] flex gap-6 flex-col justify-center items-center">
      <p className="text-base text-gray-900">{TEXTS.title}</p>
      <p className="text-base text-gray-900">{TEXTS.redirectMessage}</p>
      <Button
        variant="outline"
        size="lg"
        className="w-32"
        onClick={redirectToHomePage}
      >
        {TEXTS.home}
      </Button>
    </div>
  );
}

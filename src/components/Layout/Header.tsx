"use client";

import React from 'react';
import Image from 'next/image';
import logo from '../../../public/logo2.png';
import Link from 'next/link';

const TEXTS = {
  imageAlt: 'Honesty Meter Logo',
}

export default function Header() {
  return (
    <header className="w-full flex flex-col justify-center items-center px-6 py-8 md:px-12 md:py-10">
      <div className="w-full max-w-[536px] flex justify-around items-center mb-4 md:mb-6">
        <Link href="/">
          <Image
            src={logo}
            alt={TEXTS.imageAlt}
            className="w-full h-auto"
            priority
          />
        </Link>
      </div>
      <div className="flex flex-col justify-start mb-4 sm:mb-0 mt-0 sm:mt-2">
        <p className="text-sm text-muted-foreground text-center italic">
          Media Manipulation and Bias Detection
        </p>
        <p className="text-sm text-muted-foreground text-center italic">
          Auto-Improving with AI and User Feedback
        </p>
      </div>
    </header>
  );
}

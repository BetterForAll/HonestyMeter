import React from "react";
import Link from 'next/link';
import { Github } from 'lucide-react';
import ContactIcon from "../ContactIcon";
import { GITHUB_URL, PAGE_LABELS, PAGE_ROUTES } from "@/constants/constants";
import { EMPTY_FUNCTION } from "@/utils/utils";

interface FooterProps {
  setCurrentPage?: (pageIndex: number) => void;
  closeReport?: () => void;
}

export default function Footer({ setCurrentPage = EMPTY_FUNCTION, closeReport }: FooterProps) {
  return (
    <footer className="w-full max-w-[1000px] h-32 mx-auto px-4 py-7 flex gap-8 justify-center items-center">
      {PAGE_LABELS.map((pageLabel, pageIndex) => {
        return (
          <BottomNavTextLink
            pageIndex={pageIndex}
            setCurrentPage={setCurrentPage}
            closeReport={closeReport}
            key={pageLabel}
          />
        )
      })}
      <div className="flex justify-center items-center gap-4">
        <ContactIcon />
        <Link 
          href={GITHUB_URL} 
          target='_blank' 
          rel='noopener noreferrer' 
          className="text-gray-500 hover:text-indigo-600 transition-colors"
        >
          <Github className="w-5 h-5" />
        </Link>
      </div>
    </footer>
  )
}

interface BottomNavTextLinkProps {
  pageIndex: number;
  setCurrentPage?: (pageIndex: number) => void;
  closeReport?: () => void;
}

function BottomNavTextLink({ pageIndex, setCurrentPage, closeReport }: BottomNavTextLinkProps) {
  const handleClick = () => {
    if (pageIndex === 0) {
      if (closeReport) closeReport();
    }
    if (setCurrentPage) setCurrentPage(pageIndex)
  }

  return (
    <Link
      href={PAGE_ROUTES[pageIndex]}
      onClick={handleClick}
      className="text-sm text-gray-500 no-underline hover:text-indigo-600 transition-colors"
    >
      {PAGE_LABELS[pageIndex]}
    </Link>
  )
}

"use client";

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Github } from 'lucide-react';
import NextLink from 'next/link';
import ContactIcon from '@/components/ContactIcon';
import { GITHUB_URL, PAGE_LABELS, PAGE_URL_TO_INDEX_MAP, PAGE_ROUTES } from '@/constants/constants';
import { number, func, arrayOf, string } from 'prop-types';
import Badge from '../Badge/Badge';
import { UserButton, useUser } from '@clerk/nextjs';
import { cn } from '@/lib/utils';

// Helper to get page index from pathname
function getPageIndexFromPathname(pathname) {
  // Check exact match first
  if (PAGE_URL_TO_INDEX_MAP[pathname] !== undefined) {
    return PAGE_URL_TO_INDEX_MAP[pathname];
  }
  // Check for partial matches (e.g., /people/john-doe should match /people)
  const pathParts = pathname.split('/').filter(Boolean);
  if (pathParts.length > 0) {
    const basePath = `/${pathParts[0]}`;
    if (PAGE_URL_TO_INDEX_MAP[basePath] !== undefined) {
      return PAGE_URL_TO_INDEX_MAP[basePath];
    }
  }
  return 0; // Default to home
}

export default function Menu({ currentPage, setCurrentPage, pageRoutes, closeReport }) {
  const pathname = usePathname();
  const isBadgePage = pathname === '/badge' || pathname?.startsWith('/badge/');
  const [isBadgeActive, setIsBadgeActive] = useState(false);
  const biasLevel = isBadgeActive ? 4 : 5;
  const { isSignedIn } = useUser();
  
  // Derive active page from pathname
  const activePageIndex = isBadgePage ? -1 : getPageIndexFromPathname(pathname || '/');

  useEffect(() => {
    setIsBadgeActive(isBadgePage);
  }, [isBadgePage])

  const handleChange = (pageIndex) => {
    setCurrentPage(pageIndex);
    setIsBadgeActive(false);
  };

  const goToBadgePage = () => {
    setCurrentPage(null);
    setIsBadgeActive(true);
  }

  return (
    <div className="hidden md:block">
      <div className="flex justify-center items-center gap-2 mb-0">
        <nav className="flex items-center bg-white max-w-lg">
          {PAGE_LABELS.map((pageLabel, index) => (
            <NextLink 
              href={`/${pageRoutes[index]}`} 
              key={pageLabel}
              onClick={() => handleChange(index)}
              className={cn(
                "px-4 py-2 text-sm text-gray-600 no-underline transition-colors hover:text-indigo-600",
                activePageIndex === index && "text-indigo-600 border-b-2 border-indigo-600"
              )}
            >
              {pageLabel}
            </NextLink>
          ))}
        </nav>
        <NextLink href='/badge' onClick={goToBadgePage}>
          <Badge biasLevel={biasLevel} isMenu isTooltipShownOnDesktop width='85px' showBadgeName fadeTimeout={0} showFullTooltip />
        </NextLink>
        <div className="flex justify-center items-center gap-4 ml-10">
          <ContactIcon />
          <a
            href={GITHUB_URL}
            target='_blank'
            rel='noopener noreferrer'
            className="text-gray-500 hover:text-indigo-600 transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
          {isSignedIn && (
            <div className="w-8 h-8">
              <UserButton afterSignOutUrl='/' />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Menu.propTypes = {
  currentPage: number,
  setCurrentPage: func,
  pageRoutes: arrayOf(string),
  closeReport: func,
};

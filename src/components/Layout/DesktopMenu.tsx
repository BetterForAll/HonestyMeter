"use client";

import React, { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { Github } from 'lucide-react';
import NextLink from 'next/link';
import NProgress from 'nprogress';
import ContactIcon from '@/components/ContactIcon';
import { GITHUB_URL, PAGE_LABELS, PAGE_URL_TO_INDEX_MAP, PAGE_ROUTES } from '@/constants/constants';
import Badge from '../Badge/Badge';
import { UserButton, useUser } from '@clerk/nextjs';
import { cn } from '@/lib/utils';
import { EmptyFunction } from '@/types/common'; // Assuming common types will be added, or define locally

// Helper to get page index from pathname
function getPageIndexFromPathname(pathname: string | null) {
  if (!pathname) return 0;

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

interface DesktopMenuProps {
  currentPage?: number | null;
  setCurrentPage: (page: number | null) => void;
  pageRoutes: string[];
  closeReport?: () => void;
}

export default function Menu({ currentPage, setCurrentPage, pageRoutes, closeReport }: DesktopMenuProps) {
  const pathname = usePathname();
  const isBadgePage = pathname === '/badge' || pathname?.startsWith('/badge/');
  const [isBadgeActive, setIsBadgeActive] = useState(false);
  const biasLevel = isBadgeActive ? 4 : 5;
  const { isSignedIn } = useUser();
  
  // Derive active page from pathname
  const activePageIndex = isBadgePage ? -1 : getPageIndexFromPathname(pathname);
  
  // Refs for sliding indicator
  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  // Update indicator position when active page changes
  useEffect(() => {
    if (activePageIndex >= 0 && activePageIndex < itemRefs.current.length) {
      const activeItem = itemRefs.current[activePageIndex];
      if (activeItem && navRef.current) {
        const navRect = navRef.current.getBoundingClientRect();
        const itemRect = activeItem.getBoundingClientRect();
        setIndicatorStyle({
          left: itemRect.left - navRect.left,
          width: itemRect.width,
        });
      }
    } else {
      // Hide indicator when on badge page or invalid index
      setIndicatorStyle({ left: 0, width: 0 });
    }
  }, [activePageIndex]);

  useEffect(() => {
    setIsBadgeActive(isBadgePage);
  }, [isBadgePage])

  const handleChange = (pageIndex: number) => {
    NProgress.start();
    setCurrentPage(pageIndex);
    setIsBadgeActive(false);
  };

  const goToBadgePage = () => {
    NProgress.start();
    setCurrentPage(null);
    setIsBadgeActive(true);
  }

  return (
    <div className="hidden md:block">
      <div className="flex justify-center items-center gap-2 mb-0">
        <nav ref={navRef} className="relative flex items-center bg-white max-w-lg">
          {PAGE_LABELS.map((pageLabel, index) => (
            <NextLink 
              ref={(el) => { itemRefs.current[index] = el }}
              href={`/${pageRoutes[index]}`} 
              key={pageLabel}
              onClick={() => handleChange(index)}
              className={cn(
                "px-4 py-2 text-sm text-gray-600 no-underline transition-colors hover:text-indigo-600",
                activePageIndex === index && "text-indigo-600"
              )}
            >
              {pageLabel}
            </NextLink>
          ))}
          {/* Sliding indicator */}
          <span
            className="absolute bottom-0 h-0.5 bg-indigo-600 transition-all duration-300 ease-in-out"
            style={{
              left: indicatorStyle.left,
              width: indicatorStyle.width,
              opacity: activePageIndex >= 0 ? 1 : 0,
            }}
          />
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


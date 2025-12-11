"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu as MenuIcon, Home, Info, Gavel, Users, Mail, Github, X } from "lucide-react";
import Badge from "../Badge/Badge";
import { EMPTY_STRING, GITHUB_URL, PAGE_LABELS, EMAIL_ADDRESS } from "@/constants/constants";
import { UserButton, useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const MAIL_TO_PREFIX = "mailto:";
const MAIL_TO = MAIL_TO_PREFIX + EMAIL_ADDRESS;
const TEXTS = {
  contact: "Contact",
  github: "GitHub",
};
const MENU_ITEMS = [...PAGE_LABELS, TEXTS.contact, TEXTS.github];
const MENU_ICONS = [Home, Users, Info, Gavel, Mail, Github];

interface MobileMenuProps {
  setCurrentPage: (page: number | null) => void;
  closeReport: () => void;
  pageRoutes: string[];
}

export default function MobileMenu({ setCurrentPage, closeReport, pageRoutes }: MobileMenuProps) {
  const pathname = usePathname();
  const isBadgePage = pathname === '/badge';
  const [isOpen, setIsOpen] = useState(false);
  const [isBadgeActive, setIsBadgeActive] = useState(isBadgePage);
  const biasLevel = isBadgeActive ? 4 : 5;
  const { isSignedIn } = useUser();

  useEffect(() => {
    setIsBadgeActive(isBadgePage);
  }, [isBadgePage])

  const toggleDrawer = () => setIsOpen(!isOpen);
  const closeDrawer = () => setIsOpen(false);

  const onMenuItemClick = (index: number) => () => {
    if (index === 0) closeReport();
    setCurrentPage(5);
    setIsBadgeActive(false);
    closeDrawer();
  };

  const goToBadgePage = () => {
    setCurrentPage(null);
    setIsBadgeActive(true);
  }

  return (
    <div className="block md:hidden">
      <div className="flex justify-end items-center relative px-4 pb-4">
        {isSignedIn && <UserButton afterSignOutUrl='/' />}
        <Link href='/badge' onClick={goToBadgePage} className="ml-4">
          <Badge biasLevel={biasLevel} isMenu width="70px" height="70px" showBadgeName fadeTimeout={0} />
        </Link>
        <Button variant="ghost" size="icon" onClick={toggleDrawer} className="h-10">
          <MenuIcon className="w-6 h-6" />
        </Button>
      </div>

      {/* Drawer Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={closeDrawer}
        />
      )}

      {/* Bottom Drawer */}
      <div className={cn(
        "fixed bottom-0 left-0 right-0 bg-white z-50 rounded-t-xl shadow-lg transition-transform duration-300",
        isOpen ? "translate-y-0" : "translate-y-full"
      )}>
        <div className="flex justify-end p-2">
          <Button variant="ghost" size="icon" onClick={closeDrawer}>
            <X className="w-5 h-5" />
          </Button>
        </div>
        <nav className="pb-6">
          {MENU_ITEMS.map((text, index) => {
            const Icon = MENU_ICONS[index];
            const { link, target } = getLinkData(index, pageRoutes);

            return (
              <Link 
                href={link} 
                target={target}
                key={text}
                onClick={onMenuItemClick(index)}
                className="flex items-center gap-4 px-6 py-3 text-gray-700 no-underline hover:bg-gray-100 transition-colors"
              >
                <Icon className="w-5 h-5 text-gray-500" />
                <span>{text}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

function getLinkData(index: number, pageRoutes: string[]) {
  const isContact = index === 4;
  const isGitHub = index === 5;
  let link = EMPTY_STRING;
  let target = EMPTY_STRING;

  if (isContact) {
    link = MAIL_TO;
  } else if (isGitHub) {
    link = GITHUB_URL;
    target = "_blank";
  } else {
    link = '../' + pageRoutes[index];
  }

  return { link, target };
}

"use client";

import React from "react";
import Header from "@/components/Layout/Header";
import Menu from "@/components/Layout/DesktopMenu";
import MobileMenu from "@/components/Layout/MobileMenu";
import Footer from "@/components/Layout/Footer";
import { PAGE_ROUTES } from "@/constants/constants";
import { useHomePageContext } from "./providers";

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const { closeReport } = useHomePageContext();

  return (
    <div className="flex flex-col min-h-screen *:active:outline-none *:focus:outline-none *:active:bg-transparent *:focus:bg-transparent">
      <Header />
      <Menu
        currentPage={0}
        setCurrentPage={() => {}}
        pageRoutes={PAGE_ROUTES}
        closeReport={closeReport}
      />
      <MobileMenu
        setCurrentPage={() => {}}
        pageRoutes={PAGE_ROUTES}
        closeReport={closeReport}
      />
      <hr className="border-gray-200" />
      {children}
      <hr className="border-gray-200" />
      <Footer setCurrentPage={() => {}} closeReport={closeReport} />
    </div>
  );
}

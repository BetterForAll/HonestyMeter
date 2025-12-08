import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import Header from "@/components/Layout/Header";
import Menu from "@/components/Layout/DesktopMenu";
import { useRouter } from "next/router";
import mixpanel from "mixpanel-browser";
import Footer from "@/components/Layout/Footer";
import { PAGE_ROUTES, PAGE_URL_TO_INDEX_MAP } from "@/constants/constants";
import useHomePage from "@/hooks/useHomePage";
import MobileMenu from "@/components/Layout/MobileMenu";
import { Analytics } from "@vercel/analytics/react";
import { isServer, scrollToTop } from "@/utils/utils";
// import GoogleTranslate from "@/components/GoogleTranslate";
import { ClerkProvider } from "@clerk/nextjs";
import "../globals.css"; // New Tailwind CSS
import "../global.css";  // Keep legacy styles during migration
import Script from "next/script";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const MIXPANEL_TOKEN = "8121618e088b8916064a9449a6d800e6";

export default function MyApp(props) {
  const { Component, pageProps } = props;
  const router = useRouter();
  const { pathname = "/" } = router || {};
  const initialPageIndex = PAGE_URL_TO_INDEX_MAP[pathname] || 0;
  const [currentPage, setCurrentPage] = useState(initialPageIndex);
  const homePageProps = useHomePage();
  const { closeReport } = homePageProps;

  useEffect(() => {
    setCurrentPage(initialPageIndex);
    if (initialPageIndex === -1) {
      setCurrentPage(null);
    }

    scrollToTop();
  }, [initialPageIndex]);

  useEffect(() => {
    if (isServer()) return;

    mixpanel.init(MIXPANEL_TOKEN);

    const distinctId = mixpanel.get_distinct_id();
    mixpanel.identify(distinctId);

    mixpanel.people.set_once({
      distinct_id: distinctId,
      "First Seen": new Date().toISOString(),
    });

    const handleRouteChange = (url) => {
      mixpanel.track("Page View", {
        distinct_id: distinctId,
        page: url,
      });
    };

    handleRouteChange(window.location.pathname);

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        {/* <meta name="robots" content="noindex, nofollow" /> */}
      </Head>
      <ClerkProvider {...pageProps}>
        <div className="flex flex-col min-h-screen *:active:outline-none *:focus:outline-none *:active:bg-transparent *:focus:bg-transparent">
          {/* <GoogleTranslate /> */}
          <Header />
          <Menu
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageRoutes={PAGE_ROUTES}
            closeReport={closeReport}
          />
          <MobileMenu
            setCurrentPage={setCurrentPage}
            pageRoutes={PAGE_ROUTES}
            closeReport={closeReport}
          />
          <hr className="border-gray-200" />
          <Component homePageProps={homePageProps} {...pageProps} />
          <hr className="border-gray-200" />
          <Footer setCurrentPage={setCurrentPage} closeReport={closeReport} />
        </div>
      </ClerkProvider>
      <Analytics />
      <Script src="/badge_script.js" strategy="afterInteractive" />
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

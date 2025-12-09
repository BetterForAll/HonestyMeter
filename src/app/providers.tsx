"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import mixpanel from "mixpanel-browser";

const MIXPANEL_TOKEN = "8121618e088b8916064a9449a6d800e6";

interface HomePageContextType {
  article: string;
  report: any;
  shareLevel: number;
  isReportForPublishing: boolean;
  setIsReportForPublishing: (value: boolean) => void;
  handleArticleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  clearArticleInput: () => void;
  handleGetReport: () => Promise<void>;
  closeReport: () => void;
  isUrlProvidedAsInput: boolean;
  isLoading: boolean;
}

const HomePageContext = createContext<HomePageContextType | null>(null);

export function useHomePageContext() {
  const context = useContext(HomePageContext);
  if (!context) {
    throw new Error("useHomePageContext must be used within a HomePageProvider");
  }
  return context;
}

const URL_REGEX = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

export function HomePageProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter(); // Use App Router
  const pathname = usePathname();
  const [article, setArticle] = useState("");
  const [report, setReport] = useState<any>(null);
  const [shareLevel, setShareLevel] = useState(0);
  const [isReportForPublishing, setIsReportForPublishing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isUrlProvidedAsInput = URL_REGEX.test(article.trim());

  const handleArticleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setArticle(e.target.value);
  }, []);

  const clearArticleInput = useCallback(() => {
    setArticle("");
    setReport(null);
    setIsLoading(false);
  }, []);

  const handleGetReport = useCallback(async () => {
    if (!article.trim()) return;
    
    setIsLoading(true);

    try {
      const response = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: article, isForPublishing: isReportForPublishing }),
      });

      const data = await response.json();

      if (data.reportId) {
        // Use proper navigation
        router.push(`/report/${data.reportId}`);
      } else {
        setIsLoading(false); // Only stop loading if we didn't navigate
      }
    } catch (error) {
      console.error("Error getting report:", error);
      setIsLoading(false);
    }
  }, [article, isReportForPublishing, router]);

  const closeReport = useCallback(() => {
    setReport(null);
  }, []);

  return (
    <HomePageContext.Provider
      value={{
        article,
        report,
        shareLevel,
        isReportForPublishing,
        setIsReportForPublishing,
        handleArticleChange,
        clearArticleInput,
        handleGetReport,
        closeReport,
        isUrlProvidedAsInput,
        isLoading, 
      }}
    >
      {children}
    </HomePageContext.Provider>
  );
}

// Analytics Provider
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    mixpanel.init(MIXPANEL_TOKEN);

    const distinctId = mixpanel.get_distinct_id();
    mixpanel.identify(distinctId);

    mixpanel.people.set_once({
      distinct_id: distinctId,
      "First Seen": new Date().toISOString(),
    });
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const distinctId = mixpanel.get_distinct_id();
    mixpanel.track("Page View", {
      distinct_id: distinctId,
      page: pathname,
    });
  }, [pathname]);

  return <>{children}</>;
}

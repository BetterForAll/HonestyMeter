import React, { ChangeEvent, MouseEventHandler } from "react";
import { WOLRD_NEWS_API_URL } from "@/constants/constants";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const TEXTS = {
  placeholder: "Paste link or text for bias analysis",
  alert: "Please enter an article",
  cta: "Discover the truth",
  postInNewsFeed: "post report in news feed",
  articleTextExtracted: "text extraction by url powered by",
  worldNewsApi: "world news api",
};

interface ArticleInputProps {
  article: string;
  onArticleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onGetReport: MouseEventHandler<HTMLButtonElement>;
  isUrlProvidedAsInput?: boolean;
  isPublished: boolean;
  setIsPublished: (isPublished: boolean) => void;
  isPublishEnabled?: boolean;
}

export default function ArticleInput({
  article,
  onArticleChange,
  onGetReport,
  isUrlProvidedAsInput,
  isPublished,
  setIsPublished,
  isPublishEnabled,
}: ArticleInputProps) {
  const handlePublishedChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsPublished(event.target.checked);
  };

  return (
    <div className="max-w-[1000px] flex flex-col items-center mx-auto w-full">
      <Textarea
        id="article-input"
        placeholder={TEXTS.placeholder}
        value={article}
        onChange={onArticleChange}
        className="w-full mb-2 h-52 resize-none"
        rows={8}
      />

      {isPublishEnabled ? (
        <div className="w-full flex items-center justify-between gap-2 flex-wrap mb-2">
          <p className="text-xs text-gray-500 text-center w-full sm:w-auto">
            {TEXTS.articleTextExtracted}
            &nbsp;
            <a 
              href={WOLRD_NEWS_API_URL} 
              target="_blank" 
              rel="noreferrer"
              className="text-gray-500 hover:text-indigo-600"
            >
              {TEXTS.worldNewsApi}
            </a>
          </p>
          <label className="flex items-center gap-2 text-xs text-gray-500 w-full sm:w-auto justify-center sm:justify-end cursor-pointer">
            <input
              type="checkbox"
              checked={isPublished}
              onChange={handlePublishedChange}
              className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            {TEXTS.postInNewsFeed}
          </label>
        </div>
      ) : (
        <div className="h-4 sm:h-10" />
      )}
      
      <Button
        onClick={onGetReport}
        size="lg"
        className="w-full h-16 text-lg font-semibold"
      >
        {TEXTS.cta}
      </Button>
    </div>
  );
}

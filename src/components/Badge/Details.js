import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Badge from './Badge';
import { Copy, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { EMPTY_STRING } from '@/constants/constants';

const TEXTS = {
    sharingOptions: {
        getHtml: (biasLevel, biasLevelText) => {
            const isGeneralBadge = biasLevel === 3;
            const isMediumOrGeneral = biasLevel === 1 || isGeneralBadge;
            const imageSrcSuffix = isMediumOrGeneral ? EMPTY_STRING : `_${biasLevelText}`;
            const linkSuffix = isGeneralBadge ? EMPTY_STRING : `/${biasLevelText}`;

            return `
        <a href="https://www.honestymeter.com/badge${linkSuffix}" target="_blank">
            <img src="https://www.honestymeter.com/badge${imageSrcSuffix}.svg" width="140" height="140" alt="Honesty Badge" title="Click to view the badge" style="cursor:pointer;">
        </a>
        `
        },
        shareAsText: 'Honesty Badge by HonestyMeter. View the badge at',
        hashtags: '#HonestyBadge #HonestyMeter',
        getDirectUrl: (biasLevel, biasLevelText) => {
            const suffix = biasLevel === 3 ? EMPTY_STRING : `/${biasLevelText}`;
            return `HonestyBadge.com${suffix}`
        },
        script: '<script src="https://honestymeter.com/badge_script.js" defer></script>'
    },
    biasLevel: {
        0: 'fair',
        1: 'medium',
        2: 'high',
        3: EMPTY_STRING
    },
    copied: 'Copied!',
    copy: 'Copy',
}

export default function DetailsBias({ biasLevel = 1 }) {
    const [isCopied, setCopied] = useState(false);
    const [option, setOption] = useState(0);
    const biasLevelText = TEXTS.biasLevel[biasLevel];
    const html = TEXTS.sharingOptions.getHtml(biasLevel, biasLevelText)
    const badgeUrl = TEXTS.sharingOptions.getDirectUrl(biasLevel, biasLevelText)
    const isGeneralBadge = biasLevel === 3;
    const isMediumOrHighBias = biasLevel === 1 || biasLevel === 2;
    const isFairContentBadge = biasLevel === 0;

    const getTitle = (clickedOption) => {
        const isClickedOption = clickedOption === option;
        const isOptionCopied = isClickedOption && isCopied;

        return isOptionCopied ? TEXTS.copied : TEXTS.copy
    }

    const copyToClipboard = (text, option) => {
        navigator.clipboard.writeText(text);
        setOption(option);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full max-h-[85vh] mx-auto text-gray-900 overflow-x-auto bg-white p-6 rounded-lg shadow-lg">
            {!isFairContentBadge && (
                <>
                    <div className="flex flex-col items-center justify-center p-4">
                        {isGeneralBadge && (
                            <p className="text-base text-gray-900 mb-2 mr-4">
                                Note: If you are an author or publisher who prefers to display a badge indicating the level of bias detected in content,
                                you can choose from one of the following badges instead:&nbsp;
                                <Link href="/badge/fair" className="text-indigo-600 no-underline">
                                    Fair Content Badge,
                                </Link>
                                &nbsp;
                                <Link href="/badge/medium" className="text-indigo-600 no-underline">
                                    Medium Bias Badge,
                                </Link>
                                &nbsp;
                                <Link href="/badge/high" className="text-indigo-600 no-underline">
                                    High Bias Badge,
                                </Link>
                            </p>
                        )}
                        {isMediumOrHighBias && (
                            <p className="text-base text-gray-900 mb-2 mr-4">
                                Note: If you prefer to share a general badge that shows your support for fair content, without specifying the level of bias, please
                                &nbsp;
                                <Link href="/badge" className="text-indigo-600 no-underline">
                                    click here
                                </Link>
                            </p>
                        )}
                    </div>
                    <hr className="border-gray-200 my-4" />
                </>
            )}

            <div className="w-full">
                <div className="flex flex-col items-center justify-center p-4 border-b border-gray-200">
                    <div className="flex items-center w-full justify-between">
                         <div className="text-base text-gray-900 mb-2 mr-4">
                            Share as text: &nbsp;
                            <span className="text-indigo-600 font-medium">
                                {TEXTS.sharingOptions.shareAsText} &nbsp; {badgeUrl}
                            </span>
                        </div>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" onClick={() => copyToClipboard(`${TEXTS.sharingOptions.shareAsText} ${badgeUrl}`, 2)}>
                                        <Copy className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{getTitle(2)}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center p-4 border-b border-gray-200">
                    <div className="flex items-center w-full justify-between">
                        <div className="text-base text-gray-900 mb-2 mr-4">
                            hashtags:
                            &nbsp;
                            <span className="text-indigo-600 font-medium">
                                {TEXTS.sharingOptions.hashtags}
                            </span>
                        </div>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" onClick={() => copyToClipboard(TEXTS.sharingOptions.hashtags, 3)}>
                                        <Copy className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{getTitle(3)}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center p-4 border-b border-gray-200">
                    <div className="flex items-center w-full justify-between">
                        <div className="text-base text-gray-900 mb-2 mr-4">
                            Share this direct link: &nbsp;
                            <span className="text-indigo-600 font-medium">
                                {badgeUrl}
                            </span>
                        </div>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" onClick={() => copyToClipboard(TEXTS.sharingOptions.getDirectUrl(biasLevel, biasLevelText), 4)}>
                                        <Copy className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{getTitle(4)}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>

                {isGeneralBadge && (
                    <>
                        <div className="flex flex-col items-center justify-center p-4 border-b border-gray-200">
                            <p className="font-bold text-lg mb-4">
                                Display Honesty Badge on your website
                            </p>
                            <FloatingBadge />
                            <p className="text-base text-gray-900 mb-2 mr-4">
                                Add this line to the head section of your website:
                            </p>
                            <div className="relative bg-gray-600 text-white rounded p-8 mb-4 w-full break-all">
                                <div className="absolute top-0 right-0">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button variant="ghost" size="icon" className="text-white hover:text-gray-200 hover:bg-gray-500" onClick={() => copyToClipboard(TEXTS.sharingOptions.script, 0)}>
                                                    <Copy className="h-4 w-4" />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{getTitle(0)}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                                <p className="font-mono whitespace-pre-line">
                                    {TEXTS.sharingOptions.script}
                                </p>
                            </div>
                            <p className="text-base text-gray-900 mb-2 mr-4">
                                The close button removes the badge till the next session.
                            </p>
                            <p className="text-base text-gray-900 mb-2 mr-4">
                                For custom badge options please&nbsp;
                                <Link href="mailto:info@honestymeter.com" className="text-indigo-600 no-underline">
                                    contact us
                                </Link>.
                            </p>
                        </div>
                    </>
                )}

                <div className="flex flex-col items-center justify-center p-4 border-b border-gray-200">
                    <p className="font-bold text-lg mb-2">
                        Embed in Specific Website Parts
                    </p>
                    <Badge biasLevel={biasLevel} />

                    <p className="text-base text-gray-900 mb-2 mr-4 text-center mt-4">
                        {`To embedd in specific places on your website, copy the following HTML`}
                    </p>
                    <div className="relative bg-gray-600 text-white rounded p-8 w-full break-all">
                        <div className="absolute top-0 right-0">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="ghost" size="icon" className="text-white hover:text-gray-200 hover:bg-gray-500" onClick={() => copyToClipboard(html, 1)}>
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{getTitle(1)}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        <p className="font-mono whitespace-pre-line">
                            {html}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center p-4">
                    <p className="font-bold text-lg mb-4">
                        Create API Integration
                    </p>
                    <p className="text-base text-gray-900 mb-2 mr-4">
                        If you are interested in creating an API integration, please&nbsp;
                        <Link href="mailto:info@honestymeter.com" className="text-indigo-600 no-underline">
                            contact us
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

function FloatingBadge() {
    return (
        <div className="relative cursor-pointer bg-white/60 pt-2 px-2 rounded-xl mb-4">
            <Link href="" className="no-underline text-black">
                <Image src="/badge.svg" width={140} height={140} alt="Honesty Badge" />
            </Link>
            <button className="absolute top-2 right-2 cursor-pointer bg-[#19857B] text-white w-5 h-5 border-none p-[1px] min-w-0 flex justify-center items-center hover:bg-[#106b5b] rounded-sm">
               <X className="w-4 h-4"/>
            </button>
        </div>
    );
}

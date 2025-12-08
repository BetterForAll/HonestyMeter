import React, { useState } from 'react';
import Badge from '@/components/Badge/Badge';
import { ArrowDown, X } from 'lucide-react';
import Link from 'next/link';
import Details from './Details';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

const TEXTS = {
    biasLevel: {
        0: 'low',
        1: 'medium',
        2: 'high',
        3: 'irrelevant'
    }
}

function BadgePageComponent({ biasLevel = 1 }) {
    const [isSharingDetailsShown, setSharingDetailsShown] = useState(false);
    const isLowBias = biasLevel === 0;
    const isMediumOrHighBias = biasLevel === 1 || biasLevel === 2;
    const isGeneralBadge = biasLevel === 3;

    return (
        <div className="max-w-[1000px] mx-auto p-4 sm:p-8 text-gray-900">
            <div className="p-6 mb-4 bg-white rounded-lg shadow-lg">
                <div onClick={() => setSharingDetailsShown(true)} className="w-full flex justify-center mb-4 cursor-pointer">
                    <Badge biasLevel={biasLevel} showFullTooltip showComment />
                </div>
                <p className="text-center mb-4 text-gray-500 text-xs sm:text-sm">
                    Free, AI-Powered Bias Analysis
                </p>
                <div className="text-gray-500 text-center flex w-full flex-wrap justify-center items-center flex-col font-bold text-lg mb-2">
                    {
                        isMediumOrHighBias &&
                        <>
                            <span className="text-base sm:text-lg mb-4">
                                {`Assigned to content with ${TEXTS.biasLevel[biasLevel]} bias level.`}
                            </span>
                            <p className="font-bold text-xl sm:text-2xl text-gray-800">
                                Shared by publishers <br /> championing full transparency.
                            </p>
                        </>
                    }
                    {
                        isLowBias &&
                        <>
                            <div className="text-green-600 text-center flex w-full flex-wrap justify-center mb-2 font-bold text-lg">
                                <span className="font-bold">
                                    Awarded to content for its adherence to our standards of objectivity.
                                </span>
                            </div>
                        </>
                    }
                    {
                        isGeneralBadge &&
                        <div>
                            <div className="text-purple-600 text-center flex w-full flex-wrap justify-center mb-2 font-bold text-lg">
                                <span className="font-bold">
                                    Endorsement of
                                </span>&nbsp;
                                <span className="font-bold">Transparency and Fairness</span>
                            </div>
                            <p className="mb-0 text-purple-600 text-left text-base font-normal">
                                By displaying this badge, individuals and platforms express their endorsement of transparency,
                                fairness, and the encouragement of open discussion and critical evaluation of bias in their content,
                                whether the content is absolutely neutral or highly biased.
                            </p>
                        </div>
                    }
                </div>
            </div>
            {verifyBadge(biasLevel)}
            <CTA isSharingDetailsShown={isSharingDetailsShown} setSharingDetailsShown={setSharingDetailsShown} biasLevel={biasLevel} />

            {
                isGeneralBadge &&
                <p className="text-base text-gray-900 mb-6">
                    If you share our vision of transparent, unbiased media, display our badge
                    with any content you post on platforms or social networks that you use or manage.
                    It enhances trust and engagement with your content.
                    Every share promotes awareness of media transparency and makes the world a little fairer.
                </p>
            }
            {
                isMediumOrHighBias &&
                <div className="font-bold text-lg mb-2">
                    <span>
                        Marking every piece of content with its bias level is not suitable for most content platforms! &nbsp;
                    </span>
                    <span className="font-normal text-base block mt-2">
                        Under these circumstances, we highly recommend displaying the&nbsp;
                        <Link href="/badge" className="text-indigo-600 no-underline">
                            general Honesty Badge
                        </Link>
                        , which demonstrates support for fair content without specifying the level of bias.
                        Users who click on the badge will have the opportunity to generate a bias report on our homepage, should they choose to do so.
                        Thus, using a&nbsp;
                        <Link href="/badge" className="text-indigo-600 no-underline">
                            general Honesty Badge
                        </Link>
                        &nbsp;is highly valued. It reflects the publisher&apos;s commitment to fair content and
                        helps greatly in promoting transparency.
                        To share the general Honesty Badge, please&nbsp;
                        <Link href="/badge" className="text-indigo-600 no-underline">
                            click here
                        </Link>.
                        &nbsp;
                    </span>
                </div>}
            <hr className="mb-6 border-gray-200" />
            {
                !isLowBias &&
                <>
                    <p className="font-bold text-lg mb-2">
                        Author&apos;s and Publisher&apos;s Transparency
                    </p>
                    <p className="text-base text-gray-900 mb-4">
                        If this badge was shared by the author or publishing platform, it strongly indicates the publisher&apos;s commitment to transparency,
                        fairness, and openness to discussion and critical evaluation of the content. It&apos;s important to understand
                        that the presence of bias in the content does not mean that the bias was applied intentionally to manipulate the audience.
                        In many cases, biased content is created unknowingly with the best of intentions. Some level of bias is often inevitable,
                        especially in opinion pieces on controversial topics. Our main objective is to counteract severe media manipulations that can
                        significantly distort facts and lead the audience to a false perception of reality.
                        These manipulations include misleading headlines, omission of key information, biased framing, among many others.
                        It&apos;s highly unlikely that those who intentionally publish content with severe misleading manipulations will share our Honesty Badge.

                    </p>
                    <p className="font-bold text-lg mb-2">
                        Commitment to Openness by Authors and Publishers
                    </p>
                    <p className="text-base text-gray-900 mb-4">
                        We&apos;d like to emphasize that if this badge was shared by the author or publisher, it significantly increases the likelihood of their trustworthiness,
                        regardless of the bias level. This willingness to openly invite the audience to evaluate the content&apos;s bias level
                        demonstrates a commitment to honest communication and aligns with the vision of fair and transparent media.
                        Therefore, it&apos;s pretty reasonable to assume that an author or publisher who openly shares a badge
                        and invites the audience to engage in open discussion can be more likely trusted than those who don&apos;t.
                    </p>
                </>
            }
            <p className="font-bold text-lg mb-2">
                Disclaimer: Honesty Meter in Experimental Stage
            </p>
            <p className="text-base text-gray-900 mb-4">
                Honesty Meter, the technology behind the Honesty Badge, is in an experimental stage.
                We recommend critically evaluating the content and bias reports generated.
                While we are continuously working on improving the system, even in its current state,
                the bias reports often provide valuable insights that are hard for humans to detect.
            </p>
            {
                isGeneralBadge &&
                <>
                    <p className="font-bold text-lg mb-2">
                        Support the Truth, Increase Trust and Engagement - Share Honesty Badge in Your Content
                    </p>
                    <p className="text-base text-gray-900 mb-4">
                        Sharing the Honesty Badge offers several benefits: It serves as a powerful trust signal for your audience, showcasing your commitment to transparency.
                        It highlights your significant and active contribution to transparent and truthful media.
                        The badge helps your content stand out and encourages your audience to increase their engagement with your content and to share it more widely.
                    </p>
                    <p className="text-base text-gray-900 mb-4">
                        If you share our vision of transparent, unbiased media, display our badge
                        with any content you post on platforms or social networks that you use or manage.
                        Every share promotes awareness of media transparency and makes the world a little fairer.
                    </p>
                    <CTA isSharingDetailsShown={isSharingDetailsShown} setSharingDetailsShown={setSharingDetailsShown} biasLevel={biasLevel} />
                </>
            }
        </div >
    );
}

function CTA({ isSharingDetailsShown, setSharingDetailsShown, biasLevel }) {
    return (<div className="text-center text-indigo-600">
        <p className="font-bold text-lg mb-1 text-inherit">
            - Support the Truth
        </p>
        <p className="font-bold text-lg text-inherit">
            - Increase Trust and Engagement
        </p>
        <ArrowDown className="text-inherit mx-auto" />
        <div className="w-full flex flex-col justify-center items-center text-inherit mb-4 mt-2">
            <Dialog open={isSharingDetailsShown} onOpenChange={setSharingDetailsShown}>
                <DialogTrigger asChild>
                    <Button
                        variant="default"
                        className="mb-4 bg-indigo-600 hover:bg-indigo-700 text-white"
                        onClick={() => setSharingDetailsShown(true)}>
                        Share Honesty Badge
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-w-[800px] w-[95%] max-h-[95vh] overflow-y-auto p-0 bg-transparent border-none shadow-none">
                     <div className="relative w-full bg-white rounded-lg shadow-xl overflow-hidden">
                        <div className="absolute top-2 right-2 z-10">
                            <Button variant="ghost" size="icon" onClick={() => setSharingDetailsShown(false)}>
                                <X className="h-6 w-6 text-gray-500" />
                            </Button>
                        </div>
                        <Details biasLevel={biasLevel} />
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    </div>)
}

function verifyBadge(biasLevel) {
    const isGeneralBadge = biasLevel === 3;

    return (
        <p className="text-center mb-2 text-gray-500 text-base">
            {
                isGeneralBadge ?
                    <>
                        To generate a bias report, please visit our&nbsp;
                        <Link href="/" className="text-indigo-600 no-underline">
                            homepage
                        </Link>&nbsp;
                    </>
                    :
                    <>
                        To verify the badge, you can generate a bias report on our&nbsp;
                        <Link href="/" className="text-indigo-600 no-underline">
                            homepage
                        </Link>&nbsp;
                        if you haven&apos;t already done so.
                    </>
            }
        </p>
    )
}

export default BadgePageComponent;

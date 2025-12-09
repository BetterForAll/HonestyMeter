import Link from 'next/link'
import React from 'react'
import { Card, CardContent } from '../ui/card'
import { AlertTriangle } from 'lucide-react'

const TEXTS = {
    title: 'Caution',
    body: `Due to inherent human biases, it may seem that reports on articles aligning with our views are crafted by opponents. 
    Conversely, reports about articles that contradict our beliefs might seem to be authored by allies.
    However, such perceptions are likely to be incorrect. 
    These impressions can be caused by the fact that in both scenarios, articles are subjected to critical evaluation. 
    `,
    mainMessage: `
    This report is the product of an AI model that is significantly less biased than human analyses
    and has been explicitly instructed to strictly maintain 100% neutrality.
    `,
    feedbackPart1: `
    Nevertheless, HonestyMeter is in the experimental stage and is continuously improving through user feedback.  
    If the report seems inaccurate, we encourage you to`,
    feedbackPart2: `
    , helping us enhance the accuracy and reliability of HonestyMeter and contributing to media transparency.`,
    submitFeedback: 'submit feedback',
}

export default function Warning() {
    return (
        <Card className="w-full border-amber-200 bg-amber-50">
            <CardContent className="p-4 text-amber-800">
                <div className="flex items-start gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">
                        <span className="font-semibold">{TEXTS.title}!</span> {TEXTS.body}
                        <span className="underline">{TEXTS.mainMessage}</span>
                    </p>
                </div>
                <p className="text-sm ml-7">
                    {TEXTS.feedbackPart1}{' '}
                    <Link href="" className="text-indigo-600 hover:underline font-medium">
                        {TEXTS.submitFeedback}
                    </Link>{' '}
                    {TEXTS.feedbackPart2}
                </p>
            </CardContent>
        </Card>
    )
}

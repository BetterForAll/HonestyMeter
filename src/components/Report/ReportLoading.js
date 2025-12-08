import React from 'react'
import LinearBuffer from '../LinearBuffer'
import { Loader2 } from 'lucide-react'

const TEXTS = {
    messageLine1: 'Hold Tight, The Truth Is Loading...And It\'s Worth It!',
    messageLine2: 'It may take 30-180 seconds to generate the report.',
}

export default function ReportLoading() {
    return (
        <div className="flex flex-col justify-center items-center min-h-[250px]">
            <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
            <LinearBuffer />
            <p className="text-sm text-gray-500 mb-4 text-center">
                {TEXTS.messageLine1}
            </p>
            <p className="text-sm text-gray-500 text-center">
                {TEXTS.messageLine2}
            </p>
        </div>
    )
}

"use client";

import React from 'react';
import { func, string } from 'prop-types';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EMPTY_FUNCTION } from '@/utils/utils';
import { EMPTY_STRING } from '@/constants/constants';

const TEXTS = {
    back: 'Back',
}

export default function BackButton({ text = TEXTS.back, onClick = EMPTY_FUNCTION, goTo = EMPTY_STRING }) {
    const router = useRouter();

    const handleGoBack = () => {
        if (goTo) {
            router.push(goTo);
        } else {
            router.back();
        }

        onClick();
    }

    return (
        <Button
            variant="ghost"
            onClick={handleGoBack}
            className="flex items-center gap-1 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 pl-2 pr-4 mb-6 mt-2"
        >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-base font-medium">{text}</span>
        </Button>
    );
}

BackButton.propTypes = {
    text: string,
    goTo: string,
    onClick: func,
}

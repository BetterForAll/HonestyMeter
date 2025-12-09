/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '../ui/dialog';

const TEXTS = {
    clickForMethodology: 'Click for methodology',
}

export interface RatingProps {
    createdAt?: string;
    items?: React.ReactNode;
    title?: string;
    titleColor?: string;
    Methodology?: React.ComponentType<{ createdAt?: string }>;
}

export function Rating({ createdAt, items, title, titleColor, Methodology }: RatingProps) {
    const [isMethodologyModalShown, setIsMethodologyModalShown] = useState(false);

    const handleRatingClick = () => {
        setIsMethodologyModalShown(prevShown => !prevShown);
    }

    return (
        <>
            <Dialog open={isMethodologyModalShown} onOpenChange={setIsMethodologyModalShown}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-auto" onClick={handleRatingClick}>
                    <DialogTitle className="sr-only">{title}</DialogTitle>
                    {Methodology && <Methodology createdAt={createdAt} />}
                </DialogContent>
            </Dialog>
            <div 
                className="cursor-pointer text-xs text-center mb-4 select-none"
                onClick={handleRatingClick}
                title={TEXTS.clickForMethodology}
            >
                <p className={cn(
                    "font-bold text-base flex justify-center items-center gap-1 mb-1",
                    titleColor || "text-gray-900"
                )}>
                    {title} <Info className="w-4 h-4" />
                </p>
                <p className="text-sm text-gray-900 mb-2">
                    {items}
                </p>
            </div>
        </>
    )
}

interface RatingListProps {
    ratings: RatingProps[];
}

export function RatingList({ ratings }: RatingListProps) {
    return (
        <div>
            {ratings.map((rating) => (
                <Rating key={rating.title} {...rating} />
            ))}
        </div>
    )
}

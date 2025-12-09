import React, { useRef, ChangeEvent, KeyboardEvent, MouseEvent } from 'react'
import { Search as SearchIcon, X, LucideIcon } from 'lucide-react';
import { EMPTY_FUNCTION } from '@/utils/utils';
import { EMPTY_STRING } from '@/constants/constants';
import { cn } from '@/lib/utils';

const TEXTS = {
    search: 'Search Term',
}
const POSITION = {
    start: 'start',
    end: 'end',
} as const;

const TYPE = {
    text: 'text',
} as const;

const KEYS = {
    enter: 'Enter',
}

interface SearchProps {
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    onClick?: () => void;
    onClear?: () => void;
    label?: string;
    inputLabel?: string;
    type?: string;
    id?: string;
    position?: typeof POSITION[keyof typeof POSITION];
    variant?: string;
    value?: string;
    Icon?: LucideIcon;
    iconVisibilityToggle?: boolean;
    width?: string;
    mobileWidth?: string;
    handleLocalSearch?: () => void; // Kept from prop-types, though not used in component
    handleSearchClick?: () => void; // Kept from prop-types
    setValue?: () => void; // Kept from prop-types
}

export default function Search({
    onChange = EMPTY_FUNCTION,
    onClick = EMPTY_FUNCTION,
    onClear = EMPTY_FUNCTION,
    label = TEXTS.search,
    inputLabel = TEXTS.search,
    type = TYPE.text,
    id,
    position = POSITION.end,
    variant = 'text',
    value = EMPTY_STRING,
    Icon = SearchIcon,
    iconVisibilityToggle = false,
    width = '25ch',
    mobileWidth = '100%',
}: SearchProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const showClear = Boolean(value);

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === KEYS.enter) {
            onClick();
        }
    }

    const handleSearchClick = () => {
        onClick();
        inputRef.current?.blur();
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        inputRef.current?.blur();
    }

    return (
        <form 
            onSubmit={handleSubmit}
            className="relative w-[var(--mobile-width)] sm:w-[var(--width)]"
            style={{ 
                '--width': width, 
                '--mobile-width': mobileWidth 
            } as React.CSSProperties}
        >
            <label htmlFor={id} className="sr-only">
                {inputLabel}
            </label>
            <div className="relative flex items-center">
                <input
                    id={id}
                    type={type}
                    ref={inputRef}
                    value={value}
                    onChange={onChange}
                    onKeyDown={handleKeyDown}
                    placeholder={label}
                    className={cn(
                        "w-full h-10 px-3 pr-20 text-sm border-b border-gray-300 bg-transparent",
                        "outline-none focus:border-indigo-500 transition-colors",
                        "placeholder:text-gray-400"
                    )}
                />
                <div className="absolute right-0 flex items-center gap-1">
                    <button
                        type="button"
                        onClick={onClear}
                        className={cn(
                            "p-1 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer",
                            showClear ? "visible" : "invisible"
                        )}
                    >
                        <X className="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        onClick={handleSearchClick}
                        className={cn(
                            "p-1 text-gray-400 hover:text-indigo-600 transition-colors cursor-pointer",
                            iconVisibilityToggle && !showClear ? "invisible" : "visible"
                        )}
                    >
                        <Icon className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </form>
    )
}

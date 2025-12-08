import React, { useRef } from 'react'
import { oneOf, string, func, bool, node } from 'prop-types';
import { Search as SearchIcon, X } from 'lucide-react';
import { EMPTY_FUNCTION } from '@/utils/utils';
import { EMPTY_STRING } from '@/constants/constants';
import { cn } from '@/lib/utils';

const TEXTS = {
    search: 'Search Term',
}
const POSITION = {
    start: 'start',
    end: 'end',
}
const TYPE = {
    text: 'text',
}
const KEYS = {
    enter: 'Enter',
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
}) {
    const inputRef = useRef(null);
    const showClear = Boolean(value);

    const handleKeyDown = (event) => {
        if (event.key === KEYS.enter) {
            onClick();
        }
    }

    const handleSearchClick = () => {
        onClick();
        inputRef.current?.blur();
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        inputRef.current?.blur();
    }

    return (
        <form 
            onSubmit={handleSubmit}
            className="relative w-full sm:w-auto"
            style={{ width: typeof window !== 'undefined' && window.innerWidth < 640 ? mobileWidth : width }}
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

Search.propTypes = {
    label: string,
    inputLabel: string,
    type: string,
    id: string,
    position: oneOf([POSITION.start, POSITION.end]),
    handleLocalSearch: func,
    handleSearchClick: func,
    value: string,
    setValue: func,
    variant: string,
    Icon: func,
    iconVisibilityToggle: bool,
    onClear: func,
    width: string,
    mobileWidth: string,
}

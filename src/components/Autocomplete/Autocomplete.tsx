import React, { useRef, useState, useEffect, MouseEvent } from 'react';
import { X, ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface AutoCompleteProps {
  list?: string[];
  label?: string;
  onChange: (e: null, value: string) => void;
  value: string;
  variant?: string;
  onClearClick?: () => void;
}

export default function AutoComplete({
  list = [],
  label = "Category",
  onChange,
  value,
  variant = 'standard',
  onClearClick,
}: AutoCompleteProps) {
  const [open, setOpen] = useState(false)
  
  const handleSelect = (currentValue: string) => {
    // Find item in list that matches current value (which is lowercase from command)
    const selectedItem = list.find(item => item.toLowerCase() === currentValue.toLowerCase());
    onChange(null, selectedItem || currentValue);
    setOpen(false)
  }

  const handleClear = (e: MouseEvent<SVGElement>) => {
      e.stopPropagation();
      onClearClick && onClearClick();
  }

  return (
    <div className="w-full sm:w-56 mb-2 sm:mb-0 relative">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value || label}
            <div className="flex items-center gap-1">
                {value && (
                    <X 
                        className="ml-2 h-4 w-4 shrink-0 opacity-50 hover:opacity-100" 
                        onClick={handleClear}
                    />
                )}
                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder={`Search ${label}...`} />
            <CommandList>
                <CommandEmpty>No {label.toLowerCase()} found.</CommandEmpty>
                <CommandGroup>
                {list.map((item) => (
                    <CommandItem
                    key={item}
                    value={item}
                    onSelect={handleSelect}
                    >
                    <Check
                        className={cn(
                        "mr-2 h-4 w-4",
                        value === item ? "opacity-100" : "opacity-0"
                        )}
                    />
                    {item}
                    </CommandItem>
                ))}
                </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

import React, { useState } from 'react';
import { ChevronDown, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Manipulation } from '@/types/report';

interface ManipulationListItemProps {
  manipulation: Manipulation;
  showSuggestedChangesTitle?: boolean;
}

export default function ManipulationListItem({ manipulation }: ManipulationListItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const suggestionsCount = manipulation.suggestedChanges?.length || 0;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <Card className="mb-4 transition-shadow hover:shadow-lg">
      <CardContent className="p-4">
        {/* Manipulation Type Badge */}
        <Badge variant="secondary" className="mb-2 text-xs font-semibold uppercase tracking-wide">
          {manipulation.name}
        </Badge>

        {/* Description */}
        <p className="mb-2 text-sm leading-relaxed text-gray-900">
          {manipulation.description}
        </p>

        {/* Context Quote */}
        <div className="mb-3 rounded-r-md border-l-4 border-gray-300 bg-gray-50 px-4 py-2">
          <p className="text-sm italic text-gray-500">
            {manipulation.context}
          </p>
        </div>

        {/* Suggestions Toggle */}
        {suggestionsCount > 0 && (
          <div className="flex items-center gap-2">
            <Button
              variant={isExpanded ? "default" : "outline"}
              size="sm"
              onClick={handleToggle}
              className="gap-2"
            >
              <Lightbulb className="h-4 w-4" />
              {suggestionsCount} suggestion{suggestionsCount > 1 ? 's' : ''}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleToggle}
              className="h-8 w-8"
            >
              <ChevronDown 
                className={cn(
                  "h-4 w-4 transition-transform duration-300",
                  isExpanded && "rotate-180"
                )} 
              />
            </Button>
          </div>
        )}

        {/* Collapsible Suggestions */}
        <div
          className={cn(
            "grid transition-all duration-300 ease-in-out",
            isExpanded ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          )}
        >
          <div className="overflow-hidden">
            <div className="border-t border-dashed border-gray-200 pt-4">
              {manipulation.suggestedChanges?.map((suggestion, index) => (
                <div key={index} className="mb-2 last:mb-0">
                  <div className="rounded-r-md border-l-4 border-green-500 bg-green-50 px-4 py-2">
                    <p className="text-sm text-gray-900">
                      {suggestion}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

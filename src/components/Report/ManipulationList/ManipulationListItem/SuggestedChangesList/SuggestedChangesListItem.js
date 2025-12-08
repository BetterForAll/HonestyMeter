import React from 'react'
import { string } from 'prop-types'

export default function SuggestedChangesListItem({ suggestedChange }) {
    return (
        <div className="px-4 mb-2 min-w-[33.3%]">
            <p className="text-sm pl-2 border-l-[3px] border-indigo-600 dark:border-indigo-400">
                {suggestedChange}
            </p>
        </div>
    )
}

SuggestedChangesListItem.propTypes = {
    suggestedChange: string
}
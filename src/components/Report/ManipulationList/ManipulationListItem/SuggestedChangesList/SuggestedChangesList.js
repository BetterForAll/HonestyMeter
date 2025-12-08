import React from 'react'
import SuggestedChangesListItem from './SuggestedChangesListItem'
import { bool } from 'prop-types'
import { suggestedChangesPropType } from '@/components/Report/reportPropTypes'

const TEXTS = {
    title: 'Suggested Changes'
}

export default function SuggestedChangesList({ suggestedChanges = [], showTitle }) {
    return (
        <div className="flex flex-col w-[300px]">
            <p className="pl-6 pb-2 text-sm font-medium text-gray-700">
                {showTitle && TEXTS.title}
            </p>
            {suggestedChanges.map((suggestedChange) => (
                <SuggestedChangesListItem suggestedChange={suggestedChange} key={suggestedChange} />
            ))}
        </div>
    )
}

SuggestedChangesList.propTypes = {
    suggestedChanges: suggestedChangesPropType,
    showTitle: bool
}
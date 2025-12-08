import React from 'react';
import { Mail } from 'lucide-react';
import { EMAIL_ADDRESS } from '@/constants/constants'

export default function ContactIcon() {
    return (
        <a 
            href={`mailto:${EMAIL_ADDRESS}`}
            title={EMAIL_ADDRESS}
            className="flex justify-center items-center text-gray-500 no-underline hover:text-indigo-600 transition-colors"
        >
            <Mail className="w-5 h-5" />
        </a>
    )
}

import React from 'react';
import Head from 'next/head';
import { MethodologyPeopleRating } from '@/components/Methodology/Methodology';

const TEXT = {
    pageTitle: 'Methodology',
    pageDescription: 'Methodology',
}

function MethodologyPage() {
    return (
        <>
            <Head>
                <title>{TEXT.pageTitle}</title>
                <meta name="description" content={TEXT.pageDescription} />
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <MethodologyPeopleRating />
        </>
    );
}

export default MethodologyPage;

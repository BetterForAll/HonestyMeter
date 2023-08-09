import React, { memo } from 'react'

//Draft page, just to test the API

const PATH = 'api/saved_report';

function SavedReport({ report }) {

    return (
        <>
            <h1>{report.title + ' from DB'}</h1>
        </>
    )
}

export async function getServerSideProps(context) {
    const { req } = context;
    const reportId = context.params.reportId
    const host = req?.headers?.host
    const url = `http://${host}/${PATH}?id=${reportId}`;

    try {
        const res = await fetch(url);
        const { data: reportJson } = await res.json();
        const report = JSON.parse(reportJson);

        return { props: { report } }
    } catch (error) {
        console.log({ error })
    }
}

export default memo(SavedReport)

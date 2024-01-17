import React from 'react'

//TODO: implement 

export default function ReportId({ reportId, biasLevel }) {
    const Badge = BADGE_TYPES[biasLevel]

    return (
        <>
            <h1>Report Id: {reportId}</h1>
            <Badge />
        </>
    )
}

const Fair = () => {
    return (
        <h1>Fair</h1>
    )
}

const Medium = () => {
    return (
        <h1>Medium</h1>
    )
}

const High = () => {
    return (
        <h1>High</h1>
    )
}

const BADGE_TYPES = {
    0: Fair,
    1: Medium,
    2: High
}

export async function getServerSideProps(context) {
    const reportId = context.params.report_id
    //fetch report by id
    //const report = await fetchReportById(reportId)
    //detect badge type (bias level: 0,1,2) based on report.score
    //const badgeType = detectBadgeType(report.score)
    // add to props
    const biasLevel = 0

    return {
        props: { reportId, biasLevel },
    };
}
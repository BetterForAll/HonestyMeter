import ReportLoading from '@/components/Report/ReportLoading'
import ReportWrapper from '@/components/Report/ReportWrapper'
import React from 'react'


function ReportPage({ homePageProps = {} }) {
    const { report, closeReport } = homePageProps

    return report ?
        <ReportWrapper report={report} showArticleInput={closeReport} />
        :
        <ReportLoading />
}

export default ReportPage
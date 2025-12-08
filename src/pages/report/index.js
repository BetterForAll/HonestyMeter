import React from 'react'
import ReportLoading from '@/components/Report/ReportLoading'
import ReportWrapper from '@/components/Report/ReportWrapper'

function ReportPage({ homePageProps = {} }) {
    const { report, shareLevel, closeReport } = homePageProps

    return (
        <div className="w-full mx-auto p-4">
            {
                report ?
                    <ReportWrapper
                        report={report}
                        showArticleInput={closeReport}
                        shareLevel={shareLevel}
                    />
                    :
                    <ReportLoading />
            }
        </div>
    )
}

export default ReportPage;
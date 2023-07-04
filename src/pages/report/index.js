import React from 'react'
import theme from '@/theme';
import { Box } from '@mui/material'
import ReportLoading from '@/components/Report/ReportLoading'
import ReportWrapper from '@/components/Report/ReportWrapper'


function ReportPage({ homePageProps = {} }) {
    const { report, reportJson, shareLevel, closeReport } = homePageProps

    return (
        <Box sx={STYLES.container}>

            {
                report ?
                    <ReportWrapper
                        report={report}
                        reportJson={reportJson}
                        showArticleInput={closeReport}
                        shareLevel={shareLevel} />
                    :
                    <ReportLoading />
            }
        </Box>
    )
}

const STYLES = {
    container: {
        width: '100%',
        margin: '0 auto auto',
        padding: theme.spacing(2),
    },
}

export default ReportPage
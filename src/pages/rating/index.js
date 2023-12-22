import React from 'react';
import Head from 'next/head';
import { Typography, Box } from '@mui/material';
import theme from '@/theme';

const TEXT = {
    pageTitle: 'Methodology',
    pageDescription: `Exploratory analysis focused on identifying entities 
                      criticized or praised in media articles.`,
    methodologyHeader: 'Methodology',
    methodologyDescription: `Our application, currently in its demo phase, 
                              offers an exploratory analysis focused on identifying entities that 
                              are most frequently criticized or praised in media articles. 
                              This version uses our existing report structure and is tailored 
                              to analyze less objective content.`,
    criticizedEntitiesHeader: 'Identifying Criticized Entities',
    criticizedEntitiesDescription: `We concentrate on articles that compare two sides, 
                                     specifically selecting those with an objectivity score 
                                     below 80 to target less objective critiques. In these 
                                     articles, we look for entities that are mentioned but not 
                                     as the "Favored Side". This approach, adopted due to the 
                                     absence of a direct indicator for "Most Criticized Side" 
                                     in our current data structure, allows us to isolate entities 
                                     likely receiving criticism in subjective contexts.`,
    praisedEntitiesHeader: 'Identifying Praised Entities',
    praisedEntitiesDescription: `Our methodology for identifying praised entities is broader. 
                                  We consider articles regardless of the number of sides, again 
                                  focusing on those with an objectivity score below 80. This 
                                  enables us to capture instances where an entity is positively 
                                  highlighted or shown as the "Favored Side", reflecting 
                                  favorable media attention in less objective articles.`,
    dynamicThresholdHeader: 'Dynamic Threshold for Inclusion',
    dynamicThresholdDescription: `Entities are included in our analysis if they are mentioned 
                                   in at least 30 articles. This threshold ensures we focus on 
                                   entities with significant media presence. Importantly, as we 
                                   accumulate more articles over time, we plan to increase this 
                                   threshold. This gradual increase will enhance the reliability 
                                   of our analysis, ensuring that our insights are based on 
                                   entities with sustained and substantial media coverage.`,
    futureDevelopmentHeader: 'Future Development and Evolution',
    futureDevelopmentDescription: `The current methodology is shaped by the limitations and 
                                    capabilities of our existing data structure. We are actively 
                                    working on future iterations of the app with the goal of 
                                    refining our approach. Upcoming versions will aim to improve 
                                    the data structure, including more precise indicators for 
                                    identifying both criticized and praised entities. This evolution 
                                    will lead to more accurate and reliable entity ratings.`,
    experimentalNatureHeader: 'Experimental and Adaptable Nature',
    experimentalNatureDescription: `As an experimental demo, this app represents our initial 
                                     foray into analyzing media biases. It is a starting point in 
                                     a continuous process of learning and adapting. Our approach 
                                     will evolve as we incorporate user feedback and gain deeper 
                                     insights into media portrayals.`
};

export const Methodology = () => {
    return (
        <Box sx={STYLES.container}>
            {/* <Box sx={{
                cursor: 'pointer',
                fontSize: theme.typography.fontSize,
                textAlign: 'center',
                color: theme.palette.text.primary,
                marginBottom: 2,
            }}>
                <Typography variant='body1' sx={{ fontWeight: theme.typography.fontWeightBold, fontSize: 'inherit' }}>
                    Most Critisized
                </Typography>
                <Typography variant='body1' sx={{ fontSize: 'inherit', marginBottom: 1 }}>
                    Donald Trump, Jeniffer Lopez, Vladimir Putin
                </Typography>
                <Typography sx={{ fontWeight: theme.typography.fontWeightBold, fontSize: 'inherit' }}>
                    Most Praised
                </Typography>
                <Typography sx={{ fontSize: 'inherit' }}>
                    Elon Musk, Cristiano Ronaldo, Al Pachino
                </Typography>
            </Box> */}
            <Typography variant="h1" gutterBottom>
                {TEXT.methodologyHeader}
            </Typography>
            <Typography paragraph sx={{ color: theme.palette.text.secondary }}>
                ({`Date range: 23/08/2023-${new Date().toLocaleDateString()}`})
            </Typography>
            <Typography paragraph>
                {TEXT.methodologyDescription}
            </Typography>

            <Typography variant="h2" gutterBottom>
                {TEXT.criticizedEntitiesHeader}
            </Typography>
            <Typography paragraph>
                {TEXT.criticizedEntitiesDescription}
            </Typography>

            <Typography variant="h2" gutterBottom>
                {TEXT.praisedEntitiesHeader}
            </Typography>
            <Typography paragraph>
                {TEXT.praisedEntitiesDescription}
            </Typography>

            <Typography variant="h2" gutterBottom>
                {TEXT.dynamicThresholdHeader}
            </Typography>
            <Typography paragraph>
                {TEXT.dynamicThresholdDescription}
            </Typography>

            <Typography variant="h2" gutterBottom>
                {TEXT.futureDevelopmentHeader}
            </Typography>
            <Typography paragraph>
                {TEXT.futureDevelopmentDescription}
            </Typography>

            <Typography variant="h2" gutterBottom>
                {TEXT.experimentalNatureHeader}
            </Typography>
            <Typography paragraph>
                {TEXT.experimentalNatureDescription}
            </Typography>
        </Box>
    );
};

function MethodologyPage() {
    return (
        <>
            <Head>
                <title>{TEXT.pageTitle}</title>
                <meta name="description" content={TEXT.pageDescription} />
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Methodology />
        </>
    );
}

const STYLES = {
    container: {
        width: '100%',
        maxWidth: '80%',
        margin: '0 auto auto',
        padding: theme.spacing(2),
        backgroundColor: theme.palette.background.paper,
        maxHeight: '50%',
        overflowX: 'auto',
        // borderRadius: '8px',
        padding: theme.spacing(1),
        '& h1': {
            margin: theme.spacing(2),
            fontSize: theme.typography.fontSize * 1.5,
            fontWeight: theme.typography.fontWeightBold,
        },
        '&  h2': {
            margin: theme.spacing(2),
            fontSize: theme.typography.fontSize * 1.25,
            fontWeight: theme.typography.fontWeightBold,
        },
        '& p': {
            margin: theme.spacing(2),
        },
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
}

export default MethodologyPage;

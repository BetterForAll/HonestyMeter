import React from 'react';
import { X } from 'lucide-react';

const TEXT = {
    pageTitle: 'Methodology',
    pageDescription: `Exploratory analysis focused on identifying entities 
                      criticized or praised in media articles.`,
    methodologyPeopleHeader: 'Methodology',
    methodologySourcesHeader: 'Most Objective Sources Methodology',
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
                                  enables us to capture instances where an entity is 
                                   shown as the "Favored Side", reflecting 
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
    futureDevelopmentDescriptionSources: `The current methodology is shaped by the limitations and 
                                    capabilities of our existing data structure. We are actively 
                                    working on future iterations of the app with the goal of 
                                    refining our approach. Upcoming versions will aim to improve 
                                    the data structure, including more precise indicators for 
                                    identifying most objective sources.`,
    experimentalNatureHeader: 'Experimental and Adaptable Nature',
    experimentalNatureDescription: `As an experimental demo, this app represents our initial 
                                     foray into analyzing media biases. It is a starting point in 
                                     a continuous process of learning and adapting. Our approach 
                                     will evolve as we incorporate user feedback and gain deeper 
                                     insights into media portrayals.`,
    methodologySourcesRatingHeader: 'Methodology for Source Rating',
    methodologySourcesRatingDescription: `Our application, currently in its demo phase, offers an exploratory analysis 
                                     focused on identifying the most objective (least biased) sources, relatively speaking.`,
    includedSourcesHeader: 'Included Sources',
    includedSourcesDescription: `We include only leading sources - those ranked within the top 1,000 websites worldwide.`,
    dynamicThresholdDescriptionSources: `Sources are included in our analysis if we have analyzed at least 100 articles from each.
                                     Importantly, as we accumulate more articles over time, we plan to increase this threshold. 
                                     This gradual increase will enhance the reliability of our analysis.`,
    scoreRangeForInclusionHeader: 'Score Range for Inclusion',
    scoreRangeForInclusionDescription1: `We've observed that a maximum objectivity score of 100 often does not signify 
    high objectivity but rather the purely informative nature of the content. This category typically includes brief 
    notifications about events that have occurred or are upcoming, presented without expressing any opinion or providing 
    detailed descriptions.`,
    scoreRangeForInclusionDescription2: `Currently, 34% of our articles achieve a score of 100, while less than 2% attain a score 
    in the range of 85-95. This trend indicates that reaching a score of 100, which reflects succinct and purely 
    informative reporting, is significantly more achievable than scoring in the 85-95 range in articles that incorporate 
    opinions or controversy. Consequently, our focus is on articles with a score below 100, as these are more likely to 
    exhibit potential bias and are thus more pertinent for an objectivity evaluation.`
};

export const MethodologyPeopleRating = ({ createdAt }) => {
    return (
        <div className="w-full max-w-[90%] md:max-w-[60%] mx-auto p-4 bg-white max-h-[85%] overflow-x-auto relative">
            <X className="absolute top-2 right-2 w-6 h-6 text-gray-500 cursor-pointer" />
            <h1 className="text-2xl font-bold m-4">
                {TEXT.methodologyPeopleHeader}
            </h1>
            <p className="text-xs text-gray-500 m-4">
                {`Date range: 23/08/2023 - ${createdAt}`}
            </p>
            <p className="m-4">
                {TEXT.methodologyDescription}
            </p>

            <h2 className="text-xl font-bold m-4">
                {TEXT.criticizedEntitiesHeader}
            </h2>
            <p className="m-4">
                {TEXT.criticizedEntitiesDescription}
            </p>

            <h2 className="text-xl font-bold m-4">
                {TEXT.praisedEntitiesHeader}
            </h2>
            <p className="m-4">
                {TEXT.praisedEntitiesDescription}
            </p>

            <h2 className="text-xl font-bold m-4">
                {TEXT.dynamicThresholdHeader}
            </h2>
            <p className="m-4">
                {TEXT.dynamicThresholdDescription}
            </p>

            <h2 className="text-xl font-bold m-4">
                {TEXT.futureDevelopmentHeader}
            </h2>
            <p className="m-4">
                {TEXT.futureDevelopmentDescription}
            </p>
            <h2 className="text-xl font-bold m-4">
                {TEXT.experimentalNatureHeader}
            </h2>
            <p className="m-4">
                {TEXT.experimentalNatureDescription}
            </p>
        </div>
    );
};

export const MethodologySourcesRating = ({ createdAt }) => {
    return (
        <div className="w-full max-w-[90%] md:max-w-[60%] mx-auto p-4 bg-white max-h-[85%] overflow-x-auto relative">
            <X className="absolute top-2 right-2 w-6 h-6 text-gray-500 cursor-pointer" />
            <h1 className="text-2xl font-bold m-4">
                {TEXT.methodologyPeopleHeader}
            </h1>
            <p className="text-xs text-gray-500 m-4">
                {`Date range: 23/08/2023 - ${createdAt}`}
            </p>
            <p className="m-4">
                {TEXT.methodologySourcesRatingDescription}
            </p>

            <h2 className="text-xl font-bold m-4">
                {TEXT.includedSourcesHeader}
            </h2>
            <p className="m-4">
                {TEXT.includedSourcesDescription}
            </p>

            <h2 className="text-xl font-bold m-4">
                {TEXT.dynamicThresholdHeader}
            </h2>
            <p className="m-4">
                {TEXT.dynamicThresholdDescriptionSources}
            </p>
            <h2 className="text-xl font-bold m-4">
                {TEXT.scoreRangeForInclusionHeader}
            </h2>
            <p className="m-4">
                {TEXT.scoreRangeForInclusionDescription1}
            </p>
            <p className="m-4">
                {TEXT.scoreRangeForInclusionDescription2}
            </p>
            <h2 className="text-xl font-bold m-4">
                {TEXT.futureDevelopmentHeader}
            </h2>
            <p className="m-4">
                {TEXT.futureDevelopmentDescriptionSources}
            </p>
            <h2 className="text-xl font-bold m-4">
                {TEXT.experimentalNatureHeader}
            </h2>
            <p className="m-4">
                {TEXT.experimentalNatureDescription}
            </p>
        </div>
    );
};
import React from 'react';
import Image from 'next/image';
import flowchart from '../../public/flowchart.jpg';
import exampleReport from '../../public/example_report.png';
import Share from '@/components/Share';
import Head from 'next/head';
import { PAGE_ABSOLUTE_URL } from '@/constants/constants';

const LOGO_URL = 'https://honestymeter.com/favicon.ico';
const ARTICLE_URL = 'https://martechseries.com/predictive-ai/ai-platforms-machine-learning/honestymeter-ai-powered-pioneer-for-unbiased-media-integrity-and-transparency';
const VIDEO_URL = 'https://player.vimeo.com/video/820300228';

const TEXTS = {
  pageTitle: 'HonestyMeter (Honesty Meter)',
  title: 'HonestyMeter - A Free Open Source Framework for Bias and Manipulation Detection in Media Content',
  article: {
    quote: `"By embracing HonestyMeter, you can join the vanguard of a movement that
    champions media objectivity and transparency. The more people who adopt this tool,
    the more we can create a well-informed society where the truth prevails over bias and misinformation"`,
    readFullArticle: 'Read the full article in MTS',
    video: 'Demo video (7 seconds)',
  },
  introduction: {
    title: 'Introduction:',
    joke: `The simplest way to illustrate what HonestyMeter addresses can be demonstrated through this joke:

    Upon his arrival in Paris, a reporter asks the Pope for his opinion on the city's famous bordellos.
     Surprised by the question, the Pope responds, "Are there bordellos in Paris?" 
     The next day, the headline in the newspapers reads: "The Pope's First Question Upon Arrival in Paris: Are There Bordellos in Paris?"...
    
    Although the facts presented are 100% true, the way they are reported is 100% misleading.
    Even if the article provides full context, most readers read only headlines and will never know the details.
    `,

    problem: `In today's world, media plays a crucial role in shaping public opinion and influencing decision-making.
     However, the proliferation of fake news and media manipulations has significantly blurred the lines between fact and fiction,
     and between objective and misleading reporting. This challenge is intensified by sophisticated, yet subtle, manipulative techniques.
    Tactics such as sensationalism, framing, and selective reporting, among others, are commonly employed by media outlets. 
    These tactics can lead audiences to form distorted perceptions of reality, hindering their ability to make well-informed decisions.`,

    problemNote: `It's important to emphasize that manipulative reporting is a much more dangerous phenomenon than fake news.
     False facts can usually be easily detected, and authoritative sources conduct thorough fact-checking
      before publishing any content, as publishing false facts leads to immediate accountability.

    Consuming news from credible sources can almost fully protect people from fake news. However,
     when content is published by an authoritative source and all the facts are real, but are presented 
     using sophisticated hidden manipulation techniques, it can dramatically distort the perception of these facts.
     As demonstrated in the earlier joke, this kind of distortion can often lead the audience 
     to understand something completely opposite from the truth,
     effectively equating it to fake news. Meanwhile, the source of this distortion typically faces zero accountability!
     `,

    solution: `To address this issue, we have developed the HonestyMeter framework – a free,
     AI-powered tool designed to assess the objectivity, bias, and manipulations in media content.
     Utilizing neural networks and advanced language models, HonestyMeter meticulously analyzes various media elements 
     to identify potential manipulative tactics. It generates a comprehensive objectivity report, which includes an objectivity score,
      a list of detected manipulations, and recommendations for mitigating bias within the text.
      Wide adoption of HonestyMeter is capable of enhancing media transparency and objectivity worldwide,
       empowering authors to craft more objective content and enabling audiences to make better-informed decisions.`,
  },
  process: {
    title: 'Evaluation Process:',
    description: `The HonestyMeter framework uses a multi-step process to evaluate
     the objectivity and bias of media content:`,

    input: `Input: The user provides a link to media content, which may include text, images, audio, or video. 
    (Currently, we support only text but plan to add more modalities in future versions).`,

    analysis: `Analysis: The framework uses large language models to analyze
    the media content and identify any manipulative techniques that may be present.
    The analysis includes evaluating the tone, sentiment, and language used in the content.`,

    scoring: `Scoring: Based on the analysis, the framework provides an overall
    objectivity score for the media content on a scale of 0-100. Additionally,
    the framework scores the objectivity level for each side represented in the content.`,

    reporting: `Reporting: The framework generates a report summarizing the analysis,
    scores, and feedback provided for the media content.`,

    feedback: `Feedback: The framework provides feedback to the user on the
    manipulative techniques identified and the areas of the content that
    may be biased or lacking in objectivity and suggests possible improvements.`,

    improvment: `Improvement: The user can take the feedback provided by the framework
    and use it to improve the objectivity of the content.`,
    flowChartAlt: 'HonestyMeter Framework Flowchart',
    expampleReportAlt: 'Example HonestyMeter Report Screenshot',
  },
  exampleReport: 'Example HonestyMeter Report Screenshot:',
  aiGeneratedArticle: 'GPT-4 Generated Article Explores Imaginary Debates Between Fictional Candidates in a Hypothetical Country',
  futurePlans: {
    title: 'Future Plans:',
    supportVideoandAudio: `In our ideal future vision, we aspire to create a comprehensive media manipulations detection tool that supports images,
     video and audio content analysis, evaluating combinations of text and images in articles, 
     voice tonality in audio and video content, background images and video footage, 
     as well as body language and facial expressions in video content.
      This represents the challenging goal of creating a process that considers all possible modalities
       and analyzes how they are integrated with each other in any piece of content,
        be it an article, book, podcast, or video.`,
    connectFactChecking: 'Connect to fact checking sources.',
    compareMultipleSources: 'Compare multiple sources'
  },
  importantConsidirations: {
    title: 'Important Considerations When Using the HonestyMeter Framework:',

    p1: `When using the tool for the first time, you may be shocked by the high levels
    of subjectivity even in the content of the most well-known and authoritative mass media sources.
    It is essential to acknowledge that no one can be entirely objective, and some degree of bias is inevitable.
    Furthermore, a low objectivity score does not necessarily indicate malicious intent on the part of the mass
    media or journalists. Many instances of biased content are created unknowingly, with the best of intentions.`,

    p2: `Our goal is not to blame anyone, but to provide a valuable tool for content creators and consumers
    alike that can help improve objectivity in media content. By using the HonestyMeter framework thoughtfully
    and with an understanding of its limitations, we can take a step towards creating a more reliable and
    trustworthy source of information for all.`,
  },
  conclusion: {
    title: 'Conclusion:',
    gameChanger: `The HonestyMeter framework has the potential to be a game-changer 
    in addressing media bias and misinformation.
    It's widespread adoption could increase transparency and objectivity in mass media,
    by helping journalists and content creators to produce more objective content,
    empowering users to make informed decisions with ease and becoming an
    essential tool for anyone seeking truthful and unbiased information.`
  },
  disclosure: {
    title: 'Honest Disclosure:',
    biasedWhitePaper: `This text was evaluated by the HonestyMeter and found to be
    highly biased towards promoting mass media transparency and the use of the HonestyMeter.
    😊`
  },
  thankYou: {
    specialThanks: `Special thanks to: `,
    oneLittleCoder: {
      name: `1littlecoder`,
      link: 'https://www.youtube.com/@1littlecoder'
    },

    yoheiNakajima: {
      name: `Yohei Nakajima`,
      link: `https://github.com/yoheinakajima/babyagi`
    },
    mattWolfe: {
      name: `Matt Wolfe`,
      link: `https://www.futuretools.io/`
    },
    forTheInspiration: `for the great inspiring content that made us fall in love with AI-powered apps.
     It was this inspiration that led us to create HonestyMeter, and we're grateful for their contribution!`,
    aiResearches: `
    Our heartfelt gratitude extends to the entire community of AI researchers whose groundbreaking work has been instrumental for our project.
    Without their dedication and creativity, HonestyMeter would have demanded an investment a thousand times larger and a team a hundred times bigger.
    `,
    openAi: 'We give special recognition to ',
    openAiLinkText: 'OpenAI',
    openAiPartTwo: `
     for their exceptional advancements in generative AI,
    which have been crucial in realizing our vision. Our personal thanks go to Sam Altman, Ilya Sutskever, Greg Brockman, Elon Musk,
    and all the other talented individuals who contributed to the development of this transformative technology.
    Their visionary leadership and commitment to innovation in AI have not only made our project achievable, 
    but have also enabled thousands of other innovative projects, significantly advancing the frontiers of technological possibilities.
    `
  },
}

export default function About() {
  return (
    <>
      <Head>
        <title>{TEXTS.pageTitle}</title>
        <meta name="description" content={TEXTS.title} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href={LOGO_URL} />
        <link rel="canonical" href={PAGE_ABSOLUTE_URL.ABOUT} />
      </Head>
      <main className="max-w-[1000px] p-8 mx-auto text-gray-900 border-none">
        <h1 id="title" className="text-3xl mb-6">
          {TEXTS.title}
        </h1>
        <p className="italic text-lg text-gray-500 mb-10">
          {TEXTS.article.quote}
          &nbsp;
          <a href={ARTICLE_URL} className="no-underline text-indigo-600" target="_blank">
            {TEXTS.article.readFullArticle}
          </a>
        </p>
        <div className="relative pt-[56.25%] w-full">
          <iframe
            title="vimeo-player"
            src={VIDEO_URL}
            className="absolute top-0 left-0 w-full h-full"
          >
          </iframe>
        </div>
        
        <h2 id="introduction" className="text-2xl mt-8 mb-4">{TEXTS.introduction.title}</h2>
        <h3 className="text-xl font-bold mt-6 mb-2">Understanding HonestyMeter Through a Joke</h3>
        <p className="mb-4">
          {TEXTS.introduction.joke}
        </p>
        <h3 className="text-xl font-bold mt-6 mb-2">Truth Distortion</h3>
        <p className="mb-4">
          This anecdote underscores the type of misleading factual representation that HonestyMeter is designed to address –
          <b>true statements framed in a context that can completely distort their intended meaning</b>.
          This distortion is often achieved through sophisticated manipulation techniques such as sensationalism, framing,
          selective reporting, and many others, which can be applied either intentionally or unknowingly.
          These tactics can lead audiences to form distorted perceptions of reality, hindering their ability to make well-informed decisions.
          HonestyMeter aims to detect and clearly expose these tactics, assisting journalists in creating
          more objective content and empowering audiences to make better-informed decisions.
        </p>
        
        <h3 className="text-xl font-bold mt-6 mb-2">Why Manipulative Reporting is More Dangerous Than Fake News</h3>
        <p className="mb-4">
          {TEXTS.introduction.problemNote}
        </p>
        <h3 className="text-xl font-bold mt-6 mb-2">Introducing HonestyMeter: A Tool for Enhancing Media Objectivity and Transparency</h3>
        <p className="mb-4">
          {TEXTS.introduction.solution}
        </p>
        <h3 className="text-xl font-bold mt-6 mb-2">What Sets HonestyMeter Apart in Media Analysis?</h3>
        <ul className="pl-0 list-none">
          <li className="mb-4">
            <h4 className="font-bold">Specialized Focus on Manipulations in Factual Information Presentation</h4>
            <p>Unlike basic fact-checking and bias/sentiment analysis tools, HonestyMeter focuses on sophisticated media manipulations.
              It detects how <b> factual information is presented in misleading contexts</b>, including the use of omission, framing, misleading headlines,
              and other similar techniques, which can lead to significant distortions of reality.</p>
          </li>
          <li className="mb-4">
            <h4 className="font-bold">Free and Open Source</h4>
            <p>It offers cost-free access and its source code is publicly available, promoting transparency, wider accessibility, and community-driven enhancements.</p>
          </li>
          <li className="mb-4">
            <h4 className="font-bold">Self-Improving System</h4>
            <p>HonestyMeter harnesses both AI and user feedback, continually refining its capability to identify and analyze media manipulations.</p>
          </li>
        </ul>

        <p className="mb-4">These features establish HonestyMeter as a unique entity in media analysis, addressing complexities beyond the scope of typical media analysis tools.</p>
        <h3 id="features" className="text-xl font-bold mt-6 mb-2">Features:</h3>
        <p className="mb-4">
          Our initial release focused on a singular feature, allowing users to copy text and receive a bias report.
          Below are the newly added features we have released in the past few months:
        </p>
        <ul className="pl-0 list-none">
          <li className="mb-4"><p><b>News Integrity Feed</b> (New Release): Offers analysis of the latest news from leading sources.
            Users can search by keyword or filter by category and country.</p></li>
          <li className="mb-4"><p><b>Personal News Integrity Feed for Popular People</b> (New Release): Analyzes the latest news about famous people. Users can search by name</p></li>
          <li className="mb-4"><p><b>Ratings</b> (New Release): Features ratings for the most praised and criticized people, located on the &quot;People&quot; page,
            and ratings for the most objective sources, available on the homepage.
          </p>
          </li>
          <li className="mb-4"><p><b>Custom Content Analysis</b> (New Release - now with Link Support): Users can submit links or text to receive a comprehensive bias report.
            This feature enables analysis of content not featured on our website and allows authors to reduce bias in their original content.</p></li>
          <li className="mb-4"><p><b>Honesty Badge</b> (New Release): Users who share our vision of transparent, unbiased media can display our badge
            alongside any content they post on platforms or social networks they manage or use.
            This enhances trust and engagement with the content. Each share promotes media transparency awareness, contributing to a fairer world.
          </p>
            <p>
              There are three types of badges:
            </p>
            <ul className="pl-0 list-none mt-2">
              <li className="mb-2">
                <p>
                  General Badge - Demonstrates support for transparent, unbiased media. Can be used with any content, anywhere.
                </p>
              </li>
              <li className="mb-2">
                <p>
                  Fair Content Badge - For authors or publishers of content that has achieved a high objectivity score
                  and wish to highlight the objectivity of their content.
                </p>
              </li>
              <li className="mb-2">
                <p>
                  Medium and High Bias Badges - For publishers who wish to openly indicate the bias level in their content,
                  thereby demonstrating extreme transparency. These badges are used in conjunction with the Fair Content Badge.
                </p>
              </li>
            </ul>
          </li>
          <li className="mb-4">
            <p><b>Auto-Optimization Based on User Feedback</b> (New Release):
              This feature transforms HonetyMeter into a <b>self-optimizing system</b>,
              utilizing a blend of AI bias &apos;experts&apos; and user feedback.
              Users have the ability to click on any section of the bias report and submit their feedback.
              This feedback is then reviewed by the AI. If the feedback is accepted,
              the report is updated accordingly, and the data is utilized for training and enhancing the model,
              thereby enabling continuous improvement in the accuracy of the reports.
            </p>
          </li>
        </ul>

        <h3 id="current-state" className="text-xl font-bold mt-6 mb-2">Current State and Updates:</h3>
        <ul className="pl-0 list-none">
          <li className="mb-2"><p>Over 18,000 reports generated.</p></li>
          <li className="mb-2"><p>Hundreds of new reports added daily.</p></li>
          <li className="mb-2"><p>Extensive coverage for each of the most popular people, e.g., over 500 reports on Elon Musk, Donald Trump and Taylor Swift among others.</p></li>
          <li className="mb-2"><p>Over 140 links from multiple websites in various languages, including listings and upvotes in leading AI tool indexes.</p></li>
          <li className="mb-2"><p>Surprisingly, HonestyMeter is used in multiple languages, despite being primarily English-focused.</p></li>
          <li className="mb-2">
            <p>The current version is an experimental demo. We&apos;re developing a more sophisticated version with higher accuracy and consistency.
              Nonetheless, even in its current form, HonestyMeter often provides insights difficult for humans to detect.
            </p>
          </li>
        </ul>
        <h2 className="text-2xl mt-8 mb-4">Technical Details</h2>

        <h3 id="process" className="text-xl font-bold mt-6 mb-2">{TEXTS.process.title}</h3>
        <p className="mb-4">
          {TEXTS.process.description}
        </p>
        <ol className="list-decimal pl-6 mb-4">
          <li className="mb-2">
            <p>
              {TEXTS.process.input}
            </p>
          </li>
          <li className="mb-2">
            <p>
              {TEXTS.process.analysis}
            </p>
          </li>
          <li className="mb-2">
            <p>
              {TEXTS.process.scoring}
            </p>
          </li>
          <li className="mb-2">
            <p>
              {TEXTS.process.reporting}
            </p>
          </li>
          <li className="mb-2">
            <p>
              {TEXTS.process.feedback}
            </p>
          </li>
          <li className="mb-2">
            <p>
              {TEXTS.process.improvment}
            </p>
          </li>
        </ol>
        <div className="flex flex-col justify-center items-center">
          <Image
            src={flowchart}
            alt={TEXTS.process.flowChartAlt}
            className="w-full h-auto"
          />
        </div>
        <div className="flex flex-col justify-center items-center mt-8">
          <h2 id="example" className="text-2xl mb-4">{TEXTS.exampleReport}</h2>
          <p className="mb-2">
            ({TEXTS.aiGeneratedArticle})
          </p>
          <Image
            src={exampleReport}
            alt={TEXTS.process.expampleReportAlt}
            className="w-full h-auto"
          />
        </div>
        <div>
          <h2 id="challanges" className="text-2xl mt-8 mb-4">Technical Challenges and Solutions</h2>
          <p className="mb-4">The current version of HonestyMeter is an experimental demo.
            There is significant room for improvement in terms of the depth, accuracy, and consistency of the reports, for the following reasons:</p>
          <ul className="pl-0 list-none mb-4">
            <li className="mb-2">
              The GPT-3.5-Turbo model was used in production until the end of December 2023 to minimize costs,
              as the tool is free and self-funded. At the end of December 2023, we switched to GPT-4,
              reducing the daily report count as an experiment to prioritize quality over quantity.
            </li>
            <li className="mb-2">
              Large Language Models (LLMs) may face challenges in maintaining context in extended texts.
            </li>
            <li className="mb-2">
              In tasks that are complex and multi-stepped, LLMs tend to be less efficient, especially with lengthy inputs.
            </li>
          </ul>
          <p className="mb-4">Therefore, we are actively developing more sophisticated, multi-staged algorithms to significantly enhance the reliability and consistency of evaluations.</p>
          <p className="mb-4">Nevertheless, even in its current state, HonestyMeter frequently provides valuable insights that are challenging for humans to detect.</p>

          <p className="mb-4"><strong>To enhance the results, we are undertaking the following steps.
            which are part of ongoing research and have not yet been fully implemented in production.</strong></p>
          <ul className="pl-0 list-none mb-4">
            <li className="mb-4">We conducted in-depth research on manipulation techniques, gaining a
              comprehensive understanding of manipulation categories. We revised the list
              of manipulations and created a more concise and well-structured list that covers
              all manipulation groups without redundancy or omissions.
            </li>
            <li className="mb-4">We are moving away from our initial approach of relying on the LLM&apos;s &quot;magic&quot; with broad instructions,
              which was intended to prove the concept and showcase its potential. We are now working on providing the LLM with thorough,
              step-by-step instructions for detecting each manipulation technique.
            </li>
            <li className="mb-4">
              We broke down the evaluation process into the smallest possible tasks.
              We are currently testing distinct services for each micro-step, which involve chains of prompts,
              autonomous agents and individual models that are specifically trained
              and fine-tuned for certain tasks. This approach is anticipated to not only improve output consistency
              but also reduce the system&apos;s dependence on any single model and simplify the process of replacing
              existing models with better or more cost-effective open-source alternatives when necessary.
            </li>
            <li className="mb-4">
              We are experimenting with the most advanced Large Language Models (LLMs)
              and closely monitoring their exponential progress.
              By incorporating upcoming, newly released advanced models into our workflow,
              we expect to achieve significant enhancements in each component of our system,
              thereby leading to an overall elevation in performance.
            </li>
            <li className="mb-4">
              We have planned the release of seven versions of the app, each building upon the previous one
              and gradually incorporating more complex techniques for detecting manipulation.
              The first MVP version focuses on the most common and easily detectable manipulation techniques,
              providing a solid indication of bias levels. Every subsequent version builds upon this foundation,
              gradually adding more complex techniques for detection. The last three versions focus on the most
              advanced and complex techniques, offering the most detailed and thorough analysis of bias.
            </li>
            <li className="mb-4">
              We have added a user feedback feature. Unlike all the features listed above, this one is already released.
              User feedback is utilized to enhance our bias reports and to train our future models,
              turning our system into a continuously self-improving entity.

              <h3 className="text-xl font-bold mt-4 mb-2">Feedback-Based Optimization Loop:</h3>
              <ul className="pl-0 list-none mb-4">
                <li className="mb-2">A user who views the bias report clicks on the section that, in their opinion, should be changed.</li>
                <li className="mb-2">The user leaves feedback, explaining the suggested changes.</li>
                <li className="mb-2">The feedback is reviewed by a Large Language Model (LLM), following strict rules.
                  To make only justified changes that improve or fix inaccuracies.
                </li>
                <li className="mb-2">If the feedback is accepted:
                  <ul className="list-disc pl-6 mt-2">
                    <li>The LLM updates the original report.</li>
                    <li>The updated report is saved and used in the training dataset.</li>
                    <li>The LLM is periodically retrained using the updated dataset.Resulting in constant improvement.</li>
                  </ul>
                </li>
                <p className="mt-4 mb-2">It&apos;s important to note that even with the current simplified experimental evaluation method, focused user feedback can lead to a more efficient revision of the report by AI.
                  Presently, the task of creating the initial report is extremely challenging for LLMs, as it requires multi-step reasoning with large contexts.</p>
                <p className="mb-2">
                  However, if a user points out a very specific issue that should be reevaluated, it makes the task much easier, significantly increasing the evaluation&apos;s efficiency.
                  If, as a result of user feedback, the report is amended by the LLM, it means that the specific part highlighted by the user is now more accurate than it initially was.
                  Therefore, the revised report will be included in the training dataset.
                </p>
                <p>
                  Adhering to this approach of user feedback, LLM reevaluation, and training dataset enrichment empowers the system to autonomously enhance its capabilities,
                  even without adopting the other upgrades listed above.
                </p>
              </ul>
            </li>
          </ul>
          <h3 className="text-xl font-bold mt-6 mb-2">Accuracy, consistency, and deterministic outputs.</h3>
          <p className="mb-4">
            It&apos;s important to note that as long as the system correctly identifies the broad objective or manipulative nature of an article in most cases,
            it can provide statistically valuable insights into bias and manipulation levels, even if report accuracy and consistency are not perfect.
            This can be achieved by analyzing large volumes of content and calculating average scores from multiple iterations over the same articles.          </p>
          <p className="mb-4">For instance, by analyzing multiple articles from several sources
            and repeating the analysis of each article multiple times, we can identify
            which sources are more or less biased relative to each other.
            This approach, even with relatively low analysis accuracy, can yield statistically high confidence in the results.
          </p>
          <p className="mb-4">Consequently, the effectiveness of the system isn&apos;t a binary choice between perfect operation and complete failure.
            It involves attaining a minimum required level of performance, followed by gradual improvements towards maximum effectiveness.</p>
          <p className="mb-4">
            We are optimistic that through ongoing research and development,
            the efficiency and capabilities of HonestyMeter will steadily improve,
            gradually approaching its maximum potential. Even now, in its experimental demo phase,
            HonestyMeter frequently provides insights that are difficult for humans to discern.
          </p>
          <h3 className="text-xl font-bold mt-6 mb-2">Analysis Objectivity Verification: Overcoming LLM Biases</h3>
          <p className="mb-4">We developed a method to diminish evaluator bias, effective
            for both human and LLM evaluators, through content obfuscation.
            In our experiment, we replaced all recognizable entities in
            the content, including names, countries, political parties, and organizations.
            For instance, in place of debates between Biden and Trump,
            the obfuscated article discussed Rajish and Anil as candidates for
            chairman of a student organization in an Indian university.</p>

          <p className="mb-4">The obfuscated content is particularly challenging for LLMs to recognize.
            To ensure the LLM could not identify the content, we
            explicitly prompted the LLM, explaining the obfuscation mechanism and asking
            the model to guess the real characters of the article.</p>

          <p className="mb-4">After confirming the LLM&apos;s complete failure to recognize the actual
            characters and entities, we generated two reports using HonestyMeter: one
            about the original article and the other about the obfuscated article.</p>

          <p className="mb-4">In all cases, the results were identical, proving that an
            LLM, when explicitly instructed to conduct neutral analysis, is indeed
            capable of a high level of neutrality, compared to humans.</p>
        </div>
        <hr className="my-8 border-gray-200" />
        <h2 id="monetezation" className="text-2xl mt-8 mb-4">Monetization in Harmony with Free and Transparent Media Integrity</h2>
        <p className="mb-4">
          Our main goal is to provide free, objective analysis based on a publicly open and transparent methodology.
          Currently, we self-fund the project by investing our own time and money, while offering it completely free of charge.
          We have received reasonable feedback from some users who noted that attracting
          additional funds could significantly aid in advancing the development and creating mass adoption.
          However, attracting substantial funds for a free service, based solely on social impact,
          without monetizing it and without offering any profit potential to investors, may prove challenging.
        </p>
        <p className="mb-4">
          Therefore, we have created a list of possible monetization strategies that
          can work while fully retaining our vision of a free, open framework that
          makes the media more truthful and transparent.
          Implementing these strategies may help us in two ways:
          funding the project independently and attracting additional investments.
        </p>
        <p className="mb-4">
          This list includes innovative products with unique commercial value,
          capitalizing on our core functionality. These products are targeting
          rapidly growing multi-billion-dollar markets, where even a minuscule
          market share could yield multimillion-dollar revenues.
        </p>
        <ul className="pl-0 list-none" >
          <li className="mb-4">
            <b>Honesty Badge and Commercial Content Analysis (unique value)</b><br /><br />
            Honesty Badge Certification (currently available for free): A service that
            awards the &apos;Honesty Badge&apos; to any content that meets high standards of
            objectivity and a low level of bias and manipulation. Optionally, every piece
            of content can be marked with an Honesty Badge showing its bias level: high,
            medium, or low to demonstrate full transparency. <br /><br />
            Note: The high-end tier of this service may be provided in combination with
            human bias detectors and industry experts in niche relevant to the promoted
            content.<br /><br />
            Target Audience: Any commercial company with a product or service, news
            portals, social networks, niche content blogs, and channels.<br /><br />

            <b>Honest eCommerce</b> (in development): A content portal with highly objective
            commercial content.<br /><br />
            <b> Market Projections</b>
            <br /><br />
            The global content marketing market was valued at $407 billion in 2022 and
            is projected to reach $1.3 trillion by 2031, growing at a CAGR of 13.17%.
            (Source: <a href='https://www.businessresearchinsights.com/market-reports/content-marketing-market-103375' className="text-indigo-600" target='_blank'>Business Research Insights</a>)
            <br /><br />
            <table className="border border-gray-200 p-2 rounded-sm w-full">
              <tbody>
                <tr className="border-b border-gray-200">
                  <th className="border-r border-gray-200 p-2 text-left">Market Share</th>
                  <th className="border-r border-gray-200 p-2 text-left">2023 Revenue Projection</th>
                  <th className="p-2 text-left">2031 Revenue Projection</th>
                </tr>
                <tr>
                  <td className="border-r border-gray-200 p-2">1%</td>
                  <td className="border-r border-gray-200 p-2">$4.5 billion</td>
                  <td className="p-2">$13 billion</td>
                </tr>
                <tr>
                  <td className="border-r border-gray-200 p-2">0.1%</td>
                  <td className="border-r border-gray-200 p-2">$450 million</td>
                  <td className="p-2">$1.3 billion</td>
                </tr>
                <tr>
                  <td className="border-r border-gray-200 p-2">0.01%</td>
                  <td className="border-r border-gray-200 p-2">$45 million</td>
                  <td className="p-2">$130 million</td>
                </tr>
                <tr>
                  <td className="border-r border-gray-200 p-2">0.001%</td>
                  <td className="border-r border-gray-200 p-2">$4.5 million</td>
                  <td className="p-2">$13 million</td>
                </tr>
              </tbody>
            </table>
          </li>
          <br />
          <p className="mb-4">
            As shown in the table above, securing even 0.001% of the market, which currently amounts to $4.5 million,
            would be sufficient to sustain HonestyMeter&apos;s operations. By 2031, the market size is expected to grow,
            making 0.001% of the market worth an estimated $13 million.
          </p>
          <hr className="my-8 border-gray-200" />
          <h2 className="text-2xl mt-8 mb-4">
            Additional Monetization Options
          </h2>
          <li className="mb-4">
            <b>Ads and Affiliate Links</b><br /><br />
            <u>Ads on Website:</u> Revenue from website advertisements.<br /><br />
            <u>Affiliate Links:</u> Placement of affiliate links within bias reports linking to news websites.
            Many news websites offer premium subscriptions and other products,
            which could potentially generate referral income.
            Currently, all links are regular, and even if a user coming from our link
            purchases a service, we don&apos;t get any commission.
            It can be easily changed if we decide to use this monetization method.<br /><br />
            <u>Market Size:</u> Multimillion-dollar market with significant affiliate revenue.
          </li>
          <li className="mb-4">
            <h2 className="text-2xl mt-8 mb-4">API Services</h2>
            <p className="mb-4">
              Analysis and Data Services: Suitable for publishers, news API providers, and
              researchers.<br />
              <p className="mb-4">
                As part of operating our website, we create and save hundreds of bias reports about the latest news articles every day.
                These reports enhance the general news integrity feed on the homepage and contribute to a popular people integrity feed on the people page.
                In addition, we generate periodic ratings for the most praised and criticized individuals, as well as for the most objective sources, using an openly explained methodology.
              </p>
              <p className="mb-4">
                Recently, we realized that gathering large amounts of data, enabling complex aggregations, and data analysis opens up potential avenues for future monetization opportunities.
              </p>
              API marketplace market size: was estimated at USD 13.74 billion in 2022 and is
              expected to grow at a compound annual growth (CAGR) of 17.8% from 2023 to 2030.
              (
              Source: &nbsp;
              <a href="https://www.grandviewresearch.com/industry-analysis/api-marketplace-market-report" className="text-indigo-600" target="_blank">
                Grand View Research
              </a>
              )
            </p>

          </li>
          <br />
          <li className="mb-4">
            <b>Other services and products based on HonestyMeter core technology</b><br /><br />
            Honest News Portal: A subscription-based objective news service where the news is
            rewritten to present only neutral facts without bias or opinions.<br /><br />
            Premium Features: Custom report and advanced database search for commercial use.<br /><br />
            Additional Services: Including Email and Chat Analysis, Rewriting Service for
            Enhanced Objectivity, Video and Voice Meeting Analysis, and Chrome Extension
            as a Freemium bias analysis report generator.<br /><br />
            Market Potential: Multi-billion dollar potential in fields like digital
            marketing, journalism, academic research, corporate communications, and
            content verification.
          </li>
        </ul>
        <h2 className="text-2xl mt-8 mb-4">Monetization Strategies Summary</h2>
        <p className="mb-4">
          The brief overview of monetization options illustrates the
          feasibility of combining free bias detection and a transparent methodology
          with various monetization options that hold significant potential. This
          combination enhances both the utility and financial viability of the project.
        </p>
        <p className="mb-4">
          We want to emphasize that all potential monetization strategies listed above
          are meant to increase the chances of sustaining and expanding
          the system. Despite that, our main objective remains a FREE and OPEN framework.
          If it&apos;s possible to sustain the project and provide all services listed above completely for FREE FOREVER,
          we definitely prefer to keep it this way. If you have any ideas on how this can be achieved,
          we&apos;d be thankful for you sharing them with us.
          Your opinion is important to us. If you have any feedback on this matter, feel free to contact us and share your thoughts.
        </p>
        <hr className="my-8 border-gray-200" />
        <h2 id="future-plans" className="text-2xl mt-8 mb-4">{TEXTS.futurePlans.title}</h2>
        <p className="mb-4">
          {TEXTS.futurePlans.supportVideoandAudio}
        </p>
        <h3 id="thanks" className="text-xl font-bold mt-6 mb-2">{TEXTS.thankYou.specialThanks}</h3>
        <p className="mb-4">
          <a href={TEXTS.thankYou.oneLittleCoder.link} className="text-indigo-600" target="_blank">
            {TEXTS.thankYou.oneLittleCoder.name},&nbsp;
          </a>
          <a href={TEXTS.thankYou.yoheiNakajima.link} className="text-indigo-600" target="_blank">
            {TEXTS.thankYou.yoheiNakajima.name},&nbsp;
          </a>
          <a href={TEXTS.thankYou.mattWolfe.link} className="text-indigo-600" target="_blank">
            {TEXTS.thankYou.mattWolfe.name}&nbsp;
          </a>
          {TEXTS.thankYou.forTheInspiration}
        </p>
        <p className="mb-4">
          {TEXTS.thankYou.aiResearches}
        </p>
        <p className="mb-4">
          {TEXTS.thankYou.openAi}
          <a href="https://openai.com" className="text-indigo-600" target="_blank">{TEXTS.thankYou.openAiLinkText}</a>
          {TEXTS.thankYou.openAiPartTwo}
        </p>
        <h3 id="considerations" className="text-xl font-bold mt-6 mb-2">
          {TEXTS.importantConsidirations.title}
        </h3>
        <p className="mb-4">
          {TEXTS.importantConsidirations.p1}
        </p>
        <p className="mb-4">
          {TEXTS.importantConsidirations.p2}
        </p>
        <h2 id="conclusion" className="text-2xl mt-8 mb-4">{TEXTS.conclusion.title}</h2>
        <p className="mb-4">
          {TEXTS.conclusion.gameChanger}
        </p>
        <h2 id="join-us" className="text-2xl mt-8 mb-4">
          Join Us in Shaping the Future of Media Truth
        </h2>
        <p className="mb-4">
          Up to this day, HonestyMeter has been fully self-funded. We invest our own time and money in research, development, and maintenance.
          Though we are fully capable of progressing independently, we are open to the possibility of partnering with those
          who resonate with our vision and can offer a substantial contribution, whether it be
          enhancing visibility, funding collaborations, or offering expertise.
          <br /> <br />
          If you share our vision of truthful media and are interested in making a contribution
          that has the potential for major advancement, please feel free to reach out to us at&nbsp;
          <a href='mailto:info@honestymeter.com' className="text-indigo-600">info@honestymeter.com</a>.
          <br /> <br />
          Together, we can let the truth triumph.
        </p>
        <h3 id="disclosure" className="text-xl font-bold mt-6 mb-2">{TEXTS.disclosure.title}</h3>
        <p className="mb-4">{TEXTS.disclosure.biasedWhitePaper}</p>
        <Share />
      </main >
    </>
  )
}

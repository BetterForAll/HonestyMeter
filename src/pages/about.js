import React from 'react';
import Image from 'next/image';
import flowchart from '../../public/flowchart.jpg';
import exampleReport from '../../public/example_report.png';
import theme from '@/theme';
import { Box, Divider } from '@mui/material';
import Share from '@/components/Share';
import Head from 'next/head';
import { PAGE_ABSOLUTE_URL } from '@/constants/constants';

//TODO: replace html tags with Material UI components, optionally - divide to components, move all texts to constants
const LOGO_URL = 'https://honestymeter.com/favicon.ico';
const ARTICLE_URL = 'https://martechseries.com/predictive-ai/ai-platforms-machine-learning/honestymeter-ai-powered-pioneer-for-unbiased-media-integrity-and-transparency';
const VIDEO_URL = 'https://player.vimeo.com/video/820300228';

const TEXTS = {
  pageTitle: 'HonestyMeter (Honesty Meter)',
  title: 'HonestyMeter - A Free Framework for Bias and Manipulation Detection in Media Content',
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
    Even if the article provides full context, most readers read only headlines and will never know the truth.`,

    problem: `In today's world, media plays a crucial role in shaping public opinion and influencing decision-making es.
     However, the proliferation of fake news and misinformation has significantly blurred the lines between fact and fiction, 
     and between objective and biased reporting. This challenge is intensified by the use of sophisticated, yet subtle,
      manipulative techniques. Techniques such as sensationalism, framing, and selective reporting, among multiple others,
       are commonly employed by media outlets. These tactics can lead audiences to form distorted perceptions of reality, 
       hindering their ability to make well-informed decisions.`,

    problemNote: `It's important to emphasize that manipulative reporting is a much more dangerous phenomenon than fake news.
     False facts can usually be easily detected, and authoritative sources conduct thorough fact-checking
      before publishing any content, as publishing false facts leads to immediate accountability.

    Consuming news from credible sources can almost fully protect people from fake news. However,
     when content is published by an authoritative source and all the facts are real, but are presented 
     using sophisticated hidden manipulation techniques, it can dramatically distort the perception of these facts.
      This distortion can often lead the audience to understand the absolute opposite of the truth,
       and yet the source often faces zero accountability!    

    This terrible phenomenon gravely jeopardizes the very basis of freedom and democracy.`,

    solution: `To address this issue, we have developed the HonestyMeter framework – a free,
     AI-powered tool designed to assess the objectivity and bias of media content. 
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
  },
}

export default function About() {
  return (
    <>
      {HtmlHead}
      <main style={STYLES.container}>
        <h1 id="title" style={STYLES.title}>
          {TEXTS.title}
        </h1>
        <p style={STYLES.quote}>
          {TEXTS.article.quote}
          &nbsp;
          <a href={ARTICLE_URL} style={STYLES.articleLink} target="_blank">
            {TEXTS.article.readFullArticle}
          </a>
        </p>
        <Box style={STYLES.videoIframeContainer}>
          <iframe
            title="vimeo-player"
            src={VIDEO_URL}
            width="640"
            height="360"
            style={STYLES.videoIframe}
          >
          </iframe>
        </Box>
        <h2 id="introduction">{TEXTS.introduction.title}</h2>
        <h3>Understanding HonestyMeter Through a Joke</h3>
        <p>
          {TEXTS.introduction.joke}
        </p>
        <h3>The Challenge of Media Manipulation in Today&apos;s World</h3>
        <p>
          {TEXTS.introduction.problem}
        </p>
        <h3>Why Manipulative Reporting is More Dangerous Than Fake News</h3>
        <p>
          {TEXTS.introduction.problemNote}
        </p>
        <h3>Introducing HonestyMeter: A Tool for Enhancing Media Objectivity and Transparency</h3>
        <p>
          {TEXTS.introduction.solution}
        </p>
        <h3>What Sets HonestyMeter Apart in Media Analysis?</h3>
        <ul style={STYLES.list}>
          <li>
            <h4>Specialized Focus on Manipulations in Factual Information Presentation</h4>
            <p>Unlike basic fact-checking and bias/sentiment analysis tools, HonestyMeter focuses on sophisticated media manipulations.
              It detects how <b> factual information is presented in misleading contexts</b>, including the use of omission, framing, misleading headlines,
              and other similar techniques, <b>which can lead to significant distortions of reality.</b></p>
          </li>
          <li>
            <h4>Free and Open Source</h4>
            <p>It offers cost-free access and its source code is publicly available, promoting transparency, wider accessibility, and community-driven enhancements.</p>
          </li>
          <li>
            <h4>Self-Improving System</h4>
            <p>HonestyMeter harnesses both AI and user feedback, continually refining its capability to identify and analyze media manipulations.</p>
          </li>
        </ul>

        <p>These features establish HonestyMeter as a unique entity in media analysis, addressing complexities beyond the scope of typical media analysis tools.</p>
        <h3>Features:</h3>
        <p>
          Our initial release focused on a singular feature, allowing users to copy text and receive a bias report.
          Below are the newly added features we have released in the past few months:
        </p>
        <ul style={STYLES.list}>
          <li><p><b>News Integrity Feed</b> (New Release): Offers analysis of the latest news from leading sources.
            Users can search by keyword or filter by category and country.</p></li>
          <li><p><b>Personal News Integrity Feed for Popular People</b> (New Release): Analyzes the latest news about famous people. Users can search by name</p></li>
          <li><p><b>Ratings</b> (New Release): Features ratings for the most praised and criticized people, located on the &quot;People&quot; page,
            and ratings for the most objective sources, available on the homepage.
          </p>
          </li>
          <li><p><b>Custom Content Analysis</b> (New Release - now with Link Support): Users can submit links or text to receive a comprehensive bias report.
            This feature enables analysis of content not featured on our website and allows authors to reduce bias in their original content.</p></li>
          <li><p><b>Honesty Badge</b> (New Release): Users who share our vision of transparent, unbiased media can display our badge
            alongside any content they post on platforms or social networks they manage or use.
            This enhances trust and engagement with the content. Each share promotes media transparency awareness, contributing to a fairer world.
          </p>
            <p>
              There are three types of badges:
            </p>
            <ul style={STYLES.list}>
              <li>
                <p>
                  General Badge - Demonstrates support for transparent, unbiased media. Can be used with any content, anywhere.
                </p>
              </li>
              <li>
                <p>
                  Fair Content Badge - For authors or publishers of content that has achieved a high objectivity score
                  and wish to highlight the objectivity of their content.
                </p>
              </li>
              <li>
                <p>
                  Medium and High Bias Badges - For publishers who wish to openly indicate the bias level in their content,
                  thereby demonstrating extreme transparency. These badges are used in conjunction with the Fair Content Badge.
                </p>
              </li>
            </ul>
          </li>
          <li>
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

        <h3>Current State and Updates:</h3>
        <ul style={STYLES.list}>
          <li><p>Over 18,000 reports generated.</p></li>
          <li><p>Hundreds of new reports added daily.</p></li>
          <li><p>Extensive coverage for each of the most popular people, e.g., over 500 reports on Elon Musk, Donald Trump and Taylor Swift among others.</p></li>
          <li><p>Over 140 links from multiple websites in various languages, including listings and upvotes in leading AI tool indexes.</p></li>
          <li><p>Surprisingly, HonestyMeter is used in multiple languages, despite being primarily English-focused.</p></li>
          <li>
            <p>The current version is an experimental demo. We&apos;re developing a more sophisticated version with higher accuracy and consistency.
              Nonetheless, even in its current form, HonestyMeter often provides insights difficult for humans to detect.
            </p>
          </li>
        </ul>
        <h2>Technical Details</h2>

        <h3 id="process">{TEXTS.process.title}</h3>
        <p>
          {TEXTS.process.description}
        </p>
        <ol>
          <li>
            <p>
              {TEXTS.process.input}
            </p>
          </li>
          <li>
            <p>
              {TEXTS.process.analysis}
            </p>
          </li>
          <li>
            <p>
              {TEXTS.process.scoring}
            </p>
          </li>
          <li>
            <p>
              {TEXTS.process.reporting}
            </p>
          </li>
          <li>
            <p>
              {TEXTS.process.feedback}
            </p>
          </li>
          <li>
            <p>
              {TEXTS.process.improvment}
            </p>
          </li>
        </ol>
        <Box sx={STYLES.imageContainer}>
          <Image
            src={flowchart}
            alt={TEXTS.process.flowChartAlt}
            style={STYLES.image}
          />
        </Box>
        <Box sx={STYLES.imageContainer}>
          <h2 id="example">{TEXTS.exampleReport}</h2>
          <p>
            ({TEXTS.aiGeneratedArticle})
          </p>
          <Image
            src={exampleReport}
            alt={TEXTS.process.expampleReportAlt}
            style={STYLES.image}
          />
        </Box>
        <div>
          <h2>Technical Challenges and Solutions</h2>
          <p>The current version of HonestyMeter is an experimental demo.
            There is significant room for improvement in terms of the depth, accuracy, and consistency of the reports, for the following reasons:</p>
          <ul style={STYLES.list}>
            <li>
              The GPT-3.5-Turbo model was used in production until the end of December 2023 to minimize costs,
              as the tool is free and self-funded. At the end of December 2023, we switched to GPT-4,
              reducing the daily report count as an experiment to prioritize quality over quantity.
            </li>
            <li>
              Large Language Models (LLMs) may face challenges in maintaining context in extended texts.
            </li>
            <li>
              In tasks that are complex and multi-stepped, LLMs tend to be less efficient, especially with lengthy inputs.
            </li>
          </ul>
          <p>Therefore, we are actively developing more sophisticated, multi-staged algorithms to significantly enhance the reliability and consistency of evaluations.</p>
          <p>Nevertheless, even in its current state, HonestyMeter frequently provides valuable insights that are challenging for humans to detect.</p>

          <p><strong>To enhance the results, we are undertaking the following steps.
            which are part of ongoing research and have not yet been fully implemented in production.</strong></p>
          <ul style={STYLES.list}>
            <li>We conducted in-depth research on manipulation techniques, gaining a
              comprehensive understanding of manipulation categories. We revised the list
              of manipulations and created a more concise and well-structured list that covers
              all manipulation groups without redundancy or omissions.
            </li>
            <br></br>
            <li>We are moving away from our initial approach of relying on the LLM&apos;s &quot;magic&quot; with broad instructions,
              which was intended to prove the concept and showcase its potential. We are now working on providing the LLM with thorough,
              step-by-step instructions for detecting each manipulation technique.
            </li>
            <br></br>
            <li>
              We broke down the evaluation process into the smallest possible tasks.
              We are currently testing distinct services for each micro-step, which involve chains of prompts,
              autonomous agents and individual models that are specifically trained
              and fine-tuned for certain tasks. This approach is anticipated to not only improve output consistency
              but also reduce the system&apos;s dependence on any single model and simplify the process of replacing
              existing models with better or more cost-effective open-source alternatives when necessary.
            </li>
            <br></br>
            <li>
              We are experimenting with the most advanced Large Language Models (LLMs)
              and closely monitoring their exponential progress.
              By incorporating upcoming, newly released advanced models into our workflow,
              we expect to achieve significant enhancements in each component of our system,
              thereby leading to an overall elevation in performance.
            </li>
            <br></br>
            <li>
              We have planned the release of seven versions of the app, each building upon the previous one
              and gradually incorporating more complex techniques for detecting manipulation.
              The first MVP version focuses on the most common and easily detectable manipulation techniques,
              providing a solid indication of bias levels. Every subsequent version builds upon this foundation,
              gradually adding more complex techniques for detection. The last three versions focus on the most
              advanced and complex techniques, offering the most detailed and thorough analysis of bias.
            </li>
            <br></br>
            <li>
              We have added a user feedback feature. Unlike all the features listed above, this one is already released.
              User feedback is utilized to enhance our bias reports and to train our future models,
              turning our system into a continuously self-improving entity.

              <h3>Feedback-Based Optimization Loop:</h3>
              <ul style={STYLES.list}>
                <li>A user who views the bias report clicks on the section that, in their opinion, should be changed.</li>
                <li>The user leaves feedback, explaining the suggested changes.</li>
                <li>The feedback is reviewed by a Large Language Model (LLM), following strict rules.
                  To make only justified changes that improve or fix inaccuracies.
                </li>
                <li>If the feedback is accepted:
                  <ul>
                    <li>The LLM updates the original report.</li>
                    <li>The updated report is saved and used in the training dataset.</li>
                    <li>The LLM is periodically retrained using the updated dataset.Resulting in constant improvement.</li>
                  </ul>
                </li>
                <p>It&apos;s important to note that even with the current simplified experimental evaluation method, focused user feedback can lead to a more efficient revision of the report by AI.
                  Presently, the task of creating the initial report is extremely challenging for LLMs, as it requires multi-step reasoning with large contexts.</p>
                <p>
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
          <p><span class="bold"><b>Accuracy, consistency, and deterministic outputs.</b></span></p>
          <p>
            It&apos;s important to note that as long as the system correctly identifies the broad objective or manipulative nature of an article in most cases,
            it can provide statistically valuable insights into bias and manipulation levels, even if report accuracy and consistency are not perfect.
            This can be achieved by analyzing large volumes of content and calculating average scores from multiple iterations over the same articles.          </p>
          <p>For instance, by analyzing multiple articles from several sources
            and repeating the analysis of each article multiple times, we can identify
            which sources are more or less biased relative to each other.
            This approach, even with relatively low analysis accuracy, can yield statistically high confidence in the results.
          </p>
          <p>Consequently, the effectiveness of the system isn&apos;t a binary choice between perfect operation and complete failure.
            It involves attaining a minimum required level of performance, followed by gradual improvements towards maximum effectiveness.</p>
          <p>
            We are optimistic that through ongoing research and development,
            the efficiency and capabilities of HonestyMeter will steadily improve,
            gradually approaching its maximum potential. Even now, in its experimental demo phase,
            HonestyMeter frequently provides insights that are difficult for humans to discern.
          </p>
        </div>
        <Divider style={{ marginBottom: theme.spacing(2) }} />
        <h2>Monetization in Harmony with Free and Transparent Media Integrity</h2>
        <p>
          Our main goal is to provide free, objective analysis based on a publicly open and transparent methodology.
          Currently, we self-fund the project by investing our own time and money, while offering it completely free of charge.
          We have received reasonable feedback from some users who noted that attracting
          additional funds could significantly aid in advancing the development and creating mass adoption.
          However, attracting substantial funds for a free service, based solely on social impact,
          without monetizing it and without offering any profit potential to investors, may prove challenging.
        </p>
        <p>
          Therefore, we have created a list of possible monetization strategies that
          can work while fully retaining our vision of a free, open framework that
          makes the media more truthful and transparent.
          Implementing these strategies may help us in two ways:
          funding the project independently and attracting additional investments.
        </p>
        <p>
          This list includes innovative products with unique commercial value,
          capitalizing on our core functionality. These products are targeting
          rapidly growing multi-billion-dollar markets, where even a minuscule
          market share could yield multimillion-dollar revenues.
        </p>
        <ul style={{ paddingLeft: 0, listStyleType: 'none' }} >
          <li>
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
            (Source: <a href='https://www.businessresearchinsights.com/market-reports/content-marketing-market-103375' target='_blank'>Business Research Insights</a>)
            <br /><br />
            <table style={STYLES.table}>
              <tbody>
                <tr>
                  <th style={STYLES.tableCell}>Market Share</th>
                  <th style={STYLES.tableCell}>2023 Revenue Projection</th>
                  <th style={STYLES.tableCellLast}>2031 Revenue Projection</th>
                </tr>
                <tr>
                  <td style={STYLES.tableCell}>1%</td>
                  <td style={STYLES.tableCell}>$4.5 billion</td>
                  <td style={STYLES.tableCellLast}>$13 billion</td>
                </tr>
                <tr>
                  <td style={STYLES.tableCell}>0.1%</td>
                  <td style={STYLES.tableCell}>$450 million</td>
                  <td style={STYLES.tableCellLast}>$1.3 billion</td>
                </tr>
                <tr>
                  <td style={STYLES.tableCell}>0.01%</td>
                  <td style={STYLES.tableCell}>$45 million</td>
                  <td style={STYLES.tableCellLast}>$130 million</td>
                </tr>
                <tr>
                  <td style={STYLES.tableCell}>0.001%</td>
                  <td style={STYLES.tableCell}>$4.5 million</td>
                  <td style={STYLES.tableCellLast}>$13 million</td>
                </tr>
              </tbody>
            </table>
          </li>
          <br />
          <p>
            As shown in the table above, securing even 0.001% of the market, which currently amounts to $4.5 million,
            would be sufficient to sustain HonestyMeter&apos;s operations. By 2031, the market size is expected to grow,
            making 0.001% of the market worth an estimated $13 million.
          </p>
          <Divider style={{ marginBottom: theme.spacing(2) }} />
          <h2>
            Additional Monetization Options
          </h2>
          <li>
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
          <br /><br />
          <li>
            <h2>API Services</h2>
            <p>
              Analysis and Data Services: Suitable for publishers, news API providers, and
              researchers.<br /><br />
              API marketplace market size: was estimated at USD 13.74 billion in 2022 and is
              expected to grow at a compound annual growth (CAGR) of 17.8% from 2023 to 2030.
              (
              Source: &nbsp;
              <a href="https://www.grandviewresearch.com/industry-analysis/api-marketplace-market-report" target="_blank">
                Grand View Research
              </a>
              )
            </p>

            <h3>
              Core Project and Data Service Details
            </h3>

            <p>
              Currently, the system is divided into two main parts:
            </p>
            <p>
              1. The Core Project: This is a free tool that enables anyone to evaluate content for bias.
              It is self-funded, self-maintained, and open-source, designed to make unbiased content analysis accessible to everyone.
            </p>
            <p>
              2. Data Collection Service (Separate Private Entity): This service includes tools that scan news, create,
              and save reports to our databases using our core report creation mechanism.
              These reports enhance the general news integrity feed on the homepage and contribute to
              a popular people integrity feed on the people page. In addition, these services generate
              periodic ratings for the most praised and criticized individuals, as well as for the most
              objective sources, using openly explained methodology.
            </p>

            <p>
              Initially, we populated the database by manually using our main app, just as anyone else could.
              However, we later developed an automated service for this task that uses the same evaluation logic.
              It required purely backend logic that didn&apos;t fit into the serverless environment on which our app is currently running.
              Therefore we deployed it as a separate service.
              Recently, we realized that having a separate service capable of gathering large amounts of data,
              enabling complex aggregations and data analysis, is not only convenient for updating our website
              but also opens up potential avenues for future monetization opportunities.
            </p>
          </li>
          <br />
          <li>
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
        <h2>Monetization Strategies Summary</h2>
        <p>
          The brief overview of monetization options illustrates the
          feasibility of combining free bias detection and a transparent methodology
          with various monetization options that hold significant potential. This
          combination enhances both the utility and financial viability of the project.
        </p>
        <p>
          We want to emphasize that all potential monetization strategies listed above
          are meant to increase the chances of sustaining and expanding
          the system. Despite that, our main objective remains a FREE and OPEN framework.
          If it&apos;s possible to sustain the project and provide all services listed above completely for FREE FOREVER,
          we definitely prefer to keep it this way. If you have any ideas on how this can be achieved,
          we&apos;d be thankful for you sharing them with us.
          Your opinion is important to us. If you have any feedback on this matter, feel free to contact us and share your thoughts.
        </p>
        <Divider style={{ marginBottom: theme.spacing(2) }} />
        <h2 id="future-plans">{TEXTS.futurePlans.title}</h2>
        <p>
          {TEXTS.futurePlans.supportVideoandAudio}
        </p>
        <h3 id="thanks">{TEXTS.thankYou.specialThanks}</h3>
        <p>
          <a href={TEXTS.thankYou.oneLittleCoder.link} target="_blank">
            {TEXTS.thankYou.oneLittleCoder.name},&nbsp;
          </a>
          <a href={TEXTS.thankYou.yoheiNakajima.link} target="_blank">
            {TEXTS.thankYou.yoheiNakajima.name},&nbsp;
          </a>
          <a href={TEXTS.thankYou.mattWolfe.link} target="_blank">
            {TEXTS.thankYou.mattWolfe.name}&nbsp;
          </a>
          {TEXTS.thankYou.forTheInspiration}
        </p>
        <h3 id="considerations">
          {TEXTS.importantConsidirations.title}
        </h3>
        <p>
          {TEXTS.importantConsidirations.p1}
        </p>
        <p>
          {TEXTS.importantConsidirations.p2}
        </p>
        <h2 id="conclusion">{TEXTS.conclusion.title}</h2>
        <p>
          {TEXTS.conclusion.gameChanger}
        </p>
        <h2 id="join-us">
          Join Us in Shaping the Future of Media Truth
        </h2>
        <p>
          Up to this day, HonestyMeter has been fully self-funded. We invest our own time and money in research, development, and maintenance.
          Though we are fully capable of progressing independently, we are open to the possibility of partnering with those
          who resonate with our vision and can offer a substantial contribution, whether it be
          enhancing visibility, funding collaborations, or offering expertise.
          <br /> <br />
          If you share our vision of truthful media and are interested in making a contribution
          that has the potential for major advancement, please feel free to reach out to us at&nbsp;
          <a href='mailto:info@honestymeter.com'>info@honestymeter.com</a>.
          <br /> <br />
          Together, we can let the truth triumph.
        </p>
        <h3 id="disclosure">{TEXTS.disclosure.title}</h3>
        <p>{TEXTS.disclosure.biasedWhitePaper}</p>
        <Share />
      </main >
    </>
  )
}

const HtmlHead = (
  <Head>
    <title>{TEXTS.pageTitle}</title>
    <meta name="description" content={TEXTS.title} />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="shortcut icon" href={LOGO_URL} />
    <link rel="canonical" href={PAGE_ABSOLUTE_URL.ABOUT} />
  </Head>
)

const STYLES = {
  container: {
    maxWidth: 1000,
    padding: theme.spacing(4),
    margin: 'auto',
    color: theme.palette.text.primary,
    border: 'none',
  },
  title: {
    marginBottom: theme.spacing(3),
  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

  },
  image: {
    width: '100%',
    height: 'auto',

  },
  quote: {
    fontStyle: 'italic',
    fontSize: theme.typography.fontSize * 1.125,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(5),
  },
  articleLink: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
  },
  videoTitle: {
    color: theme.palette.text.secondary,
  },
  videoIframeContainer: {
    padding: '56.25% 0 0 0',
    position: 'relative',
  },
  videoIframe: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  },
  table: {
    border: `solid 1px ${theme.palette.divider}`,
    padding: theme.spacing(1),
    borderRadius: theme.spacing(0.5),
  },
  tableHead: {
    borderBottom: `solid 1px ${theme.palette.divider}`,
  },
  tableCell: {
    borderRight: `solid 1px ${theme.palette.divider}`,
    padding: theme.spacing(1),
    margin: 0,
  },
  tableCellLast: {
    padding: theme.spacing(1),
    margin: 0,
  },
  list: {
    paddingLeft: 0,
  }
}





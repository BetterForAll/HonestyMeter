import React from 'react';
import Image from 'next/image';
import flowchart from '../../public/flowchart.jpg';
import exampleReport from '../../public/example_report.png';
import theme from '@/theme';
import { Box } from '@mui/material';
import Share from '@/components/Share';
import Head from 'next/head';
import { PAGE_ABSOLUTE_URL } from '@/constants/constants';

//TODO: replace html tags with Material UI components, optionally - divide to components
const LOGO_URL = 'https://honestymeter.com/favicon.ico';
const ARTICLE_URL = 'https://martechseries.com/predictive-ai/ai-platforms-machine-learning/honestymeter-ai-powered-pioneer-for-unbiased-media-integrity-and-transparency';
const VIDEO_URL = 'https://player.vimeo.com/video/820300228';

const TEXTS = {
  pageTitle: 'HonestyMeter (Honesty Meter)',
  title: 'HonestyMeter - A Free Open Source Framework for Evaluating the Objectivity of Media Content',
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

    problem: `In today's world, media plays a crucial role in shaping public opinion and influencing decision-making processes.
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
    title: 'Process:',
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
    supportVideoandAudio: `In our ideal future vision, we aspire to create a comprehensive media objectivity analysis tool that supports images,
     video and audio content analysis, evaluating combinations of text and images in articles, 
     voice tonality in audio and video content, background images and video footage, 
     as well as body language and facial expressions in video content.
      This represents the challenging goal of creating a process that considers all possible modalities
       and analyzes how they are integrated with each other in any piece of content,
        be it an article, book, podcast, or video. Further, we consider to connect to fact-checking sources and compare multiple sources to ensure a robust and reliable analysis.`,
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
        <h3>Features:</h3>
        <p>
          Our initial release focused on a singular feature, allowing users to copy text and receive a bias report.
          Below are the newly added features we have released in the past few months:
        </p>
        <ul>
          <li><p><b>News Integrity Feed</b> (New Release): Offers analysis of the latest news from leading sources.
            Users can search by keyword or filter by category and country.</p></li>
          <li><p><b>Personal News Integrity Feed for Popular People</b> (New Release): Analyzes the latest news about famous people. Users can search by name</p></li>
          <li><p><b>Ratings</b> (New Release): Features ratings for the most praised and criticized people, located on the &quot;People&quot; page, and ratings for the most objective sources, available on the homepage.</p></li>
          <li><p><b>Custom Content Analysis</b> (New Release - now with Link Support): Users can submit links or text to receive a comprehensive bias report.
            This feature enables analysis of content not featured on our website and allows authors to reduce bias in their original content.</p></li>
          <li><p><b>Honesty Badge</b> (New Release): Users who share our vision of transparent, unbiased media can display our badge
            alongside any content they post on platforms or social networks they manage or use.
            This enhances trust and engagement with the content. Each share promotes media transparency awareness, contributing to a fairer world.
          </p>
            <p>
              There are three types of badges:
            </p>
            <ul>
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
        </ul>

        <h3>Current State and Updates:</h3>
        <ul>
          <li><p>Over 16,000 reports generated.</p></li>
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

        <h2 id="process">{TEXTS.process.title}</h2>
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
        <div class="content">
          <h2>Technical Challenges and Solutions</h2>
          <p>The current version of HonestyMeter is an experimental demo.
            There is significant room for improvement in terms of the depth, accuracy, and consistency of the reports, for the following reasons:</p>
          <ul>
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

          <p><strong>To enhance the results, we are undertaking the following steps,
            which are part of ongoing research and have not yet been implemented in production.</strong></p>
          <ul>
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
          </ul>
          <p><span class="bold"><b>Accuracy, consistency, and deterministic outputs.</b></span></p>
          <p>
            It&apos;s important to note that as long as the system correctly identifies the broad objective or biased nature of an article in most cases,
            it can provide statistically valuable insights into bias levels, even if report accuracy and consistency are not perfect.
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
}



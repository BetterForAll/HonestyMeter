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
const LOGO_URL = './public/favicon.ico';
const ARTICLE_URL = 'https://martechseries.com/predictive-ai/ai-platforms-machine-learning/honestymeter-ai-powered-pioneer-for-unbiased-media-integrity-and-transparency';
const VIDEO_URL = 'https://player.vimeo.com/video/820300228';

const TEXTS = {
  pageTitle: 'HonestyMeter (Honesty Meter)',
  title: 'HonestyMeter - A Free Open Source Framework for Evaluating the Objectivity and Credibility of Media Content',
  article: {
    quote: `"By embracing HonestyMeter, you can join the vanguard of a movement that
    champions media objectivity and transparency. The more people who adopt this tool,
    the more we can create a well-informed society where the truth prevails over bias and misinformation"`,
    readFullArticle: 'Read the full article in MTS',
    video: 'Demo video (7 seconds)',
  },
  introduction: {
    title: 'Introduction:',
    problem: `In today's world, the media plays a significant role in shaping public opinion
  and influencing decision-making processes. However, with the rise of fake news and
  misinformation, it has become increasingly challenging to distinguish between fact
  and fiction. The problem is compounded by the use of manipulative techniques such
  as sensationalism, framing, and selective reporting that are employed by media
  outlets to push their agendas`,

    solution: `To address this issue, we have developed the HonestyMeter framework
    - an innovative solution that enables users to evaluate the objectivity
    and bias of media content. The framework uses neural networks and large
    language models to analyze various media elements,
    including text, images, audio, and video, and identify manipulative
    techniques that may be present.`,
  },
  process: {
    title: 'Process:',
    description: `The HonestyMeter framework uses a multi-step process to evaluate
     the objectivity and bias of media content:`,

    input: `Input: The user provides a link to the media content,
    which can include text, images, audio, or video.`,

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
    supportVideoandAudio: `User
    In our ideal future vision, we aspire to create a comprehensive media objectivity analysis tool that supports images,
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
        <p>
          {TEXTS.introduction.problem}
        </p>
        <p>
          {TEXTS.introduction.solution}
        </p>
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
          <h2>Challenges and Solutions</h2>
          <p>Currently, the HonestyMeter version is just an experimental demo. The reports are not as deep, accurate,
            or consistent as we would like them to be, for several reasons:</p>
          <ul>
            <li>The GPT-3.5-Turbo model is used in production to reduce costs, since the tool is free and self funded.</li>
            <li>The LLM struggles with long texts, often becoming &quot;confused.&quot;</li>
            <li>LLMs are not sufficiently effective in handling complex, multi-step tasks, especially with lengthy texts.</li>
          </ul>
          <p><strong>To enhance the results, we are undertaking the following steps, which are part of ongoing research and have not yet been implemented in production.</strong></p>
          <ul>
            <li>We conducted in-depth research on manipulation techniques, gaining a
              comprehensive understanding of manipulation categories. We revised the list
              of manipulations and created a more concise and well-structured list that covers
              all manipulation groups without redundancy or omissions.
            </li>
            <br></br>
            <li>We are moving away from our initial approach of relying on the LLM&apos;s &quot;magic&quot; with broad instructions,
              which was intended to prove the concept and showcase its potential. We are now working on providing the LLM with thorough,
              step-by-step instructions for detecting each mnipulation technique.
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
        <h3 id="disclosure">{TEXTS.disclosure.title}</h3>
        <p>{TEXTS.disclosure.biasedWhitePaper}</p>
        <Share />
      </main>
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
    marginBottom: theme.spacing(8),
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



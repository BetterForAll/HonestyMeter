import React from 'react';
import Image from 'next/image';
import flowchart from '../../public/flowchart.jpg';
import exampleReport from '../../public/example_report.png';
import theme from '@/theme';
import Support from '@/components/Support';
import { Box } from '@mui/material';

//TODO: replace html tags with Material UI components, optionally - divide to components

const TEXTS = {
  title: 'HonestyMeter - A breakthrough open source framework for evaluating the objectivity and credibility of news articles.',
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
    language models such as GTP-3.5-TURBO to analyze various media elements,
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
  randomlyPickedArticle: 'An article was picked absolutely randomly',
  futurePlans: {
    title: 'Future Plans:',
    supportVideoandAudio: `Support links to video and audio content (evaluate text, tonality,
       images and video content objectivity).`,
    connectFactChecking: 'Connect to fact checking sources.',
    compareMultipleSources: 'Compare multiplr sources'
  },
  importantConsidirations: {
    title: 'Important Considerations When Using the HonestyMeter Framework:',

    p1: ` Prior to the release of HonestyMeter, content objectivity was never seriously evaluated.
    Therefore, when using the tool for the first time, you may be shocked by the high levels
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
    gameChanger: `The HonestyMeter framework is a game-changer in addressing media bias and misinformation.
    It will inevitably increase transparency and objectivity in mass media,
    by helping journalists and content creators to produce more objective content,
    empowering users to make informed decisions with ease and becoming an
    essential tool for anyone seeking truthful and unbiased information.`
  },
  disclosure: {
    title: 'Honest Disclosure:',
    biasedWhitePaper: `This white paper was evaluated by the HonestyMeter framework and found to be
    highly biased towards promoting mass media transparency and the use of the HonestyMeter.
    😊`
  }

}

export default function About() {
  return (
    <main style={STYLES.container}>
      <h1 id="title">
        {TEXTS.title}
      </h1>
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
          (An article was picked absolutely randomly)
        </p>
        <Image
          src={exampleReport}
          alt={TEXTS.process.expampleReportAlt}
          style={STYLES.image}
        />
      </Box>
      <h2 id="future-plans">{TEXTS.futurePlans.title}</h2>
      <ol>
        <li>
          <p>
            {TEXTS.futurePlans.supportVideoandAudio}

          </p>
        </li>
        <li>
          <p>
            {TEXTS.futurePlans.connectFactChecking}
          </p>
        </li>
        <li>
          <p>
            {TEXTS.futurePlans.compareMultipleSources}
          </p>
        </li>
      </ol>
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
      <Support />
    </main>
  )
}

const STYLES = {
  container: {
    maxWidth: 1000,
    padding: theme.spacing(4),
    margin: 'auto',
    color: theme.palette.text.primary,
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
}

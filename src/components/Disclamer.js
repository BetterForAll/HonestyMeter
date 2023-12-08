import React from "react";
import { Typography, Box } from '@mui/material';
import theme from "@/theme";

export default function Disclamer({ isShort }) {

  return (
    <Box sx={STYLES.container}>
      {/* <Title text={TEXTS.TITLE} /> */}
      <Paragrpah text={TEXTS.experimentalVersion} />
      {
        !isShort &&
        <>
          <Paragrpah text={TEXTS.noOneIsPerfect} />
          <Paragrpah text={TEXTS.somwContentIsHardToEvaluate} />
        </>
      }
    </Box>
  )
}

const STYLES = {
  container: {
    padding: theme.spacing(4),
    margin: ' 0 auto',
    maxWidth: '1000px',
    color: theme.palette.text.secondary,
  },
  title: {
    marginBottom: theme.spacing(2),
    fontSize: theme.typography.fontSize * 0.875,
    color: theme.palette.text.secondary,
  },
  paragraph: {
    marginBottom: theme.spacing(2),
  }
}

const Title = ({ text }) => {
  return <Typography variant="h5" sx={STYLES.title}>
    {text}
  </Typography>

}

const Paragrpah = ({ text }) => {
  return <Typography variant="body2" sx={STYLES.paragraph}>
    {text}
  </Typography>
}

const TEXTS = {
  TITLE: 'DISCLAMER',

  noOneIsPerfect: `
  - It is essential to acknowledge that no one can be entirely objective,
  and some degree of bias is inevitable. Furthermore,
    a low objectivity score does not necessarily indicate malicious intent
on the part of the mass media or journalists. Many instances of biased
content are created unknowingly, with the best of intentions.`,

  somwContentIsHardToEvaluate: `
  - It is important to note that certain types of content may be
  hard to evaluate for objectivity as they are based on individual or
  group beliefs and values, which every person has the right to hold.
  Please use the framework judiciously and with respect.`,

  experimentalVersion: ` - This is an EXPERIMENTAL DEMO version that is not intended to be used for any other purpose than
   to showcase the technology's potential. We are in the process of developing more sophisticated algorithms
    to significantly enhance the reliability and consistency of evaluations. Nevertheless, even in its current state,
     HonestyMeter frequently offers valuable insights that are challenging for humans to detect.`,
}


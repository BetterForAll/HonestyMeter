import React from 'react';
import Image from 'next/image';
import logo from '../../../public/logo2.png';
import theme from '@/theme';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import Badge from '../Badge/Badge';

const TEXTS = {
  imageAlt: 'Honesty Meter Logo',
}

export default function Header() {
  return (
    <Box
      components="header"
      sx={STYLES.container}
    >
      <Box sx={STYLES.imageContainer}>
        <Link href="/">
          <Image
            src={logo}
            alt={TEXTS.imageAlt}
            style={STYLES.image}
          />
        </Link>
      </Box>
      <Box sx={STYLES.subtitleContainer} >
        <Typography variant='body2' sx={STYLES.subtitle}>Media Manipulation and Bias Detection</Typography>
        <Typography variant='body2' sx={STYLES.subtitle}>Auto-Improving with AI and User Feedback</Typography>
      </Box>
    </Box >
  );
}

const STYLES = {
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: {
      xs: `4vw ${theme.spacing(3)}`,
      md: theme.spacing(4, 6, 5),
    },
  },
  imageContainer: {
    width: '100%',
    maxWidth: '536px',
    height: {
      xs: '91px',
      md: '107px',
    },
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: { xs: theme.spacing(1), sm: theme.spacing(2) },
  },
  image: {
    width: '100%',
    height: 'auto'
  },
  subtitleContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginBottom: {
      xs: theme.spacing(2),
      sm: 0,
    },
    marginTop: {
      xs: 0,
      sm: 1
    }
  },
  subtitle: {
    fontSize: theme.typography.fontSize * 0.875,
    color: theme.palette.text.secondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },

}

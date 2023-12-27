import React from 'react';
import Image from 'next/image';
import logo from '../../../public/logo.png';
import theme from '@/theme';
import { Box } from '@mui/material';
import Link from 'next/link';

const TEXTS = {
  imageAlt: 'Honesty Meter Logo',
}

export default function Header() {
  return (
    <Box
      components="header"
      sx={STYLES.container}
    >
      <Link href="/">
        <Box sx={STYLES.imageContainer}>
          <Image
            src={logo}
            alt={TEXTS.imageAlt}
            style={STYLES.image}
          />
        </Box>
      </Link>
    </Box>
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
    }
  },
  image: {
    width: '100%',
    height: 'auto'
  },
}

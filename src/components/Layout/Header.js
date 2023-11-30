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
      style={STYLES.container}
    >
      <Link href="/">
        <Box style={STYLES.imageContainer}>
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
    padding: `4vw ${theme.spacing(3)}`,
  },
  imageContainer: {
    width: '100%',
    maxWidth: '536px',
    maxHeight: '107px',
  },
  image: {
    width: '100%',
    height: 'auto'
  },
}

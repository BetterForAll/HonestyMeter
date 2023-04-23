import React, { useEffect } from 'react'
import Button from '@mui/material/Button';
import { useRouter } from 'next/router'
import theme from '@/theme';
import { Box, Typography } from '@mui/material';

const TESTS = {
  title: 'Thank you for your generous support! 🙏',
  redirectMessage: 'You\'ll be redirected to the main page',
  home: 'Home',
}


export default function Thankyou() {
  const routes = useRouter();

  const redirectToHomePage = () => {
    routes.push('/');
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      redirectToHomePage();
    }, 5000);

    return () => {
      clearTimeout(timeout);
    }
  });

  return (
    <Box style={STYLES.container}>
      <Typography>
        {TESTS.title}
      </Typography>
      <Typography>
        {TESTS.redirectMessage}
      </Typography>
      <Button
        variant="outlined"
        size="large"
        sx={STYLES.button}
        onClick={redirectToHomePage}
      >
        {TESTS.home}
      </Button>
    </Box>
  )
}

const STYLES = {
  container: {
    width: '100%',
    height: '500px',
    display: 'flex',
    gap: theme.spacing(3),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    width: '128px',
  }
}

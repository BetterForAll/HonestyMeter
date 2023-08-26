import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme from '../theme';
import createEmotionCache from '../createEmotionCache';
import Header from '@/components/Layout/Header';
import Menu from '@/components/Layout/DesktopMenu';
import { useRouter } from 'next/router';
import Divider from '@mui/material/Divider';
import { Box } from '@mui/material';
import Footer from '@/components/Layout/Footer';
import { PAGE_ROUTES, PAGE_URL_TO_INDEX_MAP } from '@/constants/constants';
import useHomePage from '@/hooks/useHomePage';
import MobileMenu from '@/components/Layout/MobileMenu';
import { Analytics } from '@vercel/analytics/react';
import { scrollToTop } from '@/utils/utils';
import GoogleTranslate from '@/components/GoogleTranslate';
import '../global.css'

const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const router = useRouter();
  const { pathname = '/' } = router || {};
  const initialPageIndex = PAGE_URL_TO_INDEX_MAP[pathname] || 0;
  const [currentPage, setCurrentPage] = useState(initialPageIndex);
  const homePageProps = useHomePage();
  const { closeReport } = homePageProps;

  useEffect(() => {
    setCurrentPage(initialPageIndex);
    if (initialPageIndex === -1) {
      setCurrentPage(null);
    }

    scrollToTop();
  }, [initialPageIndex]);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={STYLES.appContainer}>
          {/* <GoogleTranslate /> */}
          <Header />
          <Menu
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageRoutes={PAGE_ROUTES}
            closeReport={closeReport}
          />
          <MobileMenu
            setCurrentPage={setCurrentPage}
            pageRoutes={PAGE_ROUTES}
            closeReport={closeReport}
          />
          <Divider />
          <Component homePageProps={homePageProps} {...pageProps} />
          <Divider />
          <Footer setCurrentPage={setCurrentPage} closeReport={closeReport} />
        </Box>
        <Analytics />
      </ThemeProvider>
    </CacheProvider>
  );
}

const STYLES = {
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    // overflowX: 'hidden',
  },
};

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};

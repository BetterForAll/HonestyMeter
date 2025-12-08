import * as React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default function MyDocument() {
  return (
    <Html lang="en">
      <Head>
        {/* PWA primary color */}
        <meta name="theme-color" content="#1976d2" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
  };
};


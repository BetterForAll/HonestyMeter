export function isServer() {
  return typeof window === 'undefined';
}

export const getRandom = (min, max) => {
  if (max === null || max === undefined) {
    max = min;
    min = 0;
  }

  return Math.random() * (max - min) + min;
}

export const openEmail = (mailTo) => {
  window.location.href = mailTo;
}

export const generateRandomRgbaColor = () => {
  const o = Math.round,
    r = Math.random,
    s = 255;
  return `rgba(${o(r() * s)}, ${o(r() * s)}, ${o(r() * s)}, 0.5)`;
};

export const generateMatchingColor = (bgColorRgba) => {//TODO: use for showing color matching background in favoredSide chip
  const rgbValues = bgColorRgba.substring(bgColor.indexOf('(') + 1, bgColorRgba.lastIndexOf(')')).split(',').map(x => parseInt(x));
  const luminance = 0.2126 * rgbValues[0] + 0.7152 * rgbValues[1] + 0.0722 * rgbValues[2];

  return luminance > 128 ? '#000000' : '#ffffff';
}

export const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function scrollToTop() {
  if (typeof window === 'undefined') return;

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export const EMPTY_FUNCTION = () => { };



export function getBaseUrl() {
  const isServer = typeof window === 'undefined';

  const baseURL = isServer
    ? 'https://honestymeter.com'
    : window.location.origin;

  const url = new URL(baseURL).toString();

  return url;
}

export function getBaseUrlFromUrlString(urlString = '') {
  const url = new URL(urlString);

  return url.origin.replace(/(https?:\/\/)?(www.)?/, '').split('/')[0];
}

export async function copyTextToClipboard(text) {
  if ('clipboard' in navigator) {
    return await navigator.clipboard.writeText(text);
  } else {
    return document.execCommand('copy', true, text); //for IE
  }
}

export const createShareUrl = (shareLevel) => {
  const isServerSide = isServer();
  if (isServerSide) return '';

  const SHARE_LEVEL_PARAM_KEY = 'shareLevel';
  const updatedShareLevel = parseInt(shareLevel) + 1;
  const baseUrl = new URL(window.location.href);
  baseUrl.searchParams.set(SHARE_LEVEL_PARAM_KEY, updatedShareLevel);

  return baseUrl.href;
}

export function getReportShareTitle(articleTitle) {
  const BIAS_REPORT = 'Bias Report';
  const longTitle = `${articleTitle} -${BIAS_REPORT}`;
  const shortTitle = BIAS_REPORT;
  const title = articleTitle ? longTitle : shortTitle;

  return title;
}

export function getHttpProtocol(host) {
  const LOCALHOST = 'localhost';
  const HTTP = 'http';
  const HTTPS = 'https';

  return host.includes(LOCALHOST) ? HTTP : HTTPS
}

export const getSavedReportUrl = (host, reportId) => {
  const httpProtocol = getHttpProtocol(host)

  return `${httpProtocol}://${host}/report/${reportId}`
} 
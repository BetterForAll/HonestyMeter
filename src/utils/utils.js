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
  const isBrowser = typeof window !== 'undefined';

  if (!isBrowser) return;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export const EMPTY_FUNCTION = () => { };

export function isServer() {
  return typeof window === 'undefined';
}

export function getBaseUrl() {
  const baseURL = isServer()
    ? process.env.NEXT_PUBLIC_SITE_URL
    : window.location.origin;
  const url = new URL(baseURL).toString();

  return url;
}
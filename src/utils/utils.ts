import { EMPTY_STRING, SPACE } from '@/constants/constants';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export function isServer() {
  return typeof window === 'undefined';
}

export const getRandom = (min: number, max?: number | null) => {
  if (max === null || max === undefined) {
    max = min;
    min = 0;
  }

  return Math.random() * (max - min) + min;
};

export const openEmail = (mailTo: string) => {
  window.location.href = mailTo;
};

export const generateRandomRgbaColor = () => {
  const o = Math.round,
    r = Math.random,
    s = 255;
  return `rgba(${o(r() * s)}, ${o(r() * s)}, ${o(r() * s)}, 0.5)`;
};

export const generateMatchingColor = (bgColorRgba: string) => {
  //TODO: use for showing color matching background in favoredSide chip
  const rgbValues = bgColorRgba
    .substring(bgColorRgba.indexOf('(') + 1, bgColorRgba.lastIndexOf(')'))
    .split(',')
    .map((x) => parseInt(x));
  const luminance =
    0.2126 * rgbValues[0] + 0.7152 * rgbValues[1] + 0.0722 * rgbValues[2];

  return luminance > 128 ? '#000000' : '#ffffff';
};

export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function scrollToTop({ isSmooth = true } = {}) {
  if (typeof window === 'undefined') return;

  const behavior = isSmooth ? 'smooth' : 'auto';

  window.scrollTo({ top: 0, behavior });
}

export function scrollToBottom({ isSmooth = true } = {}) {
  if (typeof window === 'undefined') return;

  const behavior = isSmooth ? 'smooth' : 'auto';

  window.scrollTo({ top: document.body.scrollHeight, behavior });
}

export const EMPTY_FUNCTION = (..._args: any[]) => { };

export function getBaseUrl() {
  const isServer = typeof window === 'undefined';

  const baseURL = isServer
    ? 'https://honestymeter.com'
    : window.location.origin;

  const url = new URL(baseURL).toString();

  return url;
}

export function getBaseUrlFromUrlString(urlString = EMPTY_STRING) {
  if (!urlString) return EMPTY_STRING;

  const url = new URL(urlString);
  const removeUrlPrefixAndQueryParamsRegex = /(https?:\/\/)?(www.)?/;

  return url.origin
    .replace(removeUrlPrefixAndQueryParamsRegex, EMPTY_STRING)
    .split('/')[0];
}

export async function copyTextToClipboard(text: string) {
  if ('clipboard' in navigator) {
    return await navigator.clipboard.writeText(text);
  } else {
    // @ts-ignore
    return document.execCommand('copy', true, text); //for IE
  }
}

export function getHttpProtocol(host: string) {
  const LOCALHOST = 'localhost';
  const HTTP = 'http';
  const HTTPS = 'https';

  return host.includes(LOCALHOST) ? HTTP : HTTPS;
}

export function convertStringToPascalCase(str: string) {
  return str
    .split(SPACE)
    .map((word) => word.trim())
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(EMPTY_STRING);
}

export function checkIsTextOverflowByElementSize(el: HTMLElement | null) {
  if (!el) return false;
  return el.clientWidth < el.scrollWidth;
}

export function cutTextIfExeedsMaxCharsCount(text: string, maxCharacterCount: number) {
  if (!text) return EMPTY_STRING;

  const threeDots = '...';

  if (text.length <= maxCharacterCount) return text;

  return text.substring(0, maxCharacterCount) + threeDots;
}

export function convertUTCDateToUserTimeZone(dateString: string) {
  if (!dateString) return EMPTY_STRING;

  let date;

  const isIsoString = dateString.includes('T') && dateString.endsWith('Z');

  if (isIsoString) { //TODO: remove this if block after all dates are in ISO format
    date = new Date(dateString);
  } else {
    // Assume it's in the old custom format "23-08-30 09:06:04"
    const isoString = dateString.replace(' ', 'T') + 'Z';
    date = new Date(isoString);
  }

  // Use consistent format to avoid server/client hydration mismatch
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export function checkIsUrl(text: string) {
  const pattern =
    /^(https?:\/\/)?([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+([\/?#].*)?$/;
  return pattern.test(text);
}

export function isTextLinesOverFlow(el: HTMLElement | null) {
  if (!el) return false;
  return el.clientHeight < el.scrollHeight;
}

export const goBack = (router: AppRouterInstance) => {
  if (isServer()) return;

  const isFirstVisitedPage = window.history.length <= 2;

  if (isFirstVisitedPage) {
    router.push('/');

    return;
  }

  // router.back() is the correct way in App Router
  router.back();
};

export const capitalizeFirstLetter = (string: string) => {
  return string?.charAt(0)?.toUpperCase() + string?.slice(1);
}

export const capitalizeFirstLetterOfEachWord = (string: string) => {
  return string.split(SPACE).map(capitalizeFirstLetter).join(SPACE);
}

export function getQueryStringByAsPath(asPath: string) {
  const queryString = asPath.split('?')[1];

  if (queryString) {
    return `?${queryString}`;
  } else {
    return EMPTY_STRING;
  }
}

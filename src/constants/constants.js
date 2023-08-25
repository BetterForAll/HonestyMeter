export const BASE_URL = 'https://honestymeter.com';
export const PAGE_ABSOLUTE_URL = {
  ABOUT: `${BASE_URL}/about`,
  TERMS: `${BASE_URL}/terms`,
};
export const EMAIL_ADDRESS = 'info@honestymeter.com';
export const PAGE_LABELS_MAP = {
  home: 'Home',
  about: 'About',
  terms: 'Terms and conditions',
};
export const PAGE_LABELS = ['Home', 'People', 'About', 'Terms'];
export const PAGE_ROUTES = ['/', 'people', 'about', 'terms'];
export const PAGE_URL_TO_INDEX_MAP = {
  '/': 0,
  '/people': 1,
  '/people/[name]': 1,
  '/report/[reportId]': -1,
  '/about': 2,
  '/terms': 3,
};
export const EMPTY_STRING = '';
export const SPACE = ' ';
export const PAYPAL_DONATE_URL =
  'https://www.paypal.com/donate/?hosted_button_id=2K88Y2UF99YRU';
export const GITHUB_URL = 'https://github.com/BetterForAll/HonestyMeter';
export const WOLRD_NEWS_API_URL = 'https://worldnewsapi.com';

export const EVENT = {
  reportRequested: 'Report requested',
  reportReceived: 'Report received',
  reportParsed: 'Report parsed',
  reportError: 'Report error',
  reportCopied: 'Report copied',
  reportCopyError: 'Report copy error',
  shareApp: (platform) => `Share app on ${platform}`,
  shareReport: (platform) => `Share report on ${platform}`,
  sharedReportViewed: 'Shared report viewed',
  pageLoaded: 'Page loaded',
  peoplePageLoaded: 'People page loaded',
  personPageLoaded: (name) => 'Person page loaded',
  generateNewReportClicked: 'Generate New Report Clicked',
  cancelNewReportClicked: 'Cancel New Report Clicked',
  reportCardClicked: 'Report Card Clicked',
  viewReportClicked: 'View Report Clicked',
  closeReportClicked: 'Close Report Clicked',
  nextPageClicked: 'Next Page Clicked',
  previousPageClicked: 'Previous Page Clicked',
  skipToFirstPageClicked: 'Skip To First Page Clicked',
  articleLinkClicked: 'Article Link Clicked',
  reportViewed: 'Report Viewed',
  personClicked: 'Person Clicked',
  searchClickedPeoplePage: 'Search Clicked - People',
  searchClickedHomePage: 'Search Clicked - Home Page',

};

export const API_URL = {
  GENERATE_REPORT: './api/report',
  SAVED_REPORT: './api/saved_report',
};

export const STEPS = {
  forward: 1,
  back: -1,
};

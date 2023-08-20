export const BASE_URL = 'https://honestymeter.com'
export const PAGE_ABSOLUTE_URL = {
    ABOUT: `${BASE_URL}/about`,
    TERMS: `${BASE_URL}/terms`,
}
export const EMAIL_ADDRESS = 'info@honestymeter.com'
export const PAGE_LABELS_MAP = {
    home: 'Home',
    about: 'About',
    terms: 'Terms and conditions',
}
export const PAGE_LABELS = ['Home', 'About', 'Terms']
export const PAGE_ROUTES = ['/', 'about', 'terms']
export const PAGE_URL_TO_INDEX_MAP = {
    '/': 0,
    '/about': 1,
    '/terms': 2
}
export const EMPTY_STRING = ''
export const SPACE = ' '
export const PAYPAL_DONATE_URL = 'https://www.paypal.com/donate/?hosted_button_id=2K88Y2UF99YRU'
export const GITHUB_URL = 'https://github.com/BetterForAll/HonestyMeter'

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
}

export const API_URL = {
    GENERATE_REPORT: './api/report',
    SAVED_REPORT: './api/saved_report',
}
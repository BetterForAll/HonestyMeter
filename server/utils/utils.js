export function checkIsUrl(string) {
    try {
        new URL(string.startsWith('http') ? string : 'http://' + string);
        return true;
    } catch (e) {
        return false;
    }
}

export function formatUrl(url) {
    const frepix = 'https://'

    if (!/^https?:\/\//i.test(url)) {
        url = frepix + url;
    }

    return url;
}
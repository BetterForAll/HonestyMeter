export function isUrl(text) {
    const pattern = /^(https?:\/\/)?[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+([\/?].*)?$/;

    return pattern.test(text);
}

export function formatUrl(url) {
    const frepix = 'https://'

    if (!/^https?:\/\//i.test(url)) {
        url = frepix + url;
    }

    return url;
}
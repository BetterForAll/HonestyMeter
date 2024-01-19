export function checkIsUrl(text) {
    const pattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+([\/?#].*)?$/;
    return pattern.test(text);
}

export function formatUrl(url) {
    const frepix = 'https://'

    if (!/^https?:\/\//i.test(url)) {
        url = frepix + url;
    }

    return url;
}

export function sanitizeStrings(inputs = {}) {
    return Object.keys(inputs).reduce((acc, key) => {
        const input = inputs[key]
        if (typeof input !== 'string') {
            acc[key] = EMPTY_STRING;
        }
        acc[key] = input.replace(/\$/g, '').trim();

        return acc;
    }, {});
}
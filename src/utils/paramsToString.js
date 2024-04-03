export const paramsToString = (params) => {
    return Object.entries(params)
        .filter(([, value]) => value != null)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join('&');
};
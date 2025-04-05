class UrlHander{
    addSearchParams(key,value)
    {
        const url = new URL(window.location);
        url.searchParams.set(key,value);
        history.pushState({},'', url)
    }
}

export default new UrlHander;
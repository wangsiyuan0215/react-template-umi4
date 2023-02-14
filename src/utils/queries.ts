import qs from 'qs';
import { history } from '@umijs/max';

export const getEntireUrlWithQueries = (queries = {}) => {
    // for native hash with queries
    const { location } = window;
    const queriesHost = location.href.split('?')[1];

    // for history queries
    const { location: locationH } = history;
    const { pathname, query = {} } = locationH;
    const finalQueries = qs.stringify({ ...query, ...qs.parse(queriesHost), ...queries });

    // merge host queries, history queries and parameter queries...
    return `${location.origin}${location.pathname}#${pathname}${finalQueries ? '?' : ''}${finalQueries}`;
};

const injectQueriesIntoUrlNoRefresh = (queries, paths = []) => {
    const { location } = history;
    const { pathname } = location;

    if (paths.length && !paths.includes(pathname)) return false;

    return window.history.replaceState(null, '', getEntireUrlWithQueries(queries));
};

export default injectQueriesIntoUrlNoRefresh;

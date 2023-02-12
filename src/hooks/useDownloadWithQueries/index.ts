import React from 'react';

import { KEY_STORAGE } from '@/resources/constant';
import { downloadFileWithUrl } from '@/utils';
import { getStorageForSomething, removeStorageForSomething, WHERE } from '@/utils/storage';

const useDownloadWithQueries = () => {
    React.useEffect(() => {
        const queries = getStorageForSomething(KEY_STORAGE.DOWNLOAD, WHERE.SESSION);
        if (queries) {
            const { url, name, action } = queries;
            if (url && name && action) {
                // eslint-disable-next-line no-unused-expressions
                action === 'download' && downloadFileWithUrl(decodeURIComponent(url), decodeURIComponent(name));
                removeStorageForSomething(KEY_STORAGE.DOWNLOAD, WHERE.SESSION);
            }
        }
    }, []);
};

export default useDownloadWithQueries;

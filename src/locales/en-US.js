import { requireAllFile } from '@/utils';

/** @typedef require {{ context }} */
const enUS = requireAllFile(require.context('@/locales/en-US/', true, /\.(ts|js)$/));

export default {
    'app.logo.text': 'LOGO',
    'app.document.title': APP_NAME,

    ...enUS.reduce(
        (acc, item) => ({
            ...acc,
            ...item.default
        }),
        {}
    )
};

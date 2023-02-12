import React from 'react';
import { getDvaApp } from 'umi';

export default () => {
    React.useEffect(() => {
        global.dvaApp = global.dvaApp ?? getDvaApp();
        window.dvaApp = window.dvaApp ?? getDvaApp();
    }, []);
};

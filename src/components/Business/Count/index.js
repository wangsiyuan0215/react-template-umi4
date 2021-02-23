/*
 * @Author: SiYuan Wang
 * @Date: 2020-01-03 09:38:05
 * @Description: index
 */

import React from 'react';

export default ({ title, count }) => {
    React.useEffect(
        () => {
            console.log('Count Component rendering: ', count);
        },
        [count]
    );

    return (
        <div>
            {title}: {count}
        </div>
    );
};

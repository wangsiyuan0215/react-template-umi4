/*
 * @Author: SiYuan Wang
 * @Date: 2019-11-12 14:03:00
 * @Description: Dynamic Number
 */

import React from 'react';

export default ({ step = 13, target = 0, duration = 1000, className = null }) => {
    const timer = React.useRef(null);
    const [number, setNumber] = React.useState(0);

    React.useEffect(
        () => {
            // eslint-disable-next-line
            if (number >= target) timer.current && clearInterval(timer.current);
        },
        [number]
    );

    React.useEffect(
        () => {
            if (target === 0) return () => {};
            setNumber(0);
            const isSmallStep = target <= 100;
            timer.current = setInterval(
                () => setNumber(prev => Math.min(target, prev + (isSmallStep ? 1 : step))),
                isSmallStep ? 32 : (duration / target) * step
            );

            return () => timer.current && clearInterval(timer.current);
        },
        [target, duration, step]
    );

    return <span className={className}>{number}</span>;
};

import React from 'react';
import classNames from 'classnames';
import { Popover, PopoverProps } from 'antd';

import styles from './index.less';

const PopoverNew = React.forwardRef<unknown, PopoverProps>(
    ({ align = { offset: [0, -5] }, children, overlayClassName = '', ...restProps }, ref) => {
        return (
            <Popover
                ref={ref}
                {...restProps}
                align={align}
                overlayClassName={classNames(styles.overlay, overlayClassName)}
            >
                {children}
            </Popover>
        );
    }
);

export default PopoverNew;

/*
 * @Author: SiYuan Wang
 * @Date: 2019-11-14 16:44:06
 * @Description: home
 */
import React from 'react';

import CustomIcon from 'components/Common/CustomIcon';

import styles from './index.less';

export default () => (
    <div className={styles.container}>
        WELCOME
        <CustomIcon type="welcome" />
    </div>
);

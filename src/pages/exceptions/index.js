/*
 * @Author: SiYuan Wang
 * @Date: 2019-03-19 13:49:21
 * @Description: index
 */

import Link from 'umi/link';
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

import styles from './index.less';

const Exception = props => {
    const { backText, title, desc = [], redirect, image } = props;

    return (
        <div className={styles.exception}>
            <div className={styles.imgBlock}>
                <div className={styles.imgEle} style={{ backgroundImage: `url(${image})` }} />
            </div>
            <div className={styles.content}>
                <h1>{title}</h1>
                {desc.map((item, index) => (
                    /* eslint react/no-array-index-key: 0 */
                    <p key={`desc_item_${index}`} className={styles.desc}>
                        {item}
                    </p>
                ))}
                <div className={styles.actions}>
                    <Link to={redirect}>
                        <Button htmlType="button" type="default">
                            {backText}
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

Exception.propTypes = {
    desc: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string.isRequired,
    image: PropTypes.any.isRequired,
    backText: PropTypes.string,
    redirect: PropTypes.string
};

Exception.defaultProps = {
    desc: [],
    backText: 'back to home',
    redirect: '/'
};

export default Exception;

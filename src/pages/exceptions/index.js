/*
 * @Author: SiYuan Wang
 * @Date: 2019-03-19 13:49:21
 * @Description: index
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

import styles from './index.less';

class Exception extends React.PureComponent {
    static defaultProps = {
        backText: 'back to home',
        redirect: '/'
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { backText, title, desc, redirect, image } = this.props;
        return (
            <div className={styles.exception}>
                <div className={styles.imgBlock}>
                    <div className={styles.imgEle} style={{ backgroundImage: `url(${image})` }} />
                </div>
                <div className={styles.content}>
                    <h1>{title}</h1>
                    <div className={styles.desc}>{desc}</div>
                    <div className={styles.actions}>
                        <a to={redirect} href={redirect}>
                            <Button htmlType="button" type="primary">
                                {backText}
                            </Button>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

Exception.propTypes = {
    desc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.any.isRequired,
    backText: PropTypes.string,
    redirect: PropTypes.string
};

export default Exception;

/*
 * @Author: SiYuan Wang
 * @Date: 2019-08-12 16:04:41
 * @Description: ImagePreviewer
 */

import React from 'react';
import { Icon } from 'antd';
import classNames from 'classnames';

import Loading from '@/components/Common/Loading';
import useVisible from '@/hooks/useVisible';

import styles from './index.less';

const TYPES = {
    PDF: 'PDF',
    IMAGE: 'IMAGE'
};

// eslint-disable-next-line no-unused-vars
const ImagePreviewer = ({ /* id, */ url, title, type = ImagePreviewer.TYPES.IMAGE, children }) => {
    const innerRef = React.useRef(null);
    const [width, setWidth] = React.useState(0);
    const [source, setSource] = React.useState(null);
    const [center, setCenter] = React.useState(true);
    const [loading, setLoading] = React.useState(true);

    const onClose = () => {
        setLoading(true);
        setCenter(false);
        /* eslint no-use-before-define: 0 */
        setVisible(false);
    };

    /* eslint consistent-return: 0 */
    const keyPressHandler = event => {
        if (event.key.toLocaleUpperCase() === 'ESCAPE') return onClose();
    };

    const [visible, setVisible] = useVisible(
        false,
        () => {
            let img = null;
            img = new Image();
            img.onload = function onload() {
                const wrapperWidth = innerRef.current && innerRef.current.clientWidth;
                const wrapperHeight = innerRef.current && innerRef.current.clientHeight;

                const imageWidth = Math.min(wrapperWidth * 0.8, this.naturalWidth);
                const imageHeight = (imageWidth / this.naturalWidth) * this.naturalHeight;

                setWidth(imageWidth);
                setCenter(imageHeight < wrapperHeight);
                setSource(url);
                setLoading(false);
            };
            img.src = url;

            window.addEventListener('keyup', keyPressHandler);

            return () => {
                img.onload = null;
                img = null;
                window.removeEventListener('keyup', keyPressHandler);
            };
        },
        [url]
    );

    const renderInnerContent = () => (
        <img
            alt=""
            src={source}
            style={{ width }}
            className={source && visible ? styles.active : null}
        />
    );

    const renderPreviewer = () => (
        // if (!visible) return null;
        <div
            className={classNames(
                styles.preview__container,
                (visible && styles['preview__container--active']) || null
            )}
        >
            <header className={styles.header}>
                <Icon type="picture" className={styles.icon__header} />
                {title ? <span>{title}</span> : null}
                <div className={styles.operations}>
                    <Icon type="close" onClick={onClose} className={styles.icon__header} />
                </div>
            </header>
            <div
                ref={innerRef}
                className={classNames(styles.inner, center && styles['inner--center'])}
            >
                {renderInnerContent()}
                {loading ? <Loading /> : null}
            </div>
        </div>
    );
    /* eslint no-nested-ternary: 0 */
    return (
        <React.Fragment>
            {renderPreviewer()}
            {React.cloneElement(children, {
                ...children.props,
                onClick() {
                    setVisible(true);
                    /* eslint no-unused-expressions: 0 */
                    children.props.onClick && children.props.onClick();
                }
            })}
        </React.Fragment>
    );
};

ImagePreviewer.TYPES = TYPES;

export default ImagePreviewer;

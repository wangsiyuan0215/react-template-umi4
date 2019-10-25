/*
 * @Author: SiYuan Wang
 * @Date: 2019-03-21 10:44:29
 * @Description: Uploader.Logo
 */
import React from 'react';
import { Icon } from 'antd';

import styles from './index.less';
import upLoader from '@/assets/logo-placeholder-company.jpg';

import { LoadingWrapper } from '@/components/Loading';

const LogoUploader = (props, ref) => {
    const {
        url,
        loading,
        onChange,
        onDelete = () => {}
    } = props;
    const imgRef = React.useRef();
    const uploadInputRef = React.useRef(ref);
    const [loadingForLocale, setLoadingForLocale] = React.useState(true);

    /* eslint no-return-assign: ["off"] */
    React.useEffect(() => {
        setLoadingForLocale(true);
        imgRef.current.src = url || upLoader;
        imgRef.current.onload = () => setLoadingForLocale(false);
        return () => imgRef.current.onload = null;
    }, [url, imgRef]);

    const triggerUpdateBtn = () => {
        /* eslint no-unused-expressions: ["off"] */
        uploadInputRef.current && uploadInputRef.current.click();
    };

    const uploadInputChange = event => {
        if (onChange) {
            onChange(event);
            setLoadingForLocale(true);
        }
    };

    return (
        <div className={styles.logoUploadContainer}>
            <input
                ref={uploadInputRef}
                type="file"
                onChange={uploadInputChange}
                className={styles.logoUploadInput}
            />
            <LoadingWrapper
                spinning={loading || loadingForLocale}
                wrapperClassName={styles.logoUploadLoading}
            >
                <button
                    className={styles.logoUploadBtn}
                    type="button"
                    onClick={triggerUpdateBtn}
                >
                    <img
                        ref={imgRef}
                        src={upLoader}
                        alt="upload-company-logo"
                    />
                </button>
                {
                    !url ? null : (
                        <div onClick={onDelete} className={styles.deleteWrapper}>
                            <Icon type="delete" className={styles.icon__delete} />
                        </div>
                    )
                }
            </LoadingWrapper>
        </div>
    );
};

export default React.forwardRef(LogoUploader);

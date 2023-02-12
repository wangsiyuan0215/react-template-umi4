import React from 'react';
import { Upload } from 'antd';

import { HostSvg } from '@/components/CustomIcon';
import { getBase64 } from '@/utils';
import { LoadingWrapper } from '@/components/Loading';

import styles from '../index.less';

const { Dragger } = Upload;

const CustomUploadImage = ({ value, onChange, ...restProps }) => {
    const $image = React.useRef<HTMLImageElement>(null);
    const [image, setImage] = React.useState<string>('');
    const [loading, setLoading] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (Object.prototype.toString.call(value) === '[object File]')
            getBase64(value, (imageUrl) => {
                setImage(imageUrl);
                setLoading(false);
            });
        else if (typeof value === 'string') {
            setLoading(true);

            $image.current = new Image();
            $image.current.src = value;
            $image.current.onload = () => {
                setLoading(false);
                setImage(value);
            };
            $image.current.onerror = () => {
                setLoading(false);
            };
        }

        return () => {
            $image.current = null;
        };
    }, [value]);

    const onFileChange = ({ file }) => {
        setLoading(true);
        // eslint-disable-next-line no-unused-expressions
        typeof onChange === 'function' && onChange(file.originFileObj);
    };
    const uploadProps = {
        beforeUpload: () => false,
        showUploadList: false
    };

    const uploader = (
        <React.Fragment>
            <p>
                <HostSvg name="upload-2" />
                Drag and drop your image here
            </p>
            <p>or</p>
            <button type="button">Browse An Image</button>
        </React.Fragment>
    );

    return (
        <div className={styles.upload}>
            <LoadingWrapper spinning={loading}>
                <Dragger {...restProps} {...uploadProps} onChange={onFileChange} className={styles.dragger}>
                    <div className={styles.container}>
                        {image ? <img src={image} alt="avatar" style={{ width: '100%' }} /> : uploader}
                    </div>
                </Dragger>
            </LoadingWrapper>
        </div>
    );
};

export default CustomUploadImage;

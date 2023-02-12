import React from 'react';
import { Upload } from 'antd';

import { HostSvg } from '@/components/CustomIcon';
import { LoadingWrapper } from '@/components/Loading';

import styles from './index.less';

const { Dragger } = Upload;

const CustomUpload = ({ value, loading = false, onChange, onRemove, ...restProps }) => {
    const [files, setFiles] = React.useState<any>([]);

    React.useEffect(() => {
        if (value) setFiles(value);
    }, [value]);

    const onFileChange = () => {
        // eslint-disable-next-line no-unused-expressions
        typeof onChange === 'function' && onChange(files);
    };
    const uploadProps = {
        onRemove: (file) => {
            setFiles((prev) => {
                if (Object.prototype.toString.call(file) === '[object File]')
                    return prev.filter((item) => item !== file);
                return prev.filter((item) => item.id !== file.id);
            });
            // eslint-disable-next-line no-unused-expressions
            typeof onRemove === 'function' && onRemove(file);
        },
        beforeUpload: (file, fileList) => {
            setFiles([...files, ...fileList]);
            return false;
        },
        showUploadList: {
            removeIcon: <HostSvg className={styles.file_remove} name="close2" />,
            showRemoveIcon: true,
            showDownloadIcon: false
        }
    };
    return (
        <div className={styles.upload}>
            <LoadingWrapper spinning={loading}>
                <Dragger
                    {...restProps}
                    {...uploadProps}
                    onChange={onFileChange}
                    className={styles.dragger}
                    defaultFileList={value}
                >
                    <div className={styles.container}>
                        <p>
                            <HostSvg name="upload-2" />
                            Drag and drop your file here
                        </p>
                        <p>or</p>
                        <button type="button">Browse Files</button>
                    </div>
                </Dragger>
            </LoadingWrapper>
        </div>
    );
};

export default CustomUpload;

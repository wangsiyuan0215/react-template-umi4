/*
 * @Author: SiYuan Wang
 * @Date: 2019-03-19 13:41:04
 * @Description: 403
 */
import React from 'react';
import image404 from '@/assets/404.svg';
import Exception from '@/pages/exceptions';
import { formatMessage } from 'umi-plugin-react/locale';

export default () => (
    <Exception
        desc={[
            formatMessage({ id: 'app.exception.description.404.1' }),
            formatMessage({ id: 'app.exception.description.404.2' })
        ]}
        image={image404}
        title="404"
        backText={formatMessage({ id: 'app.exception.back' })}
    />
);

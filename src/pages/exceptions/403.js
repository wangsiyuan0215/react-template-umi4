/*
 * @Author: SiYuan Wang
 * @Date: 2019-03-19 13:41:04
 * @Description: 403
 */
import React from 'react';
import image403 from '@/assets/403.svg';
import Exception from '@/pages/exceptions';
import { formatMessage } from 'umi-plugin-react/locale';

export default () => (
    <Exception
        desc={formatMessage({ id: 'app.exception.description.403' })}
        image={image403}
        title="403"
        backText={formatMessage({ id: 'app.exception.back' })}
    />
);

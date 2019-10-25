/*
 * @Author: SiYuan Wang
 * @Date: 2019-06-29 20:00:44
 * @Description: Color Picker
 */

import React from 'react';
import classNames from 'classnames';
import { GithubPicker } from 'react-color';
import { formatMessage } from 'umi-plugin-react/locale';
import { Input, Popover, Tooltip } from 'antd';

import styles from './index.less';

const ColorPicker = ({ defaultValue, onChange }) => {
    /* eslint no-unused-expressions: ["off"] */
    const timer4change = React.useRef(null);
    const [color, setColor] = React.useState(defaultValue);
    const [error, setError] = React.useState(false);

    const changeColor4pickerIn = value => {
        setColor(value.hex.slice(1).toUpperCase());
        onChange && onChange(value.hex.slice(1).toUpperCase());
    };
    const changeColor4textIn = ({ target }) => {
        setError(false);
        setColor(target.value);
        timer4change.current && clearTimeout(timer4change.current);
        timer4change.current = setTimeout(() => {
            onChange && onChange(target.value);
        }, 300);
    };
    const blurColor = ({ target }) => {
        const { value } = target || {};
        setColor(value);
        setError(!/^([0-9a-fA-F]{3})+$/.test(value));
    };

    return (
        <React.Fragment>
            <Popover
                content={<GithubPicker color={`#${color}`} onChange={changeColor4pickerIn} />}
                trigger="click"
            >
                <button
                    type="button"
                    className={styles.colorBtn}
                    style={{ backgroundColor: `#${color}` }}
                />
            </Popover>
            #
            <Tooltip
                visible={error}
                placement="right"
                title={formatMessage({ id: 'company.step2.textColors.error' })}
            >
                <Input
                    type="text"
                    value={color}
                    defaultValue={color}
                    onChange={changeColor4textIn}
                    onBlur={blurColor}
                    className={classNames(styles.colorInput, error ? styles.colorInputError : '')}
                />
            </Tooltip>
        </React.Fragment>
    );
};

export default ColorPicker;

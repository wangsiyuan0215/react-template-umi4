/*
 * @Author: SiYuan Wang
 * @Date: 2019-03-29 13:51:18
 * @Description: search component
 */
import React from 'react';
import classNames from 'classnames';
import { formatMessage } from 'umi-plugin-react/locale';
import { Col, Row, Button, Form } from 'antd';

import styles from './index.less';

const SearchComponent = props => {
    const { form, items, onSearch, onReset } = props;
    const { getFieldDecorator } = form;

    /* eslint no-unused-expressions: ["off"] */
    const handleSearch = e => {
        e.preventDefault();
        form.validateFields((err, values) => {
            onSearch && onSearch(values);
        });
    };

    const handleReset = () => {
        form.resetFields();
        onReset && onReset();
    };

    return (
        <Form
            className={classNames('ant-advanced-search-form', styles.searchContainer)}
            onSubmit={handleSearch}
        >
            <Row>
                {items
                    .filter(item => item.id || item.creator)
                    .map(item => (
                        /**
                         * @param item {{
                         *     id: string,
                         *     label: string,
                         *     options: {},
                         *     creator: ReactElement
                         * }}
                         */
                        <Form.Item
                            key={item.id}
                            label={item.label}
                        >
                            {getFieldDecorator(item.id, { ...(item.options || {}) })(item.creator)}
                        </Form.Item>
                    ))}
                <Col className={styles.btnsContainer} style={{ textAlign: 'right' }}>
                    <Button type="primary" shape="round" htmlType="submit">
                        {formatMessage({ id: 'search.button.search' })}
                    </Button>
                    <Button
                        style={{ marginLeft: 8 }}
                        shape="round"
                        onClick={handleReset}
                        htmlType="button"
                    >
                        {formatMessage({ id: 'search.button.reset' })}
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default Form.create({ name: 'search' })(SearchComponent);

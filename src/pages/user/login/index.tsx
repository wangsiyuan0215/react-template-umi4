/*
 * @Author: SiYuan Wang
 * @Date: 2019-12-11 16:30:19
 * @Description: login
 */

import React from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import { FormComponentProps } from 'antd/es/form';
import { Button, Icon, Input } from 'antd';

import Footer from '@/components/Common/Footer';
import PureLayout from '@/layouts/Pure';
import FormHelper, { IFormHelper } from '@/components/Helpers/Form';
import LoginHOF, { IDispatch2Props, IState2Props } from '@/connects/pages/user/Login';

const styles = require('./index.less');
const logoImg = require('@/assets/logo@2x.png');
const loginImg = require('@/assets/login.png');

interface LoginProps {
    username: string;
    password: string;
}

interface FormHelper4login extends FormComponentProps, LoginProps {}

const Login: React.FC<IState2Props & IDispatch2Props & IFormHelper<LoginProps>> = ({
    form,
    loading,
    login,
    renderForm
}) => {
    const { validateFieldsAndScroll } = form;
    const onSubmit = () =>
        validateFieldsAndScroll((error, { username, password }) => {
            if (error) return false;

            return login && login(username, password);
        });

    return (
        <PureLayout
            title={formatMessage({ id: 'user.login.title' })}
            wrapperClassName={styles.container}
        >
            <section className={styles.wrapper}>
                <div className={styles.logo__container}>
                    <img src={loginImg} alt="" />
                </div>
                <div className={styles.interaction__container}>
                    <h1>
                        <img src={logoImg} alt="" />
                        {formatMessage({ id: 'user.login.header' })}
                    </h1>
                    {renderForm({
                        creatorActions: {
                            username: {
                                onPress: onSubmit
                            },
                            password: {
                                onPress: onSubmit
                            }
                        }
                    })}
                    <Button loading={loading} onClick={onSubmit} className={styles.btn__login}>
                        {formatMessage({ id: 'user.login.btn' })}
                    </Button>
                </div>
            </section>
            <section className={styles.footer__container}>
                <Footer color="rgba(255, 255, 255, .45)" />
            </section>
        </PureLayout>
    );
};

export default FormHelper<FormHelper4login>({
    name: 'login.form',
    formItems: [
        {
            key: 'username',
            option: {
                rules: [
                    {
                        required: true,
                        message: formatMessage({ id: 'user.login.input.username.empty' })
                    }
                ]
            },
            creator: (_, { onPress }) => (
                <Input
                    prefix={<Icon type="user" className={styles.icon__input} />}
                    className={styles.input}
                    onPressEnter={onPress}
                    placeholder={formatMessage({ id: 'user.login.input.username.placeholder' })}
                />
            )
        },
        {
            key: 'password',
            option: {
                rules: [
                    {
                        required: true,
                        message: formatMessage({ id: 'user.login.input.password.empty' })
                    }
                ]
            },
            creator: (_, { onPress }) => (
                <Input
                    type="password"
                    prefix={<Icon type="lock" className={styles.icon__input} />}
                    className={styles.input}
                    onPressEnter={onPress}
                    placeholder={formatMessage({ id: 'user.login.input.password.placeholder' })}
                />
            )
        }
    ]
})(LoginHOF(Login));

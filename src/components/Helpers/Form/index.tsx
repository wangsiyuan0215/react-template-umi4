/*
 * @Author: SiYuan Wang
 * @Date: 2019-05-11 15:52:26
 * @Description: Helpers/Form
 */

import React from 'react';
import { Form } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import { IFormHelper, IOption, ParamsType } from './index.d';

/**
 * if you want to expand options in `Form.Create` high-order function,
 * you can set them in `option` param.
 *
 * if you want to configure Form.Item component, please setting them in term of `formItems`.
 *
 * @param options {{
 *   name: string,
 *   formProps: object,
 *   formItems: array<{
 *     key: string,
 *     label: string,
 *     option: object,
 *     creator: function | ReactNode,
 *
 *     ...Form.Item.options
 *   }>,
 *
 *   ...Form.create.options
 * }}
 */
export default function FormHelper<T extends FormComponentProps<any>>(options: IOption<{}>) {
    return function _wrapperFn(Component: React.ComponentType<IFormHelper>): React.ReactNode {
        const { formItems, name = `form-${Date.now()}`, formProps, ...restOptions } = options;
        const wrapperComponent = ({ form, ...restProps }): React.ReactElement => {
            const { getFieldDecorator } = form;

            /**
             * the `key` is responsible to terms in `formItems`
             *
             * if setting initialValues for Form, you can pass `initialValues` as param.
             * @param initialValues {{ [key]: values<any> }}
             *
             * if setting dynamic data for Form, you can pass `creatorsData` and `creatorActions` as param in `renderForm` prop
             * and use it in the `creator` function
             * @param creatorData {{ [key]: values<any> }}
             * @param creatorActions {{ [key]: values<function> }}
             * @returns {*}
             */
            const renderForm = ({
                initialValues = {},
                creatorData = {},
                creatorActions = {}
            }: ParamsType = {}): React.ReactNode => (
                <Form {...formProps}>
                    {formItems.map(item => {
                        if (!item.key || !item.creator) return null;

                        const {
                            label,
                            key,
                            option: itemOption,
                            creator,
                            ...restItemOptions
                        } = item;
                        return (
                            <Form.Item label={label} key={key} {...restItemOptions}>
                                {getFieldDecorator(item.key, {
                                    ...(typeof itemOption === 'function'
                                        ? itemOption(form)
                                        : itemOption),
                                    ...(Object.prototype.hasOwnProperty.call(
                                        initialValues,
                                        key
                                    ) && {
                                        initialValue: initialValues[key]
                                    })
                                })(
                                    typeof creator === 'function'
                                        ? creator(creatorData[key] || {}, creatorActions[key] || {})
                                        : creator
                                )}
                            </Form.Item>
                        );
                    })}
                </Form>
            );

            return <Component renderForm={renderForm} form={form} {...restProps} />;
        };

        wrapperComponent.displayName = name;

        return Form.create<T>({ ...restOptions, name })(wrapperComponent);
    };
}

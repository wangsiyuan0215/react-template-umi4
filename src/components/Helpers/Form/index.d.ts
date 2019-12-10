/*
 * @Author: SiYuan Wang
 * @Date: 2019-11-19 17:27:38
 * @Description: index.d
 */

import React from 'react';
import { WrappedFormUtils, GetFieldDecoratorOptions } from 'antd/es/form/Form.d';
import { FormProps, FormCreateOption, FormItemProps } from 'antd/es/form';

type InitialValuesType = {
    [key: string]: any;
};

type CreatorDataType = {
    [key: string]: any;
};

type CreatorActionsType = {
    [key: string]: {
        [action: string]: Function;
    };
};

export type ParamsType = {
    initialValues?: InitialValuesType | any;
    creatorData?: CreatorDataType | any;
    creatorActions?: CreatorActionsType | any;
};

export interface IFormHelper {
    form: WrappedFormUtils;
    renderForm: (param: ParamsType) => React.ReactNode | React.ReactNode;
}

export interface IFormItem extends FormItemProps {
    key: string;
    label: string;
    option?: ((form: WrappedFormUtils) => GetFieldDecoratorOptions) | GetFieldDecoratorOptions;
    creator: ((creatorData, creatorActions) => React.ReactNode) | React.ReactNode;
}

export interface IOption<T> extends FormCreateOption<T> {
    name: string;
    formProps: FormProps;
    formItems: Array<IFormItem>;
}

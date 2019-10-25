/**
 * Created by wangsiyuan on 28/11/2017.
 */
import { curry } from 'ramda';
import { notification } from 'antd';

import constance from '@/resources/constance';

const { errorTypes } = constance;

const errorHandlers = Object.keys(errorTypes).reduce(
    (accumulator, item) => ({
        ...accumulator,
        [errorTypes[item]]: message => notification[errorTypes[item]](message)
    }),
    {}
);

const errorsCurried = curry((AlertComponent, handlers, error, dispatch) => {
    // eslint-disable-next-line no-unused-expressions
    error && error.preventDefault();
    const { errorType = null, actionType = '', errorMessageCh = null } = error;

    if (actionType) {
        dispatch({
            type: 'loading/@@DVA_LOADING/HIDE',
            payload: { actionType, namespace: actionType.split('/')[0] }
        });
        dispatch({ type: `${actionType}/@@end`, payload: true });
    }

    if (!errorMessageCh) return false;
    if (errorType && handlers[errorType]) return handlers[errorType](errorMessageCh);

    return notification.error({
        message: errorMessageCh
    });
});

const errorCreator = curry((actionType, type, message) => {
    const errorType = !type ? errorTypes.INFO : type;
    return {
        errorType,
        actionType,
        errorMessageCh: message
    };
});

const _ = errorsCurried(notification, errorHandlers);

export { _, errorCreator };

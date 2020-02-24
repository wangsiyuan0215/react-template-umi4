/*
 * @Author: SiYuan Wang
 * @Date: 2019-12-13 11:54:19
 * @Description: errorHelper
 */
/*
 * @Editor: SiYuan Wang
 * @Date: 2020-02-24 09:15:34
 * @Description: errorHelper
 */

import curry from 'ramda/es/curry';
import { notification } from 'antd';

import { ErrorTypes } from '@/resources/constant';

const errorHandlers = Object.keys(ErrorTypes).reduce(
    (accumulator, item) => ({
        ...accumulator,
        [ErrorTypes[item]]: message => notification[ErrorTypes[item]]({ message })
    }),
    {}
);

const errorsCurried = curry((handlers, interceptors, error, dispatch) => {
    // eslint-disable-next-line no-unused-expressions
    error && error.preventDefault();
    const { errorType = null, actionType = '', errorMessageCh = null } = error;

    if (actionType) {
        dispatch({
            type: 'loading/@@DVA_LOADING/HIDE',
            payload: { actionType, namespace: actionType.split('/')[0] }
        });
        dispatch({ type: `${actionType}/@@end`, payload: true });

        // eslint-disable-next-line no-unused-expressions
        typeof interceptors === 'function' && interceptors(actionType, error, dispatch);
    }

    if (!errorMessageCh) return false;
    if (errorType && handlers[errorType]) return handlers[errorType](errorMessageCh);

    return handlers[ErrorTypes.ERROR](errorMessageCh);
});

const errorCreator = curry((actionType, type, message) => {
    const errorType = !type ? ErrorTypes.ERROR : type;
    return {
        errorType,
        actionType,
        errorMessageCh: message
    };
});

const _ = errorsCurried(errorHandlers);

export { _, errorCreator };

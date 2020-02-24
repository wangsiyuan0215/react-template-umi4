/*
 * @Author: SiYuan Wang
 * @Date: 2019-12-13 11:54:19
 * @Description: errorHelper
 */
/*
 * @Editor: SiYuan Wang
 * @Date: 2020-02-24 10:18:30
 * @Description: errorHelper
 */

import curry from 'ramda/es/curry';
import { notification } from 'antd';

import { ErrorTypes, ErrorFromTypes } from '@/resources/constant';

const errorHandlers = Object.keys(ErrorTypes).reduce(
    (accumulator, item) => ({
        ...accumulator,
        [ErrorTypes[item]]: message => notification[ErrorTypes[item]]({ message })
    }),
    {}
);

/**
 * @param interceptors { function(error, dispatch) }
 *  if interceptors returns false, it will block next process for error notification
 *  and if interceptors returns true, it will not do that.
 */
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
    }

    if (typeof interceptors === 'function' && !interceptors(error, dispatch)) return false;

    if (!errorMessageCh) return false;
    if (errorType && handlers[errorType]) return handlers[errorType](errorMessageCh);

    return handlers[ErrorTypes.ERROR](errorMessageCh);
});

const errorCreator = curry((actionType, type, message, from) => {
    const errorType = !type ? ErrorTypes.ERROR : type;

    return {
        from: from || ErrorFromTypes.NORMAL,
        errorType,
        actionType,
        errorMessageCh: message
    };
});

const _ = errorsCurried(errorHandlers);

export { _, errorCreator };

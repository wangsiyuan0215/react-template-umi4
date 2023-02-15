import curry from 'ramda/es/curry';

import { ERROR_TYPES } from '@/resources/constant';
import { getPrimaryType } from '@/utils';

/**
 *
 * @param notifier
 * @returns {{}}
 */
const errorHandlers = (notifier) =>
    Object.keys(ERROR_TYPES).reduce(
        (accumulator, item) => ({
            ...accumulator,
            [ERROR_TYPES[item]]: (message) => notifier[ERROR_TYPES[item]](message)
        }),
        {}
    );

/**
 * @param notifier notifier 实例
 * @param interceptors { function(error, dispatch) }
 *  if interceptors returns false, it will block next process for error notification
 *  and if interceptors returns true, it will not do that.
 */
const errorsCurried = curry((notifier, interceptors, error, dispatch) => {
    // eslint-disable-next-line no-unused-expressions
    error && error.preventDefault();
    const { type = null, actionType = '', message = null } = error;
    const notifications = errorHandlers(typeof notifier === 'function' ? notifier(error) : notifier);

    if (actionType) {
        dispatch({
            type: 'loading/@@DVA_LOADING/HIDE',
            payload: { actionType, namespace: actionType.split('/')[0] }
        });
        dispatch({ type: `${actionType}/@@end`, payload: true });
    }

    if (typeof interceptors === 'function' && !interceptors(error, dispatch)) return false;

    if (!message) return false;
    if (type && notifications[type]) return notifications[type](message);

    return notifications[ERROR_TYPES.ERROR](message);
});

const errorCreator = (actionType) => (type, message) => {
    if (typeof message === 'undefined') if (getPrimaryType(type) === 'Object' && type.message) return type;

    const errorType = !type ? ERROR_TYPES.ERROR : type;
    return {
        type: errorType,
        message,
        actionType
    };
};

const _ = errorsCurried;

export { _, errorCreator };

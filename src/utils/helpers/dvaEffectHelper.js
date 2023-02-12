import { curry } from 'ramda';

/**
 * @param {Object} fns
 * @param {Object} onEffectInspector || false
 * @type {Function}
 */
const dvaEffectHelper = curry(
    (fns, onEffectInspector, effect, effects, model, actionType) =>
        /* eslint func-names: ["off"] */
        function* (...args) {
            const finalFns = Object.keys(fns).reduce(
                (accumulator, key) => ({ ...accumulator, [key]: fns[key](actionType) }),
                {}
            );

            if (!onEffectInspector) {
                yield effect(finalFns, ...args);
            } else {
                yield onEffectInspector.onEffect(effect, { ...effects }, model, actionType)(finalFns, ...args);
            }
        }
);

export default dvaEffectHelper;

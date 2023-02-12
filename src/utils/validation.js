import map from 'ramda/src/map';
import has from 'ramda/src/has';
import type from 'ramda/src/type';
import path from 'ramda/src/path';
import curry from 'ramda/src/curry';
import filter from 'ramda/src/filter';
import concat from 'ramda/src/concat';
import compose from 'ramda/src/compose';
import flatten from 'ramda/src/flatten';
import converge from 'ramda/src/converge';

const invariant = (condition, format, a, b, c, d, f) => {
    if (!condition) {
        let argIndex = 0;
        const argArray = [a, b, c, d, f];
        /* eslint no-plusplus: ["off"] */
        throw new Error(format.replace(/%s/g, () => argArray[argIndex++]));
    }
};

const isEmpty = (prop) => prop === null || prop === '' || typeof prop === 'undefined';

// requirement :: object -> any -> string | boolean
const requirement = curry((rule, prop) => (rule.isRequired && isEmpty(prop) ? rule.emptyMessage : false));

// validation :: object -> any -> string | boolean
const validation = curry((rule, prop) => {
    if (isEmpty(prop)) return false;

    if (typeof rule.validate === 'undefined') return false;

    switch (type(rule.validate)) {
        case 'Function':
            if (!rule.validate(prop)) {
                return type(rule.errorMessage) === 'Array' ? rule.errorMessage[0] : rule.errorMessage;
            }
            return false;
        case 'Array':
            invariant(type(rule.errorMessage) === 'Array', 'rules.%s.errorMessage should be Array type.', prop);

            invariant(
                rule.validate.length === rule.errorMessage.length,
                'rules.%s.errorMessage should be same length with rules.%s.validate.',
                prop
            );

            return rule.validate.map((f, index) => {
                invariant(type(f) === 'Function', 'rules.%s.validate[%s] is not a Function.', prop, index);
                if (!f(prop)) return rule.errorMessage[index];
                return false;
            });
        default:
            invariant(false, ' [validate] is just allowed to be Function or Array type.');
            return false;
    }
});

// a :: string | boolean
// merge :: (a, a) -> a
const merge = (require, validate) => require || validate || false;

// mapper :: (Object, Object) -> string -> string
const mapper = (rules, context) => (prop) =>
    compose(
        converge(merge, [requirement(rules[prop]), validation(rules[prop])]),
        // currentProp => {
        //     invariant(
        //         typeof currentProp !== 'undefined',
        //         'validation: context.%s is undefined.',
        //         prop
        //     );
        //     return currentProp;
        // },
        (p) => path(p.split('.'), context)
    )(prop);

export default curry((props, rules, context) =>
    compose(
        filter((x) => x !== false),
        flatten,
        map(mapper(rules, context)),
        filter((prop) => has(prop, rules)),
        concat([])
    )(props)
);

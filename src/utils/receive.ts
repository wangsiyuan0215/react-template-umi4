import { either, all, is, pipe, prop, map } from 'ramda';

const iterable = either(is(Object), is(Array));

// TODO low overhead receive
export default function receive<D = Record<string, unknown>, P = Partial<D>>(draft: D, payload: P) {
    const payloadKeys = Object.keys(payload);

    const bothAreObj = (key: string) =>
        pipe(map(prop(key)), all(iterable))([draft, payload] as Record<string, unknown>[]);

    payloadKeys.forEach((key) => {
        if (bothAreObj(key)) {
            receive(draft[key], payload[key]);
        }
        draft[key] = payload[key];
    });
}

/**
 * Define Event instance for EventBus
 */
import { EventEmitter } from 'events';
import React, { FunctionComponent } from 'react';

import { EVENT_NAMES } from '@/resources/constant';

const event = new EventEmitter();

export default event;

interface IEventHandler<P extends EventListener> {
    [key: string]: {
        inject: (cb: P) => void;
        remove: (cb: P) => void;
    };
}

export function EventHOC<T>(eventNames: EVENT_NAMES[]) {
    const onEvents: IEventHandler<EventListener> = eventNames.reduce((acc, item) => {
        return {
            ...acc,
            [`event_${item}`]: {
                inject: (cb: EventListener) => event.on(item, cb),
                // Remove function is supplied for remove event listener because child component's dependencies
                // changed once. I won't move removes action into HOC useEffect hook because of unknown rerender time.
                remove: (cb) => event.removeListener(item, cb)
            }
        };
    }, {});
    return (Component: FunctionComponent<T & IEventHandler<EventListener>>) => {
        return (props: T) => {
            return <Component {...props} {...onEvents} />;
        };
    };
}

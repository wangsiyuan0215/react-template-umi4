import isEmpty from 'lodash/isEmpty';
import Debounce from 'lodash/debounce';
import React, { ReactElement } from 'react';

import styles from './index.less';

const gteGenerator = (min) => (value) => value >= min;
const intGenerator = (min, max) => (value) => value > min && value < max;
const lteGenerator = (max) => (value) => value <= max;

type Gap = { x: number; y: number };
interface IQueries {
    [key: string]: number | string;
}
interface IWaterfall {
    gap: Gap;
    queries: IQueries;
    Component?: any;
    className?: string;
    getContainer?: () => HTMLElement;
}

const DELAY_DURATION = 100;
const BORDER_GAP_OFFSET = 1;

/* eslint no-multi-assign: 0 */
const Waterfall: React.FC<IWaterfall> & IContainer = ({
    gap = { x: 0, y: 0 },
    queries = {},
    className,
    children,
    getContainer
}) => {
    const mapper = React.useRef(new Map());
    const itemsRef = React.useRef([]);
    const rendered = React.useRef(false);
    const maxColumn = React.useRef(1);
    const parentHeight = React.useRef<number>(0);

    const $document = React.useRef(document.querySelector('body'));
    const $container = React.useRef<HTMLDivElement>(null);

    const [refs, setRefs] = React.useState([]);
    const [items, setItems] = React.useState([]);
    const [width, setWidth] = React.useState(null);

    // eslint-disable-next-line no-underscore-dangle
    const __getParentContainer = React.useMemo(
        () => (typeof getContainer === 'function' ? getContainer : () => $container.current?.parentElement),
        [getContainer]
    );

    React.useEffect(() => {
        if (!isEmpty(queries)) {
            const keys = Object.keys(queries)
                .filter((key) => !Number.isNaN(Number(key)))
                .map(Number)
                .sort((a, b) => Number(a) - Number(b));
            mapper.current =
                keys.length &&
                keys.reduce((acc, key, index) => {
                    if (index === 0) {
                        acc.set(lteGenerator(key), queries[key]);
                    } else {
                        acc.set(intGenerator(keys[index - 1], key), queries[key]);
                    }
                    if (index === keys.length - 1) {
                        acc.set(gteGenerator(key), queries[key]);
                    }

                    return acc;
                }, new Map());
        }
    }, [queries]);

    const getColumns = React.useCallback(() => {
        const { width: w } = $document.current.getBoundingClientRect();
        // eslint-disable-next-line no-restricted-syntax
        for (const item of mapper.current.keys()) {
            if (item(w)) return mapper.current.get(item);
        }
    }, []);

    const resize = () => {
        const maxColumns = getColumns();

        const { height } = __getParentContainer().getBoundingClientRect();
        const { width: w } = $container.current.getBoundingClientRect();

        rendered.current = false;
        maxColumn.current = maxColumns;
        parentHeight.current = height;

        setWidth((w - gap.x * (maxColumns - 1) - BORDER_GAP_OFFSET * 3) / maxColumns);
        // eslint-disable-next-line no-use-before-define,@typescript-eslint/no-use-before-define
        setItemsPositionByHost(items, gap);
    };

    React.useEffect(() => {
        resize();
        const debounce = Debounce(resize, DELAY_DURATION, { trailing: true });
        window.addEventListener('resize', debounce);
        return () => {
            window.removeEventListener('resize', debounce);
        };
    }, []);

    const getRefs = (index) => ($item) => {
        //! Don't change itemsRef length dynamic
        itemsRef.current[index] = $item;
        const newRefs = itemsRef.current.filter(Boolean);
        // initial or add items
        if (newRefs.length >= React.Children.count(children)) setRefs(newRefs);
        // remove some children
        if ($item === undefined && newRefs.length < React.Children.count(children)) setRefs(newRefs);
    };

    const getItems = (max) => (acc, ref: HTMLElement, index) => {
        // eslint-disable-next-line no-bitwise
        const row = ~~(index / max);
        const column = index % max;
        const item = { ref, row, column };

        return [...acc, item];
    };

    React.useEffect(() => {
        // eslint-disable-next-line no-unused-expressions
        refs.length && setItems(refs.reduce(getItems(maxColumn.current), []));
    }, [refs]);

    const setItemsPositionByHost = Debounce(
        (terms, g) => {
            if (terms.length) {
                const max = maxColumn.current;
                let maxHeight = 0;

                // eslint-disable-next-line no-restricted-syntax,no-plusplus
                for (let i = 0; i < terms.length; i++) {
                    const { ref, row, column } = terms[i];
                    terms[i].top =
                        row === 0 ? BORDER_GAP_OFFSET : (terms[i - max].top ?? 0) + terms[i - max].height + (g.y ?? 0);
                    if (row === 0) {
                        terms[i].left = column === 0 ? BORDER_GAP_OFFSET : (terms[i - 1].width + g.x) * column;
                    } else {
                        terms[i].left = terms[i - max].left;
                    }
                    const { width: w, height: h } = (ref as HTMLElement).getBoundingClientRect();
                    terms[i].width = w;
                    terms[i].height = h;
                }
                maxHeight = Math.max(...terms.map((item) => item.top + item.height), maxHeight) + gap.y;

                $container.current.style.height = `${maxHeight}px`;
                if (!rendered.current && parentHeight.current <= maxHeight) {
                    resize();
                    rendered.current = true;
                } else {
                    // eslint-disable-next-line array-callback-return
                    terms.map(({ ref, left, top }) => {
                        ref.style.transform = `translate(${left}px, ${top}px)`;
                        ref.classList.add(styles.ready);
                    });
                }
            }
        },
        DELAY_DURATION / 2,
        { trailing: true }
    );

    React.useEffect(() => {
        setItemsPositionByHost(items, gap);
    }, [items, gap]);

    return (
        <div ref={$container} className={`${styles.container} ${className || ''}`}>
            {React.Children.map(children, (child: ReactElement, index) => {
                // eslint-disable-next-line no-bitwise
                return React.cloneElement(child, { width, onReady: getRefs(index) });
            })}
        </div>
    );
};

interface IWaterfallItem {
    width?: number | null;
    onReady?: <P extends HTMLElement>(item?: P) => void;
}

const WaterfallItem: React.FC<IWaterfallItem> = ({ width, children, onReady }) => {
    const $item = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        // eslint-disable-next-line no-unused-expressions
        if (width !== null && $item.current) onReady($item.current);
    }, [width]);

    // for destroy make itself undefined
    React.useEffect(() => {
        return () => {
            onReady();
        };
    }, []);

    if (width === null) return null;

    return (
        <div ref={$item} style={{ width }} className={styles.item}>
            {children}
        </div>
    );
};

interface IContainer {
    Item: typeof WaterfallItem;
}

Waterfall.Item = WaterfallItem;

export default Waterfall;

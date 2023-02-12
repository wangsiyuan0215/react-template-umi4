import React from 'react';
import { Button, Tooltip } from 'antd';

import styles from './index.less';
import { HostSvg } from '@/components/CustomIcon';

const MAX_SHOW_HEIGHT = 100;

const BackToTop = React.forwardRef<{ onBackToTop: () => void }, { getHostContainer?: () => HTMLElement }>(
    ({ getHostContainer }, ref) => {
        const $path = React.useRef<SVGPathElement>(null);
        const length = React.useRef(null);
        const $timer = React.useRef<NodeJS.Timer>(null);
        const $rafTimer = React.useRef(null);
        const $backToTop = React.useRef<HTMLDivElement>(null);
        const $container = React.useRef<HTMLElement>(getHostContainer?.() || document.body);

        const onBackToTop = React.useCallback((withAnimation = true) => {
            if ($container.current) {
                // eslint-disable-next-line no-unused-expressions
                $rafTimer.current && cancelAnimationFrame($rafTimer.current);

                if (withAnimation) {
                    $rafTimer.current = requestAnimationFrame(function fn() {
                        const o = $container.current.scrollTop;
                        if (o > 0) {
                            $container.current.scrollTop = o - 64;
                            $rafTimer.current = requestAnimationFrame(fn);
                        } else {
                            cancelAnimationFrame($rafTimer.current);
                        }
                    });
                } else $container.current.scrollTop = 0;
            }
        }, []);

        const updateProgress = () => {
            const total = [...$container.current.children].reduce(
                // eslint-disable-next-line no-return-assign, no-sequences
                (acc, $item) => ((acc += $item.clientHeight), acc),
                0
            );
            const scroll = $container.current.scrollTop;
            const height = total - $container.current.clientHeight;
            const progress = length.current - (scroll * length.current) / height;
            $path.current.style.strokeDashoffset = progress.toString();
        };

        const onScroll = React.useCallback(() => {
            if (!$backToTop.current) return false;

            const { scrollTop } = $container.current;
            if (scrollTop >= MAX_SHOW_HEIGHT && !$backToTop.current?.classList.contains('fadeIn')) {
                // eslint-disable-next-line no-unused-expressions
                $timer.current && clearTimeout($timer.current);
                $backToTop.current.style.display = 'flex';
                // eslint-disable-next-line no-unused-expressions
                $backToTop.current.clientHeight;
                $backToTop.current.classList.add('fadeIn');
            } else if (scrollTop < MAX_SHOW_HEIGHT && $backToTop.current?.classList.contains('fadeIn')) {
                $backToTop.current.classList.remove('fadeIn');
                // eslint-disable-next-line no-unused-expressions
                $timer.current && clearTimeout($timer.current);
                $timer.current = setTimeout(() => {
                    // eslint-disable-next-line no-unused-expressions
                    $backToTop.current && ($backToTop.current.style.display = 'none');
                }, 300);
            }
            if (scrollTop >= MAX_SHOW_HEIGHT / 2) updateProgress();
        }, []);

        React.useImperativeHandle(ref, () => ({
            onBackToTop
        }));

        React.useEffect(() => {
            $container.current = getHostContainer?.();
        }, [getHostContainer]);

        React.useEffect(() => {
            if ($backToTop.current) {
                length.current = $path.current.getTotalLength();

                // eslint-disable-next-line no-multi-assign
                $path.current.style.transition = 'none';
                $path.current.style.strokeDasharray = `${length.current} ${length.current}`;
                $path.current.style.strokeDashoffset = length.current.toString();
                $path.current.getBoundingClientRect();
                // eslint-disable-next-line no-multi-assign
                $path.current.style.transition = 'stroke-dashoffset 10ms linear';

                updateProgress();

                $container.current.addEventListener('scroll', onScroll);

                return () => {
                    $container.current.removeEventListener('scroll', onScroll);
                    $timer.current = null;
                };
            }
        }, []);

        return (
            <div ref={$backToTop} className={styles.container}>
                <Tooltip title="Back to top" placement="left">
                    <Button onClick={onBackToTop} type="link" className={styles.button}>
                        <HostSvg name="arrow-top" />
                        <svg
                            width="100%"
                            height="100%"
                            viewBox="-1 -1 102 102"
                            className="back-to-top--circle svg-content"
                        >
                            <path ref={$path} d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
                        </svg>
                    </Button>
                </Tooltip>
            </div>
        );
    }
);

export default BackToTop;

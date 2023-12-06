import { Button } from 'antd';

import styles from './index.less';

export default () => {
    return (
        <div className={styles.exception__container}>
            <h1 className={styles.exception__title}>
                <small>Error Code:</small> 404
            </h1>
            <Button href="#/" type="primary" className={styles.btn}>
                Go back home
            </Button>
        </div>
    );
};

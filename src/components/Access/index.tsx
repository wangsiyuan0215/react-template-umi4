import React from 'react';
import { Access, Redirect } from 'umi';

import { paths } from '@root/config/routes.config';
import useDvaApp2global from '@/hooks/useDvaApp2global';

export default (props) => {
    const { route, children } = props;

    // inject dva app instance into global or window
    useDvaApp2global();

    const RedirectComp = () => <Redirect to={paths.root.root} />;

    return (
        <Access accessible={!route.unaccessible} fallback={<RedirectComp />}>
            {children}
        </Access>
    );
};

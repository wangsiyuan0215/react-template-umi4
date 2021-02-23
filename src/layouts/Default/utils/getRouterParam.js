/*
 * @Author: SiYuan Wang
 * @Date: 2019-08-27 08:45:34
 * @Description: routerHelper
 */

import umiRouter from 'umi/router';
import pathToRegexp from 'path-to-regexp';

const getRouterParam = (pathname, pathList = [], menuData) => {
    const currentRouter = pathList.find(({ path }) => pathToRegexp(path).test(pathname));

    const isNotFound =
        currentRouter &&
        currentRouter.dynamic &&
        menuData &&
        !menuData.includes(currentRouter.menuName);

    /* eslint no-unused-expressions: 0 */
    isNotFound &&
        setTimeout(() => {
            umiRouter.push('/404');
        }, 30);

    return {
        routerParam:
            !isNotFound && currentRouter
                ? (() => {
                      // eslint-disable-next-line prefer-const
                      let keys = [];
                      const pathRegExp = pathToRegexp(currentRouter.path, keys);
                      const [, ...values] = pathname.match(pathRegExp);
                      return keys.reduce(
                          (acc, item, index) => ({
                              ...acc,
                              [item.name]: values[index]
                          }),
                          {}
                      );
                  })()
                : {},
        routerConfig:
            !isNotFound && currentRouter
                ? {
                      ...currentRouter,
                      routes: null,
                      component: null
                  }
                : {}
    };
};

export default getRouterParam;

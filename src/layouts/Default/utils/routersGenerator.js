/*
 * @Author: SiYuan Wang
 * @Date: 2019-08-26 15:12:21
 * @Description: routersGenerator
 */

const routersGenerator = (routes, traceName = [], traceLabel = [], pDynamic = false) =>
    routes
        .reduce((acc, item) => {
            const { path, name, label = name, routes: children = [], dynamic } = item;
            if (!path) return acc;

            const finalTraceNames = [...traceName, ...[].concat(name)];
            const finalTraceLabels = [...traceLabel, ...[].concat(label)];

            return [
                ...acc,
                ...(children.length
                    ? routersGenerator(children, finalTraceNames, finalTraceLabels, dynamic)
                    : []),
                {
                    path,
                    router: {
                        ...item,
                        ...(pDynamic && { dynamic: true }),
                        ...(item.dynamic && { menuName: finalTraceNames.join('.') }),
                        pathname: path.replace(/:\w+/g, ''),
                        breadcrumb: finalTraceLabels
                    }
                }
            ];
        }, [])
        .reverse();

export default routersGenerator;

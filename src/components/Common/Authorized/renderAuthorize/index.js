/*
 * @Author: siyuan.wang
 * @Date: 2021/3/2 3:55 PM
 * @Description: extracted from ant-design-pro renderAuthorize
 */
/* eslint-disable import/no-mutable-exports */
let CURRENT = 'NULL';
/**
 * use authority or getAuthority
 * @param Authorized
 */
const renderAuthorize = Authorized => currentAuthority => {
    if (currentAuthority) {
        if (currentAuthority.constructor.name === 'Function') {
            CURRENT = currentAuthority();
        }
        if (currentAuthority.constructor.name === 'String' || currentAuthority.constructor.name === 'Array') {
            CURRENT = currentAuthority;
        }
    } else {
        CURRENT = 'NULL';
    }
    return Authorized;
};

export { CURRENT };
export default Authorized => renderAuthorize(Authorized);

/*
 * @Author: SiYuan Wang
 * @Date: 2019-12-11 16:32:46
 * @Description: LoginHOF
 */

import { connect } from 'dva';
import { AnyAction, Dispatch } from 'redux';

import { State4model } from '@/models/user';

export interface IState2Props extends State4model {
    loading: boolean;
}

const mapStateToProps = ({ user, loading }): IState2Props => ({
    token: user.token,
    loading: !!loading.effects['user/login']
});

export interface IDispatch2Props {
    login(username: string, password: string): Dispatch<AnyAction>;
}

const mapDispatchToProps = (dispatch): IDispatch2Props => ({
    login: (username, password) => dispatch({ type: 'user/login', payload: { username, password } })
});

export default Component =>
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Component);

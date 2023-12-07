import { defineModel } from '@/utils/helpers/defineModel';

import type { User } from '@/typings';

type State = {
    user: User;
};

export default defineModel<State, 'user'>({
    namespace: 'user',
    state: {
        user: {} as User
    },
    reducers: {
        receiveUser(state, action) {
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload
                }
            };
        }
    }
});

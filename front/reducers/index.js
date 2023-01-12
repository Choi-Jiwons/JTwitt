import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from 'redux';

import user from './user';
import post from './post';

const initialState = {
    // name:"jiwon",
    // age: 28,
    // password: 'babo',
    user: {
    },
    post: {
    }
};

const changeNickname = (data) => {
    return {
        type: "CHANGE_NICKNAME",
        data,
    }
};



const rootReducer = combineReducers({
    index: (state = {}, action) => {
        switch (action.type) {
            case HYDRATE:
                console.log("HYDRATE", action);
                return {
                    ...state,
                    ...action.payload,
                };
            default:
                return state;
        }
    },
    //1
    user,
    post,
});

export default rootReducer;

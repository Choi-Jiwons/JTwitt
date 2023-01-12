import produce from "immer";
import shortId from "shortid";
export const initialState = {
    logInLoading: false,
    logInDone: false,
    logInError: false,
    
    logOutLoading: false,
    logOutDone: false,
    logOutError: false,

    signUpLoading: false,
    signUpDone: false,
    signUpError: false,
    
    changeNicknameLoading: false,
    changeNicknameDone: false,
    changeNicknameError: false,

    followLoading: false,
    followDone: false,
    followError: false,

    unfollowLoading: false,
    unfollowDone: false,
    unfollowError: false,

    me: null,
    signUpData: {},
    loginData: {},
};

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST';
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE';

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE'; 

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = "REMOVE_POST_OF_ME";

export const loginRequestAction = (data) => {

return {
        type: LOG_IN_REQUEST,
        data,
    }
};

export const logoutRequestAction = (data) =>{
return {
        type: LOG_OUT_REQUEST,
        data,
    }
};

export const signUpRequestAction = (data) =>{
    return {
        type: SIGN_UP_REQUEST,
        data,
    }
};

export const changeNicknameRequestAction = (data) =>{
    return {
        type: CHANGE_NICKNAME_REQUEST,
        data,
    }
};

export const followRequestAction = (data) =>{
    return {
        type: FOLLOW_REQUEST,
        data,
    }
}

export const unfollowRequestAction = (data) =>{
    return {
        type: UNFOLLOW_REQUEST,
        data,
    }
}

const dummyUser = data => ({
    ...data,
    nickname: data.email,
    id:shortId.generate(),
    Post: [],
    Followings: [],
    Followers: [],
})


const reducer = (state = initialState, action) => {
    return produce(state, (draft) =>{
        switch (action.type) {
            case LOG_IN_REQUEST:
                draft.logInDone = false;
                draft.logInError = null;
                draft.logInLoading = true;
                break;
            case LOG_IN_SUCCESS:
                draft.logInDone = true;
                draft.logInLoading = false;
                draft.me = dummyUser(action.data);
                break;
            case LOG_IN_FAILURE:
                draft.logInLoading = false;
                draft.logInError = action.error;
                break;
            case LOG_OUT_REQUEST:
                draft.logOutDone = false;
                draft.logOutError = null;
                draft.logOutLoading = true;
                break;
            case LOG_OUT_SUCCESS:
                draft.logOutDone = true;
                draft.logOutLoading = false;
                draft.me = null;
                break;
            case LOG_OUT_FAILURE:
                draft.logInLoading = false;
                draft.logInError = action.error;
                break;

            case SIGN_UP_REQUEST:
                draft.signUpDone = false;
                draft.signUpError = null;
                draft.signUpLoading = true;
                break;
            case SIGN_UP_SUCCESS:
                draft.signUpDone = true;
                draft.signUpLoading = false;
                break;
            case SIGN_UP_FAILURE:
                draft.signUpLoading = false;
                draft.signUpError = action.error;
                break;
        
            case CHANGE_NICKNAME_REQUEST:
                draft.changeNicknameDone = false;
                draft.changeNicknameError = null;
                draft.changeNicknameLoading = true;
                break;
            case CHANGE_NICKNAME_SUCCESS:
                draft.changeNicknameDone = true;
                draft.changeNicknameLoading = false;
                break;
            case CHANGE_NICKNAME_FAILURE:
                draft.changeNicknameLoading = false;
                draft.changeNicknameError = action.error;
                break;

            case FOLLOW_REQUEST:
                draft.followDone = false;
                draft.followError = null;
                draft.followLoading = true;
                break;
            case FOLLOW_SUCCESS:
                draft.me.Followings.push({id : action.data});
                draft.followDone = true;
                draft.followLoading = false;
                break;
            case FOLLOW_FAILURE:
                draft.followLoading = false;
                draft.followError = action.error;
                break;  
            case UNFOLLOW_REQUEST:
                draft.unfollowDone = false;
                draft.unfollowError = null;
                draft.unfollowLoading = true;
                break;
            case UNFOLLOW_SUCCESS:
                draft.me.Followings = draft.me.Followings.filter(v => v.id !== action.data);
                draft.unfollowLoading = false;
                draft.unfollowDone = true;
                break;
            case UNFOLLOW_FAILURE:
                draft.unfollowLoading = false;
                draft.unfollowError = action.error;
                break;  

            case ADD_POST_TO_ME:
                draft.me.Post.unshift({id: action.data});
                break;
            case REMOVE_POST_OF_ME:
                draft.me.Post = draft.me.Post.filter(v => v.id !== action.data);
                break;
            default:
                return state;
        }
    })

};

export default reducer;

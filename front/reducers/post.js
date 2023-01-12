import shortId from "shortid";
import produce from "immer";
import faker from 'faker';
import { TrophyOutlined } from "@ant-design/icons";

export const initialState = {
    mainPosts: [],
    imagePaths:[],
    addPostLoading: false,
    addPostDone: false,
    addPostError: null,
    deletePostLoading: false,
    deletePostDone: false,
    deletePostError: null,
    changePostLoading: false,
    changePostDone: false,
    changePostError: null,

    addCommentLoading: false,
    addCommentDone: false,
    addCommentError: null,
    loadPostsLoading: false,
    loadPostsDone: false,
    loadPostsError: null,
    hasMorePosts: true,
};

export const generateDummyPost = (number) => Array(number).fill().map(() => ({
    id : shortId.generate(),
    User:{
        id:shortId.generate(),
        nickname: faker.name.findName(),
    },
    content: faker.lorem.paragraphs(),
    Images:[{
        id:shortId.generate(),
        src: faker.image.image(),
    }],
    Comments:[{
        id: shortId.generate(),
        content: faker.lorem.paragraphs(),
        User: {
            id: shortId.generate(),
            nickname: faker.name.findName(),
        },
    }]
}));

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const DELETE_POST_REQUEST = 'DELETE_POST_REQUEST';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const DELETE_POST_FAILURE = 'DELETE_POST_FAILURE';

export const CHANGE_POST_REQUEST = 'CHANGE_POST_REQUEST';
export const CHANGE_POST_SUCCESS = 'CHANGE_POST_SUCCESS';
export const CHANGE_POST_FAILURE = 'CHANGE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';



export const addPostRequestAction = data => ({
    type: ADD_POST_REQUEST,
    data,
})

export const deletePostRequestAction = data => ({
    type: DELETE_POST_REQUEST,
    data,
})

export const changePostRequestAction = data => ({
    
    type: CHANGE_POST_REQUEST,
    data,
})

export const addCommentRequestAction = data => ({
    type: ADD_COMMENT_REQUEST,
    data,
})



const dummyPost = data => ({
    id: data.id,
    content: data.content,
    User: {
        id: data.userId,
        nickname: data.nickname,
    },
    Images: [],
    Comments: [],
});

const dummyComment = data => ({
    id: data.id,
    content: data.content,
    User: {
        id: data.userId,
        nickname: data.nickname,
    },
})


const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {

        switch (action.type) {
            case ADD_POST_REQUEST:
                draft.addPostLoading = true;
                draft.addPostDone = false;
                draft.addPostError = null;
                break;
            case ADD_POST_SUCCESS:
                draft.mainPosts.unshift(dummyPost(action.data));
                // mainPosts: [dummyPost(action.data), ...state.mainPosts],
                draft.addPostLoading = false;
                draft.addPostDone = true;
                break;
            case ADD_POST_FAILURE:
                draft.addPostLoading = false;
                draft.addPostError = action.error;
                break;
            case DELETE_POST_REQUEST:

                draft.deletePostLoading = true;
                draft.deletePostDone = false;
                draft.deletePostError = null;
                break;
            case DELETE_POST_SUCCESS:
                draft.mainPosts = draft.mainPosts.filter(v => v.id !== action.data);
                draft.deletePostLoading = false;
                draft.deletePostDone = true;
                draft.deletePostError = null;
                break;
            case DELETE_POST_FAILURE:
                draft.deletePostLoading = false;
                draft.deletePostError = action.error;
                break;
            case CHANGE_POST_REQUEST:
                draft.changePostLoading = true;
                draft.changePostDone = false;
                draft.changePostError = null;
                break;
            case CHANGE_POST_SUCCESS:
                draft.changePostLoading = false;
                draft.changePostDone = true;
                draft.changePostError = null;
                break;
            case CHANGE_POST_FAILURE:
                draft.changePostLoading = false;
                draft.changePostError = action.error;
                break;

            case ADD_COMMENT_REQUEST:
                draft.addCommentLoading = true;
                draft.addCommentDone = false;
                draft.addCommentError = null;
                break;
            case ADD_COMMENT_SUCCESS: 
                const post = draft.mainPosts.find(v => v.id === action.data.postId);
                post.Comments.unshift(dummyComment(action.data));
                draft.addCommentLoading = false;
                draft.addCommentDone = true;
                break;

                // const postIndex = state.mainPosts.findIndex( (v) => v.id === action.data.postId ); 
                // const post = state.mainPosts[postIndex];
                // post.Comments = [dummyComment(action.data), ...post.Comments];
                // const mainPosts = [...state.mainPosts];
                // mainPosts[postIndex] = post;
                
                // return {
                //     ...state,
                //     mainPosts: mainPosts,
                //     addCommentLoading: false,
                //     addCommentDone: true,
                // }
            case ADD_COMMENT_FAILURE:
                draft.addCommentLoading = false;
                draft.addCommentError = action.error;
                break;

            case LOAD_POSTS_REQUEST:
                draft.loadPostsLoading = true;
                draft.loadPostsDone = false;
                draft.loadPostsError = null;
                break;
            case LOAD_POSTS_SUCCESS:
                draft.mainPosts = action.data.concat(draft.mainPosts);
                draft.loadPostsLoading = false;
                draft.loadPostsDone = true;
                draft.hasMorePosts = draft.mainPosts.length < 50;
                break;
            case LOAD_POSTS_FAILURE:
                draft.loadPostLoading = false;
                draft.loadPostError = action.error;
                break;

            default:
                return state;
        }
    });
};

export default reducer;

import { CREATE, UPDATE, DELETE, FETCH_ALL, FETCH_BY_SEARCH, END_LOADING, START_LOADING, LIKE , FETCH_POST } from '../constants/actionTypes';

const reducers = (state = { Isloading:true , posts:[]}, action) => {
    switch (action.type) {
        case FETCH_ALL:
            return {
                posts: action.payload.data,
                currentpage: action.payload.currentpage,
                numberofpages: action.payload.numberofpages,
            }

        case START_LOADING:
            return {...state, Isloading: true }
            
        case END_LOADING:
            return {...state, Isloading: true }

        case FETCH_BY_SEARCH:   
            return { ...state, posts: action.payload }

        case FETCH_POST:   
            return { ...state, post: action.payload }

        case CREATE:
            return { ...state , posts: [...state.posts, action.payload]}

        case UPDATE:
        case LIKE:
            return { ...state , posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post)}

        case DELETE:
            return { ...state , posts: state.posts.filter((post) => post._id !== action.payload)}

        default:
            return state
    }
}

export default reducers
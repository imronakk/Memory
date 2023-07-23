import * as api from '../api';
import { AUTH } from '../constants/actionTypes';

// Action creators 

export const signin = (FormData , navigate ) => async (dispatch) => {
    try {
        // LOG IN USER 
        const { data } = await api.signin(FormData);
        dispatch({ type: AUTH, data });
        navigate('/')
        
    } catch (error) {
        console.log(error);
    }
}

export const signup = (FormData, navigate) => async (dispatch) => {
    try {
        // SIGN UP USER 
        const { data } = await api.signup(FormData);
        dispatch({ type: AUTH, data });
        navigate('/')
        
    } catch (error) {
        console.log(`${error} signup`);
    }
}

import * as actionTypes from './actionTypes';
import * as authService from '../../services/auth.service';
import {clearToken, setToken} from "../../sessionStorage";


export const getMe = (token) =>
    async (dispatch) => {
        try {
            const data = await authService.getMe(token);
            dispatch({type: actionTypes.AUTH_SUCCESS, payload: data.data.data});
        } catch (e) {
            dispatch({type: actionTypes.AUTH_FAIL});
        }
    }
;

export const logout = () =>
    async (dispatch) => {
        try {
            clearToken();
            dispatch({type: actionTypes.AUTH_FAIL});
        } catch (e) {
            console.log(e.message);
        }
    }
;

export const loginUser = (username, password) => (
    async (dispatch) => {
        try {
            const data = await authService.loginUser(username, password);
            setToken(data.data.jwt);
            dispatch({type: actionTypes.AUTH_SUCCESS, payload: data.data.user});
            return null;
        } catch (e) {
            dispatch({type: actionTypes.AUTH_FAIL});
            return e.response.data.message;
        }
    }
);

import * as ActionTypes from "./ActionTypes";
import {fetch} from "cross-fetch";

import { baseUrl } from "../shared/baseUrl";

import { USERS } from "../shared/users";



/* Login */
export const login_attempt = (username, password) => (dispatch) =>  {
    // dispatch(login_inProgress());

    // return setTimeout(() => {
        
    // }, 2000);

    // const profile = USERS.filter((user) => (user.username===username && user.password===password));
    // if (profile.length > 0) {
    //     return login_success(profile[0]);
    // } else {
    //     return login_failed();
    // }

    return fetch(baseUrl + "user/login/"
        , {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                "username": username,
                "password": password
            })
        }
        // mode: "no-cors",
        // credentials: "include",
        // header: {
        //     origin: "http://hiredone.pythonanywhere.com/"
        // }
        // method: "get",
        // credentials: "same-origin",
        // headers: {
        //     "X-CSRFToken": getCookie("csrftoken"),
        //     "Accept": "application/json",
        //     "Content-Type": "application/json"
        // }
        )
        .then(response => {
            // console.log(response);
            // console.log(JSON.stringify(response.json()));
            return response.json()
        })
        .then(resp => {
            console.log(resp);
            if (resp.status == 1) {
                // return add_users(users);
                dispatch(login_success(resp.user));
            } else {
                dispatch(login_failed());
            }
        })
        .catch(error => console.log(error.message));
        // .then(users => users.filter((user) => (user.username===username)))
        // .then(users => {
        //     if (users.length > 0) {
        //         // return add_users(users);
        //         dispatch(login_success(users[0]));
        //     } else {
        //         dispatch(login_failed());
        //     }
        // })
        // .catch(error => console.log(error.message));
};

export const login_inProgress = () => ({
    type: ActionTypes.LOGIN_IN_PROGRESS,
});

export const login_success = (user) => ({
    type: ActionTypes.LOGIN_SUCCESS,
    payload: user
});

export const login_failed = (errMess) => ({
    type: ActionTypes.LOGIN_FAILED,
    payload: "Failed"
});

export const add_users = (users) => ({
    type: ActionTypes.ADD_USERS,
    payload: users
});

export const signup_attempt = (first_name, last_name, email, username, password) => (dispatch) =>  {
    // dispatch(login_inProgress())

    return fetch(baseUrl + "user/"
        , {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                "first_name":first_name, 
                "last_name": last_name,
                "email": email,
                "username": username,
                "password": password
            })
        }
        )
        .then(response => {
            return response.json()
        })
        .catch(error => console.log(error.message));
};

export const signup_inProgress = () => ({
    type: ActionTypes.SIGNUP_IN_PROGRESS,
});

export const signup_success = (user) => ({
    type: ActionTypes.SIGNUP_SUCCESS,
    payload: user
});

export const signup_failed = (errMess) => ({
    type: ActionTypes.SIGNUP_FAILED,
    payload: "Failed"
});



export const signout = () => {


    console.log("signout triggered")
    
    return ({
    type: ActionTypes.SIGNOUT
    });
}

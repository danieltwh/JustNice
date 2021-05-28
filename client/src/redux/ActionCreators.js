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

    return fetch("users/")
        .then(response => response.json())
        // .then(users => console.log(JSON.stringify(users)))
        .then(users => users.filter((user) => (user.username===username && user.password===password)))
        .then(users => {
            if (users.length > 0) {
                // return add_users(users);
                dispatch(login_success(users[0]));
            } else {
                dispatch(login_failed());
            }
        })
        .catch(error => console.log(error.message));


    // console.log(JSON.stringify(users_data))
    // const profile = users_data.filter((user) => (user.username===username && user.password===password));
    // if (profile.length > 0) {
    //     return login_success();
    // } else {
    //     return login_failed();
    // }
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



export const signout = () => ({
    type: ActionTypes.SIGNOUT
});

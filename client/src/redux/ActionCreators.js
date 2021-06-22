import * as ActionTypes from "./ActionTypes";
import {fetch} from "cross-fetch";

import { baseUrl } from "../shared/baseUrl";

import { USERS } from "../shared/users";



/* Login */
export const login_attempt = (username, password) => (dispatch) =>  {
    return fetch(baseUrl + "user/login/"
        , {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                "username": username,
                "password": password
            })
        })
        .then(response => {
            // console.log(response);
            // console.log(JSON.stringify(response.json()));
            return response.json()
        })
        .then(resp => {
            console.log(resp);
            if (resp.status === 1) {
                // return add_users(users);
                dispatch(login_success(resp.user));
            } else {
                dispatch(login_failed());
            }
        })
        .catch(error => console.log(error.message));
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

export const load_myrecipes = (user_id) => (dispatch) => {
    // dispatch(load_myrecipes_inProgress());

    return fetch(baseUrl + "recingred/getallrec/", {
        method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                "user_id": user_id, 
            })
        })
        .then(resp => resp.json())
        .then(resp => {
            console.log(resp);
            if (resp.length >= 1) {
                // return add_users(users);
                dispatch(load_myrecipes_success(resp));
            } else {
                dispatch(load_myrecipes_failed());
            }
        })
}

export const load_myrecipes_inProgress = () => ({
    type: ActionTypes.LOAD_MY_RECIPES_IN_PROGRESS
});

export const load_myrecipes_success = (recipes) => ({
    type: ActionTypes.LOAD_MY_RECIPES,
    payload: recipes
});

export const load_myrecipes_failed = () => ({
    type: ActionTypes.LOAD_MY_RECIPES_FAILED
}) 


export const get_recipe = (rec_id) => (dispatch) => {
    dispatch(get_recipe_inProgress(true));

    return fetch(baseUrl + "recingred/getfullrec/", {
        method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                "rec_id": rec_id, 
            })
        })
        .then(resp => resp.json())
        .then(resp => {
            // console.log(JSON.stringify(resp));
            if (true) {
                // return add_users(users);
                dispatch(get_recipe_success(resp));
            } else {
                dispatch(get_recipe_failed("Error"));
            }
        })
        .catch(err => console.log(err));
}

export const get_recipe_inProgress = () => ({
    type: ActionTypes.GET_RECIPE_IN_PROGRESS
});

export const get_recipe_success = (recipe) => ({
    type: ActionTypes.GET_RECIPE_SUCCESS,
    payload: recipe
});

export const get_recipe_failed = (errMess) => ({
    type: ActionTypes.GET_RECIPE_FAILED,
    payload: errMess
})

export const get_recipe_reset = () => ({
    type: ActionTypes.GET_RECIPE_RESET
})


export const update_recipe = (recipe) => (dispatch) => {
    dispatch(update_recipe_inProgress(true));

    return fetch(baseUrl + "recingred/getfullrec/", {
        method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                "rec_id": recipe.rec_id,
                "rec_name": recipe.rec_name,
                "rec_instructions": recipe.rec_instructions,
                "cooking_time": recipe.cooking_time,
                "serving_pax": recipe.serving_pax,
                "cuisine": recipe.cuisine,
                "rec_type": recipe.rec_type,
                "isPublished": recipe.isPublished,
                "ingredient": recipe.ingredient.map(ingredient => {
                    if (ingredient.isValid)  {
                        delete ingredient.isValid;
                        return ingredient;
                    } else {
                        return ingredient;
                    }
                })
            })
        })
        .then(resp => resp.json())
        .then(resp => {
            // console.log(JSON.stringify(resp));
            if (true) {
                // return add_users(users);
                dispatch(get_recipe_success(resp));
            } else {
                dispatch(get_recipe_failed("Error"));
            }
        })
        .catch(err => console.log(err));
}

export const update_recipe_inProgress = () => ({
    type: ActionTypes.UPDATE_RECIPE_IN_PROGRESS
});

export const update_recipe_failed = () => ({
    type: ActionTypes.UPDATE_RECIPE_FAILED
});

export const update_recipe_success = () => ({
    type: ActionTypes.UPDATE_RECIPE_SUCCESS
});
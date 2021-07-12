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
            } else if(resp.status === 0) {
                dispatch(login_failed("Wrong Password"));
            } else {
                dispatch(login_failed("Username Does Not Exist"));
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
    payload: errMess
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

export const load_myrecipes_reset = () => ({
    type: ActionTypes.LOAD_MY_RECIPES_RESET
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
        .catch(err => {
            dispatch(get_recipe_failed("Error"));
            console.log(err)});
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


export const update_recipe = (newRecipe, user_id) => (dispatch) => {
    dispatch(update_recipe_inProgress(true));

    // var ingredients = [];
    var count = -1;
    var ingredients = newRecipe.ingredient.map(curr => {
        if (curr.isValid === "valid")  {
            // ingredients.push({`${curr.ingred_id}`: curr.ingred_quantity})
            // ingredients[`${curr.ingred_id}`] = curr.ingred_quantity;

            var nextItem = {}
            nextItem[`${curr.ingred_id}`] = curr.ingred_quantity;
            return nextItem;
        } else {
            // ingredients[`${count}`] = {
            //     "ingred_name": curr.ingred_name,
            //     "ingred_unit": curr.ingred_unit,
            //     "ingred_quantity": curr.ingred_quantity
            // };
            var nextItem = {}
            nextItem[`${count}`] = {
                    "ingred_name": curr.ingred_name,
                    "ingred_unit": curr.ingred_unit,
                    "ingred_quantity": curr.ingred_quantity
                }
            count = count - 1;
            return nextItem;
        }
    })

    console.log(JSON.stringify(ingredients));
    alert(JSON.stringify(ingredients));

    if (newRecipe.rec_id === "new") {
        return fetch(baseUrl + "recingred/recipe/", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                "rec_name": newRecipe.rec_name,
                "rec_instructions": newRecipe.rec_instructions,
                "cooking_time": newRecipe.cooking_time,
                "serving_pax": newRecipe.serving_pax,
                "cuisine": newRecipe.cuisine,
                "rec_type": newRecipe.rec_type,
                "isPublished": newRecipe.isPublished,
                "user_id": user_id,
                "ingredients": ingredients
                })
            })
            .then(resp => resp.json())
            .then(resp => {
                // console.log(JSON.stringify(resp));
                if (resp.status === 1) {
                    // return add_users(users);
                    dispatch(update_recipe_success());
                } else {
                    dispatch(update_recipe_failed("Error"));
                }
            })
            .catch(err => {
                alert(err);
                console.log(err)});
    } else {
        return fetch(baseUrl + "recingred/recipe/", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                "rec_id": newRecipe.rec_id,
                "rec_name": newRecipe.rec_name,
                "rec_instructions": newRecipe.rec_instructions,
                "cooking_time": newRecipe.cooking_time,
                "serving_pax": newRecipe.serving_pax,
                "cuisine": newRecipe.cuisine,
                "rec_type": newRecipe.rec_type,
                "isPublished": newRecipe.isPublished,
                "user_id": user_id,
                "ingredients": ingredients
                })
            })
            .then(resp => resp.json())
            .then(resp => {
                // console.log(JSON.stringify(resp));
                if (resp.status === 1) {
                    // return add_users(users);
                    dispatch(update_recipe_success(true));
                } else {
                    dispatch(update_recipe_failed("Failed to update recipe. Please try again."));
                }
            })
            .catch(err => {
                alert(err);
                console.log(err)});
    }
}

export const update_recipe_inProgress = () => ({
    type: ActionTypes.UPDATE_RECIPE_IN_PROGRESS
});

export const update_recipe_failed = (errMess) => ({
    type: ActionTypes.UPDATE_RECIPE_FAILED,
    payload: errMess
});

export const update_recipe_success = () => ({
    type: ActionTypes.UPDATE_RECIPE_SUCCESS
});

/***** Loading My Grocery List *********/
export const load_myGrocList = (user_id) => (dispatch) => {
    dispatch(load_myGrocList_inProgress(true));
    return fetch(baseUrl + `groclist/getter/${user_id}`)
        .then(resp => resp.json())
        .then(resp => {
            // console.log(JSON.stringify(resp));
            if (resp.length >=0) {
                // return add_users(users);
                dispatch(load_myGrocList_success(resp));
            } else {
                dispatch(load_myGrocList_failed("Error"));
            }
        })
        .catch(err => {
            alert(err);
            console.log(err)});

}

export const load_myGrocList_inProgress = () => ({
    type: ActionTypes.LOAD_GROCERYLIST_IN_PROGRESS
});

export const load_myGrocList_success = (grocList) => ({
    type: ActionTypes.LOAD_GROCERYLIST_SUCCESS,
    payload: grocList
});

export const load_myGrocList_failed = (errMess) => ({
    type: ActionTypes.LOAD_GROCERYLIST_FAILED,
    payload: errMess
})

export const load_myGrocList_reset = () => ({
    type: ActionTypes.LOAD_GROCERYLIST_RESET
})

/***** Creating new Grocery List *********/
export const create_new_GrocList = (user_id, list_id) => (dispatch) => {
    dispatch(load_myGrocList_inProgress(true));

    alert(JSON.stringify({"user_id": user_id, "list_id": list_id}));

    return fetch(baseUrl + `groclist/getter/`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            "user_id": user_id,
            "list_id": list_id,
            "list_name": "Untitled"
            })
        })
        .then(resp => resp.json())
        .then(resp => {
            // console.log(JSON.stringify(resp));
            if (true) {
                // return add_users(users);
                dispatch(load_myGrocList(user_id));
            } else {
                dispatch(load_myGrocList_failed("Error"));
            }
        })
        .catch(err => {
            alert(err);
            console.log(err)});
}

/***** Loading Current Grocery List *********/
export const load_currGrocList = (user_id, grocList_id) => (dispatch) => {
    dispatch(load_currGrocList_inProgress(true));
    return fetch(baseUrl + `groclist/update/${user_id}/${grocList_id}`)
        .then(resp => resp.json())
        .then(resp => {
            // console.log(JSON.stringify(resp));
            if (true) {
                // return add_users(users);
                dispatch(load_currGrocList_success(resp));
            } else {
                dispatch(load_currGrocList_failed("Error"));
            }
        })
        .catch(err => {
            alert(err);
            console.log(err)});
}

export const load_currGrocList_inProgress = () => ({
    type: ActionTypes.LOAD_LIST_IN_PROGRESS
});

export const load_currGrocList_success = (grocList) => ({
    type: ActionTypes.LOAD_LIST_SUCCESS,
    payload: grocList
});

export const load_currGrocList_failed = (errMess) => ({
    type: ActionTypes.LOAD_LIST_FAILED,
    payload: errMess
})

export const load_currGrocList_reset = () => ({
    type: ActionTypes.LOAD_LIST_RESET
})

/***** Loading Current Grocery List *********/


// export const update_currGrocList = ()
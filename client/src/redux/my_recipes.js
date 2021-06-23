import * as ActionTypes from "./ActionTypes";
import {MY_RECIPES} from "../shared/my_recipes";

export const My_recipes = (state = {
        inProgress: "not-loaded",
        errMess: null,
        my_recipes: []
    }, action) => {
        switch(action.type) {
            case ActionTypes.LOAD_MY_RECIPES:
                return {...state, inProgress: "success", my_recipes: action.payload};
            
            case ActionTypes.LOAD_MY_RECIPES_IN_PROGRESS:
                return {...state, inProgress: "loading", errMess: null, my_recipes: []};
            
            case ActionTypes.LOAD_MY_RECIPES_FAILED:
                return {...state, inProgress: "failed", errMess: action.payload};

            case ActionTypes.LOAD_MY_RECIPES_RESET:
                return {...state, inProgress: "not-loaded"};
            default:
                return state;
        }
}

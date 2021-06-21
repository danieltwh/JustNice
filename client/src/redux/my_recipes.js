import * as ActionTypes from "./ActionTypes";
import {MY_RECIPES} from "../shared/my_recipes";

export const My_recipes = (state = {
        inProgress: false,
        errMess: null,
        my_recipes: []
    }, action) => {
        switch(action.type) {
            case ActionTypes.LOAD_MY_RECIPES:
                return {...state, inProgress: false, my_recipes: action.payload};
            
            case ActionTypes.LOAD_MY_RECIPES_IN_PROGRESS:
                return {...state, inProgress: true, errMess: null, my_recipes: []};
            
            case ActionTypes.LOAD_MY_RECIPES_FAILED:
                return {...state, inProgress: false, errMess: action.payload};
        
            default:
                return state;
        }
}

import * as ActionTypes from "./ActionTypes";
import {RECIPES} from "../shared/recipes";

export const Recipes = (state = {
        inProgress: false,
        errMess: null,
        recipes: null
    }, action) => {
        switch(action.type) {
            case ActionTypes.LOAD_RECIPES:
                return {...state, inProgress: false, recipes: action.payload};
            
            case ActionTypes.LOAD_RECIPES_IN_PROGRESS:
                return {...state, inProgress: true, errMess: null, recipes: []};
            
            case ActionTypes.LOAD_RECIPES_FAILED:
                return {...state, inProgress: false, errMess: action.payload};
        
            default:
                return state;
        }
}

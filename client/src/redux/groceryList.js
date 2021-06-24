import * as ActionTypes from "./ActionTypes";
import {RECIPES} from "../shared/recipes";

export const GroceryList = (state = {
        inProgress: false,
        errMess: null,
        grocery: null
    }, action) => {
        switch(action.type) {
            case ActionTypes.LOAD_GROCERYLIST:
                return {...state, inProgress: false, grocery: action.payload};
            
            case ActionTypes.LOAD_GROCERYLIST_IN_PROGRESS:
                return {...state, inProgress: true, errMess: null, grocery: []};
            
            case ActionTypes.LOAD_GROCERYLIST_FAILED:
                return {...state, inProgress: false, errMess: action.payload};
        
            default:
                return state;
        }
}

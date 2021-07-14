import * as ActionTypes from "./ActionTypes";

export const Images = (state = {
    profile : {
        url: "",
        inProgress: "idle",
        errMess: null
    },
    recipe: {
        inProgress: "idle",
        errMess: null,
    },
        
    }, action) => {
        switch(action.type) {
            case ActionTypes.LOAD_PROFILE_IMG_SUCCESS:
                return {...state, profile: {inProgress: "success", recipe: action.payload}};
            
            case ActionTypes.LOAD_PROFILE_IMG_PROGRESS:
                return {...state, profile: {inProgress: "loading", errMess: null, recipe: null}};
            
            case ActionTypes.LOAD_PROFILE_IMG_FAILED:
                return {...state, profile: {inProgress: "failed", errMess: action.payload}};

            case ActionTypes.LOAD_PROFILE_IMG_RESET:
                return {...state, profile: {inProgress: "idle", errMess: null, recipe: null}};

            case ActionTypes.LOAD_RECIPE_IMG_SUCCESS:
                return {...state, recipe: {inProgress: "success", ...action.payload}};
            
            case ActionTypes.LOAD_RECIPE_IMG_PROGRESS:
                return {...state, recipe: {inProgress: "loading", errMess: null, recipe: null}};
            
            case ActionTypes.LOAD_RECIPE_IMG_FAILED:
                return {...state, recipe: {inProgress: "failed", errMess: action.payload}};

            case ActionTypes.LOAD_RECIPE_IMG_RESET:
                return {...state, recipe: {inProgress: "idle", errMess: null}};
            default:
                return state;
        }
}

import * as ActionTypes from "./ActionTypes";

export const Login = (state = {
        inProgress: false,
        user: null,
        errMess: null
    }, action) => {
        switch(action.type) {
            case ActionTypes.ADD_USERS:
                return {...state, inProgress: false, user: action.payload, errMess: null};
                
            case ActionTypes.LOGIN_SUCCESS:
                return {...state, inProgress: false, user: action.payload, errMess: null};
            
            case ActionTypes.LOGIN_IN_PROGRESS:
                return {...state, inProgress: true, user: false, errMess: null};
            
            case ActionTypes.LOGIN_FAILED:
                return {...state, inProgress: false, user: false, errMess: action.payload};

            case ActionTypes.SIGNOUT:
                return {...state, inProgress: false, user: false, errMess: null };
        
            default:
                return state;
        }
}

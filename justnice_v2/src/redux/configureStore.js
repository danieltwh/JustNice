import { createStore, combineReducers,applyMiddleware } from 'redux';
import { createForms } from "react-redux-form";
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import {Login} from "./login";
import {Recipes} from "./recipes";
import {My_recipes} from "./my_recipes";
// import { InitialFeedback } from './forms';


export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            login: Login,
            recipes: Recipes,
            my_recipes: My_recipes
            // ...createForms({
            //     feedback: InitialFeedback
            // })
        }),
        applyMiddleware(thunk, logger)
    );
    
    return store;
};

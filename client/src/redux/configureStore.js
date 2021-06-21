import { createStore, combineReducers,applyMiddleware } from 'redux';
import { createForms } from "react-redux-form";
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import {Login} from "./login";
import {Recipes} from "./recipes";
import {My_recipes} from "./my_recipes";

import { InitialSignForm } from './forms';
import { Curr_recipe } from './curr_recipe';


export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            login: Login,
            recipes: Recipes,
            my_recipes: My_recipes,
            curr_recipe: Curr_recipe,
            ...createForms({
                signupForm: InitialSignForm
            })
        }),
        applyMiddleware(thunk, logger)
    );
    
    return store;
};

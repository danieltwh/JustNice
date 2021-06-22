import React, {Component} from 'react';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from "react-redux";

import {RECIPES} from "../shared/recipes";
import {MY_RECIPES} from "../shared/my_recipes";

// In App Pages
import LoginPage from "./LoginPageComponent";
import Header from "./HeaderComponent";
import ExplorePage from "./ExploreComponent";
import MyRecipePage from './MyRecipeComponent';


import RecipeDetailsPage from './RecipeDetailsComponent';
import RecipeCreationPage from "./RecipeCreationComponent"

import MyGroceryListPage from "./MyGroceryListPageComponent";
import GroceryList from './GroceryListComponent';
import {PrivateRoute} from "./PrivateRoute";

// Public Pages
import PublicHeader from "./PublicHeaderComponent";
import PublicHomePage from './PublicHomePageComponent';
import PublicAboutUsPage from "./PublicAboutUsComponent";
import SignupPage from "./SignupPageComponent";

import {login_attempt, login_success, signout, load_myrecipes, get_recipe} from "../redux/ActionCreators";





const mapStateToProps = state => {
  return {
    login: state.login,
    recipes: state.recipes,
    my_recipes: state.my_recipes,
    curr_recipe: state.curr_recipe
  }
}

const mapDispatchToProps = (dispatch) => ({
  login_attempt: (username, password) => dispatch(login_attempt(username, password)),
  signup_success: (user) => dispatch(login_success(user)),
  signout: () => dispatch(signout()),
  load_myrecipes: (user_id) => {dispatch(load_myrecipes(user_id))},
  get_recipe: (rec_id) => dispatch(get_recipe(rec_id)) 
});


class Main extends Component {

    constructor(props) {
        super(props);

        // this.state = {
        //     recipes: RECIPES,
        //     my_recipes: MY_RECIPES,
        //     token: null
        // }
    }

    componentDidMount() {
      this.props.load_myrecipes(1);
    }

    render() {
      console.log(JSON.stringify(this.props))
      if (this.props.login.user) {
        

        return (
          <div>
            <Header signout={this.props.signout}/>
            <Switch>
              {/* <Route path="/login" component={() => <LoginPage login_attempt={this.props.login_attempt} />} /> */}
            
              <Route path="/explore" component={() => <ExplorePage recipes={this.props.recipes.recipes} />} />

              <Route exact path="/edit/:recipeID" component={({match}) => <RecipeCreationPage rec_id={parseInt(match.params.recipeID, 10)} />} 

              />
              
              <Route exact path="/myrecipes" component={() => <MyRecipePage load_myrecipes={this.props.load_myrecipes} 
                recipes={this.props.my_recipes.my_recipes} />} />
              
              <Route exact path="/myrecipes/:recipeID" component={({match}) => {
                // this.props.get_recipe(parseInt(match.params.recipeID, 10))
                return (
                <RecipeDetailsPage rec_id={(parseInt(match.params.recipeID, 10))} />  
                )}
              }/> 
                
                            
              <Route exact path="/grocerylist" component={() => <MyGroceryListPage groceryLists={MY_RECIPES}/> } />
              <Route exact path="/grocerylist/:groceryListID" component={() => <GroceryList recipes={MY_RECIPES}/> } />
              
              <Redirect to="/explore" />
            </Switch>
          </div>
        );
      } else {
        console.log("Not Login")
        return (
          <div style={{padding:"0"}}>
            <PublicHeader/>
            <Switch>
              <Route path="/login" component={() => <LoginPage login_attempt={this.props.login_attempt} />} />
              <Route path="/home" component={() => <PublicHomePage />} />
              <Route path="/aboutus" component={() => <PublicAboutUsPage />} />
              <Route path="/signup" component={() => <SignupPage signup_success={this.props.signup_success}/>} />
              <Redirect to="/home" />
            </Switch>
          </div>
        )
      }
        
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
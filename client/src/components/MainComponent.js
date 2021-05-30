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
import {PrivateRoute} from "./PrivateRoute";

// Public Pages
import PublicHeader from "./PublicHeaderComponent";
import PublicAboutUsPage from "./PublicAboutUsComponent";
import SignupPage from "./SignupPageComponent";

import {login_attempt, signout} from "../redux/ActionCreators";


const mapStateToProps = state => {
  return {
    login: state.login,
    recipes: state.recipes,
    my_recipes: state.my_recipes
  }
}

const mapDispatchToProps = (dispatch) => ({
  login_attempt: (username, password) => dispatch(login_attempt(username, password)),
  signout: () => dispatch(signout())
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

    render() {
      console.log(JSON.stringify(this.props))
      if (this.props.login.user) {
        return (
          <div>
            <Header signout={this.props.signout}/>
            <Switch>
              {/* <Route path="/login" component={() => <LoginPage login_attempt={this.props.login_attempt} />} /> */}
            
              <Route path="/explore" component={() => <ExplorePage recipes={this.props.recipes.recipes} />} />
              <Route path="/myrecipes" component={() => <MyRecipePage recipes={this.props.my_recipes.my_recipes} />} />
              <Route path="/grocerylist" component={() => <MyRecipePage recipes={this.props.my_recipes.my_recipes}/> } />
              <Redirect to="/explore" />
            </Switch>
      
              <p>
                Edit <code>src/App.js</code> and save to reload.
              </p>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
              </a>
          </div>
        );
      } else {
        console.log("Not Login")
        return (
          <div >
            <PublicHeader/>
            <Switch>
              <Route path="/login" component={() => <LoginPage login_attempt={this.props.login_attempt} />} />
              <Route path="/aboutus" component={() => <PublicAboutUsPage />} />
              <Route path="/signup" component={() => <SignupPage />} />
              <Redirect to="/login" />
            </Switch>
          </div>
        )
      }
        
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
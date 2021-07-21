import React, {Component} from  'react';
import {Card, CardImg, CardTitle} from 'reactstrap';
import { Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import {withRouter} from 'react-router-dom';
import {connect} from "react-redux";

import { load_myrecipes, load_myrecipes_reset } from "../redux/ActionCreators"; 

import { baseUrl } from "../shared/baseUrl";


const mapStateToProps = state => {
    return {
      login: state.login,
      my_recipes: state.my_recipes
    }
  }
  
  const mapDispatchToProps = (dispatch) => ({
    load_myrecipes: (user_id) => {dispatch(load_myrecipes(user_id))},
    load_myrecipes_reset: () => {dispatch(load_myrecipes_reset())}
  });

class MyRecipePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOptionsOpen: false,
        };
        this.optionsMenu = React.createRef();
        this.toggleOptions = this.toggleOptions.bind(this);
        this.openOptions = this.openOptions.bind(this);
        this.closeOptions = this.closeOptions.bind(this);
        this.addDefaultSrc = this.addDefaultSrc.bind(this);
    }

    componentDidMount() {
        if (this.props.my_recipes.inProgress === "not-loaded") {
            console.log(this.props.my_recipes.inProgress);
            this.props.load_myrecipes(this.props.login.user.id);
        }   
    }

    componentWillUnmount() {

        if (this.props.my_recipes.inProgress === "success" && this.props.my_recipes.my_recipes.length >= 1 ) {
            console.log(this.props.my_recipes.inProgress);
            this.props.load_myrecipes_reset();
        }  
    }
    
    toggleOptions(event) {
        if (!this.state.isOptionsOpen) {
            this.openOptions(event);
        } else {
            this.closeOptions(event);
        }
    }

    openOptions(event) {
        event.preventDefault();
        event.stopPropagation();
        // console.log("open Options")
        this.setState({isOptionsOpen: true}, () => {
            document.addEventListener("click", this.closeOptions);
        });
    }

    closeOptions(event) {
        event.stopPropagation();
        // console.log(document.getElementById("grocery-list-options").contains(event.target));
        if (this.optionsMenu!==event.target && !this.optionsMenu.contains(event.target)) {
            // console.log("close Options")
            // console.log(this.optionsMenu)
            this.setState({isOptionsOpen: false}, () => {
            document.removeEventListener("click", this.closeOptions);
            });
        }
    }

    renderOptions() {
        return (
            <>
                <div className="grocery-list-options-button" id="grocery-list-options-button">
                    <Link to="/newrecipe">
                        <Fab color="primary" aria-label="add">
                            <AddIcon />
                        </Fab>
                    </Link>
                </div>
            </>            

        )
    }

    addDefaultSrc(event) {
        event.target.src = "/assets/recipe-1.jpeg";
        event.target.onerror = null;
    }

    getCurrentDate(separator = '') {

        var newDate = new Date()
        var date = newDate.getDate();
        var month = newDate.getMonth() + 1;
        var year = newDate.getFullYear();
        var h = newDate.getHours();
        var m = newDate.getMinutes();
        var s = newDate.getSeconds();

        return `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date}${separator}${h}${separator}${m}${separator}${s}`
    }

    renderRecipes(recipes) {
        const recipesTiles = recipes.map(recipe => {
            return (
                
                <div key={recipe.rec_id} className="col-6 col-sm-4 col-lg-3 col-xl-2">
                
                    <Card className="recipe-tile">
                        <Link to={`/myrecipes/${parseInt(recipe.rec_id, 10)}`} style={{textDecoration: "none", color: "inherit"}}>
                            <CardImg className="recipe-tile-img" src={`${baseUrl}${recipe.url}?${this.getCurrentDate()}`} 
                            onError={e => this.addDefaultSrc(e)} 
                             />
                            <CardTitle>{recipe.rec_name}</CardTitle>
                        </Link>
                        
                        
                        <div>
                            <Link to={`/edit/${parseInt(recipe.rec_id, 10)}`} style={{textDecoration: "none", color: "inherit"}}>
                                <button type="button" className="btn btn-outline-info pull-right"><FontAwesomeIcon icon="edit" size="sm"/></button>
                            </Link>
                        </div>
                    </Card>
                
                
                </div>
                
            )
        });
        
        return recipesTiles;
    }

    render() {
        return (
            <>
                <div className="container-fluid">
                    <div className="row">
                        {this.renderRecipes(this.props.my_recipes.my_recipes)}
                    </div>
                </div>
                {this.renderOptions()}
            </>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyRecipePage));
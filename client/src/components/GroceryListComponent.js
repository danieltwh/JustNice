import React, {Component} from  'react';
import {Card, CardImg, CardTitle} from 'reactstrap';
import { Col, Row, Form, FormGroup, Label, Input } from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {withRouter} from 'react-router-dom';
import {connect} from "react-redux";

import AddRecipe from './AddRecipeComponent';

import { load_myrecipes, load_myrecipes_reset } from "../redux/ActionCreators";
import Add from '@material-ui/icons/Add';


function IngredientItem(props) {
    return (
        <div key={props.id} className="row ingredient-item">
                <input key={props.id} type="checkbox" name={props.name} id={props.name} className="col-2 ingredient-item-checkbox" />
                <label htmlFor={props.name} className="col-7 ingredient-item-description strikethrough">{props.name}<br/>800g</label>
        </div>

        // <label  for={props.name} className="row ingredient-item">
        //         <input type="checkbox" name={props.name} className="col-2 ingredient-item-checkbox" />
        //         <span className="col-7 ingredient-item-description">{props.name}<br/>800g</span>
        // </label>

        
    );
}

const IngredientCategory = (props) => {
    const ingredientItems = props.ingredients.map((ingredient) => <IngredientItem key={ingredient.id} id={ingredient.id} name={ingredient.name} />)

    return (
        <div className="col-12 col-md-4 ingredient-category">
        <div className=" "></div>
            <h4 className="ingredient-category-title">{props.category}</h4>
            {ingredientItems}
        </div>
    )
}

const mapStateToProps = state => {
    return {
      login: state.login,
      my_recipes: state.my_recipes,
      grocery: state.grocery
    }
  }
  
const mapDispatchToProps = (dispatch) => ({
    load_myrecipes: (user_id) => {dispatch(load_myrecipes(user_id))},
    load_myrecipes_reset: () => {dispatch(load_myrecipes_reset())}
});

class GroceryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false
        }

        this.toggleEdit = this.toggleEdit.bind(this);
        this.whenEditOpen = this.whenEditOpen.bind(this);
        this.whenEditClose = this.whenEditClose.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState){
        if (this.state.isEdit && nextProps.grocery === this.props.grocery ) {
            // If the modal is open and grocery list is the same,
            // we do not update
            return false;
        } else {
            //  Otherwise, we proceed to update
            return true;
        }
    }

    toggleEdit(event) {
        event.preventDefault();
        this.setState({isEdit: !this.state.isEdit});
        // console.log(JSON.stringify(this.state.isEdit));
        if (this.state.isEdit) {
            this.whenEditClose();
        } else {
            this.whenEditOpen();
        }
    }

    whenEditOpen() {
        if (this.props.my_recipes.inProgress === "not-loaded") {
            console.log(this.props.my_recipes.inProgress);
            // this.props.load_myrecipes(1);
        }   
    }

    whenEditClose() {
        if (this.props.my_recipes.inProgress === "success" && this.props.my_recipes.my_recipes.length >= 1 ) {
            console.log(this.props.my_recipes.inProgress);
            this.props.load_myrecipes_reset();
        }  
    }

    


    

    render() {
        const groceryListRecipes = this.props.recipes.filter(recipe => recipe.id===1)[0];
        console.log(JSON.stringify(this.state.isEdit));

        return (
            <>
            <form>
                <div className="container-fluid grocery-list-table">
                    <div className="row">
                        
                        <IngredientCategory category="Vegetables" ingredients={groceryListRecipes.ingredients} />
                        <IngredientCategory category="Meat" ingredients={groceryListRecipes.ingredients} />
                        <IngredientCategory category="Diary" ingredients={groceryListRecipes.ingredients} />
                        <IngredientCategory category="Bread and Cereal" ingredients={groceryListRecipes.ingredients} />
                        <IngredientCategory category="Bread and Cereal" ingredients={groceryListRecipes.ingredients} />
                    </div>

                    
                </div>
            </form>

            <div style={{position: "relative", width: "100%", height: "100px"}}>
                <div className="edit-reset-button">
                    <button className="edit-button btn btn-info" onClick={this.toggleEdit}><span>Edit</span></button>
                    <button className="reset-button btn btn-danger"><span>Reset</span></button>
                </div>
            </div>

            <AddRecipe isEdit={this.state.isEdit} toggleEdit={this.toggleEdit} /> 

            

            </>
            
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GroceryList));
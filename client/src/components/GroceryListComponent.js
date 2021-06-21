import React, {Component} from  'react';
import {Card, CardImg, CardTitle} from 'reactstrap';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';


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

class GroceryList extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const groceryListRecipes = this.props.recipes.filter(recipe => recipe.id===1)[0];

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
                    <button className="edit-button"><span>Edit</span></button>
                    <button className="reset-button"><span>Reset</span></button>
                </div>
            </div>

            </>
            
        )
    }
}

export default GroceryList;
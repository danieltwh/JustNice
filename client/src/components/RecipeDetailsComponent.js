import React, {Component} from 'react';
import { Row } from 'reactstrap';
import {Link} from "react-router-dom";
import {Card, CardImg, CardTitle} from 'reactstrap';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter, Label, Col} from 'reactstrap';
import {LocalForm, Control, Errors} from 'react-redux-form'


class RecipeDetailsPage extends Component {
    constructor(props) {
        super(props);

    }

    renderTitle() {
        const recipeTiles = (
                <div key={this.props.recipe.id} className="row">
                    <img className="recipe-tile-img col-6" src={this.props.recipe.img} alt={this.props.recipe.name} />
                    <div className="col-6">
                        <h3 >{this.props.recipe.name}</h3>
                    </div>
                </div>
        )
        
        return recipeTiles;
    }

    renderIngredients() {
        const mapIngredientToList = (ingredient) => {
            return (
                <li>
                    {ingredient}
                </li>
            )
        }

        const ingredients = this.props.recipe.ingredients.map(mapIngredientToList)

        return (
            <div>
                <h4>Ingredients</h4>
                <ol>
                    {ingredients}
                </ol>
            </div>
        );
    }

    renderSteps() {
        // const mapStepToList = (step) => {
        //     return (
        //         <li>
        //             {step}
        //         </li>
        //     )
        // }

        const steps = this.props.recipe.steps
        return (
            <p style={{"white-space": "pre-line"}}>
                {steps}
            </p>)
    }

    render() {
        return (
            <div className="container-fluid">

                <div className="row">
                    <div className="col-12 col-md-6">
                        {this.renderTitle()}

                        {this.renderIngredients()}
                    </div>

                    <div className="col-12 col-md-6">
                        <div><h4>Recipe</h4></div>
                        {this.renderSteps()}
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default RecipeDetailsPage;
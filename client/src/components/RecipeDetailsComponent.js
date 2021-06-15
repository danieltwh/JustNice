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
                <div key={this.props.recipe.id} className="recipe-details-title">
                    <div className="row">
                        <img className="recipe-tile-img col-6" src={this.props.recipe.img} alt={this.props.recipe.name} />
                        <div className="col-6" style={{display:"flex",alignItems:"center", flexWrap:"wrap"}}>
                            <div>
                                <h3 style={{verticalAlign:"middle", margin:"0"}}>{this.props.recipe.name}</h3>
                            </div>
                            
                        </div>
                    </div>
                    
                </div>
        )
        
        return recipeTiles;
    }

    renderIngredients() {
        const mapIngredientToList = (ingredient) => {
            return (
                <li>
                    {`${ingredient.name} ${ingredient.quantity}${ingredient.unit}`}
                </li>
            )
        }

        const ingredients = this.props.recipe.ingredients.map(mapIngredientToList)

        return (
            <div className="recipe-details-ingredient-box">
                
                <div className="recipe-details-ingredient-title">
                    <h4 style={{verticalAlign:"middle", margin:"0"}}>Ingredients</h4>
                </div>
                <div className="recipe-details-ingredient">
                    <ol>
                        {ingredients}
                    </ol>
                </div>
                
                
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
            <div className="recipe-details-steps">
                <p style={{"white-space": "pre-line"}}>
                    {steps}
                </p>
            </div>
        )   
    }

    render() {
        return (
            <div className="container-fluid">

                <div className="row">
                    <div className="col-12 col-md-6 recipe-details-left-box">
                        {this.renderTitle()}

                        {this.renderIngredients()}
                    </div>

                    <div className="col-12 col-md-6 recipe-details-steps-box">
                        <div>
                            <div className="recipe-details-steps-title">
                                <h4 style={{verticalAlign:"middle", margin:"0"}}>Recipe</h4>
                            </div>
                            {this.renderSteps()}
                        </div>
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default RecipeDetailsPage;
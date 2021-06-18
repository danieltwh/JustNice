import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Card, CardImg, CardTitle} from 'reactstrap';
import { Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';
import { Col, Row, Navbar, NavbarBrand, Button, Form, FormGroup, FormFeedback, FormText, Label, Input } from 'reactstrap';
import {LocalForm, Control, Errors} from 'react-redux-form'

import RecipeIngredients from "./RecipeCreationgIngredientComponent"


class RecipeCreationPage extends Component {
    constructor(props) {
        super(props);
        if (this.props.recipe != null) {
            this.state= {
                "name": this.props.recipe.name,
                "author": this.props.recipe.author,
                "img": this.props.recipe.img,
                "rating": this.props.recipe.rating,
                "ingredients": this.props.recipe.ingredients.map(ingredient => ({
                    ...ingredient, "isValid": "valid"
                })),
                "steps": this.props.recipe.steps
            }
        } else {
            this.state= {
                "name": "",
                "author": "",
                "img": "",
                "rating": "",
                "ingredients": "",
                "steps": ""
            }
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.trackContent = this.trackContent.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleIngredient = this.handleIngredient.bind(this);
    }

    componentDidMount() {
        if (this.textArea) {
            this.trackContent(this.textArea)
        }
        if (this.recipeName) {
            this.trackContent(this.recipeName)
        }
    }

    handleIngredient(newIngredients) {
        this.setState({
            "ingredients": newIngredients
        })
    }

    handleChange(event) {
        const { target } = event;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const { name } = target;

        this.setState({
            [name]: value,
        });
    }

    handleSubmit() {
        console.log(JSON.stringify(this.state))
        alert(JSON.stringify(this.state))
    }

    renderTitle() {
        const recipeTiles = (
                <div key={this.props.recipe.id} className="recipe-details-title">
                    <div className="row">
                        <img className="recipe-tile-img col-6" src={this.props.recipe.img} alt={this.props.recipe.name} />
                        <div className="col-6" style={{display:"flex",alignItems:"center", flexWrap:"wrap"}}>
                            <FormGroup className="recipe-creation-name-box">
                                <textarea name="name" placeholder="Recipe Name" className="form-control recipe-creation-name"
                                    value={this.state.name}
                                    ref={el => this.recipeName = el}
                                    onChange={e => {
                                        this.trackContent(this.recipeName)
                                        this.handleChange(e)}}
                                />
                            </FormGroup>
                            
                        </div>
                    </div>
                    
                </div>
        )
        
        return recipeTiles;
    }

    trackContent(element) {
        
        element.style.height = 'auto';
        element.style.height = element.scrollHeight + 'px';
    }

    renderSteps() {
        return (
            <FormGroup >
                <div className="recipe-details-steps"> 
                    <textarea name="steps" placeholder="Steps" className="form-control"
                        // rows={rows}
                        ref={el => {this.textArea = el}}
                        value={this.state.steps}
                        onChange={e => {
                            this.trackContent(this.textArea)
                            this.handleChange(e)}}
                    ></textarea>
                </div>
            </FormGroup>
        )   
    }

    isDisabled() {
        return this.state.ingredients.some(ingredient => ingredient.isValid === "required")
    }

    render() {

        console.log(JSON.stringify(this.state))
        return (
            <Form className="edit-form" onSubmit={this.handleSubmit}>

            
                <div className="container-fluid">

                    <div className="row">
                        <div className="col-12 col-md-6 recipe-details-left-box">
                            {this.renderTitle()}

                            {/* {this.renderIngredients()} */}
                            <RecipeIngredients ingredients={this.state.ingredients} 
                                handleIngredient= {this.handleIngredient}
                            />
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
                    <div className="row" style={{position: "relative", width: "100%", height: "100px"}}>
                        <div className="confirm-cancel-button">
                            <button type="submit" className="confirm-button btn btn-success"
                                disabled= {this.isDisabled()}
                            >Confirm</button>
                            <Link to="/myrecipes">
                                <button type="button" className="cancel-button btn btn-danger" >Cancel</button>
                            </Link>
                            
                        </div>
                        
                    </div>
                </div>
                

                
            </Form>
        )
    }
}

export default RecipeCreationPage;
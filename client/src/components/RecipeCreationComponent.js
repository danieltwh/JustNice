import React, {Component} from 'react';
import {Link, Redirect} from "react-router-dom";
import {Card, CardImg, CardTitle} from 'reactstrap';
import { Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';
import { Col, Row, Navbar, NavbarBrand, Button, Form, FormGroup, FormFeedback, FormText, Label, Input } from 'reactstrap';
import {LocalForm, Control, Errors} from 'react-redux-form'
import { withRouter } from 'react-router';
import { connect } from "react-redux";

import { get_recipe, get_recipe_reset, update_recipe } from '../redux/ActionCreators';

import RecipeIngredients from "./RecipeCreationgIngredientComponent";
import Loading from "./LoadingComponent";

const mapStateToProps = state => {
    return {
      curr_recipe: state.curr_recipe
    }
  }
  
const mapDispatchToProps = (dispatch) => ({
    get_recipe: (rec_id) => dispatch(get_recipe(rec_id)),
    update_recipe: (recipe) => dispatch(update_recipe(recipe)),
    get_recipe_reset: () => dispatch(get_recipe_reset())
});


class RecipeCreationPage extends Component {
    constructor(props) {
        super(props);
        if (this.props.rec_id !== "new" && this.props.curr_recipe.inProgress === "success") {
            this.state= {
                "rec_id": this.props.curr_recipe.recipe.rec_id,
                "rec_name": this.props.curr_recipe.recipe.rec_name,
                "rec_instructions": this.props.curr_recipe.recipe.rec_instructions,
                "cooking_time": this.props.curr_recipe.recipe.cooking_time,
                "serving_pax": this.props.curr_recipe.recipe.serving_pax,
                "cuisine": this.props.curr_recipe.recipe.cuisine,
                "rec_type": this.props.curr_recipe.recipe.rec_type,
                "isPublished": this.props.curr_recipe.recipe.isPublished,
                "ingredient": this.props.curr_recipe.recipe.ingredient.map(ingredient => ({
                    ...ingredient, "isValid": "valid"
                })),
            }
        } else {
            this.state= {
                "rec_id": "new",
                "rec_name": "",
                "rec_instructions": "",
                "cooking_time": "",
                "serving_pax": "",
                "cuisine": "",
                "rec_type": "",
                "isPublished": "",
                "ingredient": []
            }
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.trackContent = this.trackContent.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleIngredient = this.handleIngredient.bind(this);
    }

    componentDidMount() {
        if (this.props.rec_id !== "new" && this.props.curr_recipe.inProgress === "idle") {
            this.props.get_recipe(this.props.rec_id);
        }

        if (this.textArea) {
            this.trackContent(this.textArea)
        }
        if (this.recipeName) {
            this.trackContent(this.recipeName)
        }
    }

    handleIngredient(newIngredients) {
        this.setState({
            "ingredient": newIngredients
        })
    }

    componentWillUnmount() {
        if (this.props.curr_recipe.inProgress === "success") {
            this.props.get_recipe_reset()
        }
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

        this.update_recipe(this.state)
    }

    renderTitle() {
        const recipeTiles = (
                <div key={this.state.rec_id} className="recipe-details-title">
                    <div className="row">
                        <img className="recipe-tile-img col-6" src={this.state.img} alt={this.state.rec_name} />
                        <div className="col-6" style={{display:"flex",alignItems:"center", flexWrap:"wrap"}}>
                            <FormGroup className="recipe-creation-name-box">
                                <textarea name="name" placeholder="Recipe Name" className="form-control recipe-creation-name"
                                    value={this.state.rec_name}
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
                        value={this.state.rec_instructions}
                        onChange={e => {
                            this.trackContent(this.textArea)
                            this.handleChange(e)}}
                    ></textarea>
                </div>
            </FormGroup>
        )   
    }

    isDisabled() {
        return this.state.ingredient.some(ingredient => ingredient.isValid === "required")
    }

    render() {

        console.log(JSON.stringify(this.state))

        if (this.props.curr_recipe.inProgress === "success" || this.state.rec_id === "new") {
            return (
                <Form className="edit-form" onSubmit={this.handleSubmit}>
    
                
                    <div className="container-fluid">
    
                        <div className="row">
                            <div className="col-12 col-md-6 recipe-details-left-box">
                                {this.renderTitle()}
    
                                {/* {this.renderIngredients()} */}
                                <RecipeIngredients ingredients={this.state.ingredient} 
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
        } else if(this.props.curr_recipe.inProgress === "update_success") {
            return (<Redirect to="/myrecipe" />)
        } else {
            return (
                <Loading />
            )
        }
        
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RecipeCreationPage));
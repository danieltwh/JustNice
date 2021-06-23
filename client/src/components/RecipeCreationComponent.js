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
        if (this.props.rec_id !== "new" && this.props.curr_recipe.recipe !== null && (this.props.curr_recipe.inProgress === "success" || this.props.curr_recipe.inProgress==="updating")) {
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
                "cooking_time": 60,
                "serving_pax": 1,
                "cuisine": "global",
                "rec_type": "edible",
                "isPublished": true,
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

        if (this.rec_instructions) {
            this.trackContent(this.rec_instructions)
        }
        if (this.rec_name) {
            this.trackContent(this.rec_name)
        }
    }

    handleIngredient(newIngredients) {
        this.setState({
            "ingredient": newIngredients
        })
    }

    componentWillUnmount() {
        if (this.props.curr_recipe.inProgress === "success" || this.props.curr_recipe.inProgress === "update_success") {
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

    handleSubmit(event) {
        event.preventDefault();

        // console.log(JSON.stringify(this.state))
        // alert(JSON.stringify(this.state))

        // var newRecipe = this.state;
        
        // var ingredients = {};
        // var count = -1;
        // newRecipe.ingredient.map(curr => {
        //     if (curr.isValid === "valid")  {
        //         ingredients[`${curr.ingred_id}`] = curr.ingred_quantity;
        //         return curr;
        //     } else {
        //         ingredients[`${count}`] = {
        //             "ingred_name": curr.ingred_name,
        //             "ingred_unit": curr.ingred_unit,
        //             "ingred_quantity": curr.ingred_quantity
        //         };
        //         count--;
        //         return curr;
        //     }
        // })

        // var bodyToSend = {
        //     "rec_id": newRecipe.rec_id,
        //     "rec_name": newRecipe.rec_name,
        //     "rec_instructions": newRecipe.rec_instructions,
        //     "cooking_time": newRecipe.cooking_time,
        //     "serving_pax": newRecipe.serving_pax,
        //     "cuisine": newRecipe.cuisine,
        //     "rec_type": newRecipe.rec_type,
        //     "isPublished": newRecipe.isPublished,
        //     "user_id": 1,
        //     "ingredients": ingredients
        //     }
        
        // console.log(Object.keys(bodyToSend.ingredients));
        // console.log(JSON.stringify(bodyToSend.ingredients));
        // console.log(JSON.stringify(bodyToSend));
        // alert(bodyToSend);
        
    
        // return fetch("https://hiredone.pythonanywhere.com/" + "recingred/recipe/", {
        //     method: "POST",
        //     headers: {"Content-Type": "application/json"},
        //     body: JSON.stringify(bodyToSend)
        //     })
        //     .then(resp => resp.json())
        //     .then(resp => {
        //         console.log(JSON.stringify(resp));
        //         alert(JSON.stringify(resp));
        //         return resp;
        //     })
        //     .catch(err => {
        //         console.log(err)
        //         alert(err);
        //         });

        this.props.update_recipe(this.state);
    }

    renderTitle() {
        const recipeTiles = (
                <div key={this.state.rec_id} className="recipe-details-title">
                    <div className="row">
                        <img className="recipe-tile-img col-6" src={this.state.img} alt={this.state.rec_name} />
                        <div className="col-6" style={{display:"flex",alignItems:"center", flexWrap:"wrap"}}>
                            <FormGroup className="recipe-creation-name-box">
                                <textarea name="rec_name" placeholder="Recipe Name" className="form-control recipe-creation-name"
                                    value={this.state.rec_name}
                                    ref={el => this.rec_name = el}
                                    onChange={e => {
                                        this.trackContent(this.rec_name)
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
                    <textarea name="rec_instructions" placeholder="Steps" className="form-control"
                        // rows={rows}
                        ref={el => {this.rec_instructions = el}}
                        value={this.state.rec_instructions}
                        onChange={e => {
                            this.trackContent(this.rec_instructions)
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
        // return (
        //     <Loading />
        // );

        console.log(JSON.stringify(this.state))
        console.log(JSON.stringify(this.props.curr_recipe.inProgress))

        if (this.props.curr_recipe.inProgress === "success" || (this.props.curr_recipe.inProgress === "failed" && this.state.rec_id === "new")) {
            return (
                <Form className="edit-form" onSubmit={event => this.handleSubmit(event)}>
    
                
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
            return (<Redirect to="/myrecipes" />)
        } else {
            return (
                <Loading />
            )
        }
        
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RecipeCreationPage));
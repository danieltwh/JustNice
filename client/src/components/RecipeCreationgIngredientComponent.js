import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Card, CardImg, CardTitle} from 'reactstrap';
import { Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';
import { Col, Row, Navbar, NavbarBrand, Button, Form, FormGroup, FormFeedback, FormText, Label, Input } from 'reactstrap';
import {LocalForm, Control, Errors} from 'react-redux-form'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



class RecipeIngredients extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: this.props.ingredients,
            unknown_ingredients: 0
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.trackContent = this.trackContent.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOnDragEnd = this.handleOnDragEnd.bind(this);
    }

    componentDidMount() {
        if (this.textArea) {
            this.trackContent(this.textArea)
        }
        if (this.recipeName) {
            this.trackContent(this.recipeName)
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
    }

    trackContent(element) {
        
        element.style.height = 'auto';
        element.style.height = element.scrollHeight + 'px';
    }

    handleOnDragEnd(result) {
        if (!result.destination) {
            return;
        }
        const items = Array.from(this.state.ingredients);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        this.setState({
            ingredients: items
        })
        this.props.handleIngredient(items);
    }

    handleIngredientNameChange(id, name, isValid, newValue) {
        var newList  = this.state.ingredients.map(ingredient => {
            if (ingredient.id === id) {
                var validity;
                if (isValid === "invalid" && newValue !== "") {
                    validity = "invalid";
                } else if (newValue === "") {
                    validity = "required"
                } else {
                    validity = "no-action"
                }
                return ({...ingredient, "name": newValue, isValid: validity});
            } else {
                return (ingredient);
            }
        });

        this.setState({
            ingredients: newList
        });
        this.props.handleIngredient(newList);
    }

    handleIngredientQuantityChange(id, name, isValid, newValue) {
        var newList  = this.state.ingredients.map(ingredient => {
            if (ingredient.id === id) {
                var validity;
                if (name === "") {
                    validity = "required"
                } else {
                    validity = isValid
                }
                return ({...ingredient, "quantity": newValue, isValid: validity});
            } else {
                return (ingredient);
            }
        });

        this.setState({
            ingredients: newList
        });
        this.props.handleIngredient(newList);
    }

    addNewIngredient() {
        var newList = this.state.ingredients;

        var newIngredient = {
            id: `Uncat${this.state.unknown_ingredients}`,
            name: "",
            category: "",
            quantity: "",
            unit: "ml",
            isValid: "init"
        }

        newList.push(newIngredient);

        this.setState({
            unknown_ingredients: this.state.unknown_ingredients + 1,
            ingredients: newList
        });

        this.props.handleIngredient(newList);
    }
    

    handleDeleteIngredient(id, name) {
        var newList;
        if (id !== null) {
            newList = this.state.ingredients.filter((ingredient) => ingredient.id !== id)
        } else {
            newList = this.state.ingredients.filter((ingredient) => ingredient.name !== name)
        }

        this.setState({
            ingredients: newList
        });
        this.props.handleIngredient(newList);
    }

    renderIngredients() {
        const ingredients = this.state.ingredients.map(({id, name, category, quantity, unit, isValid}, index) => {
            // var drag_id
            // if (id !== null && name !== null) {
            //     drag_id = `${id}`
            // } else {
            //     drag_id = `Uncat${count}`
            //     count = count + 1;
            // } 

            return (
                <Draggable key={JSON.stringify(id)} draggableId={JSON.stringify(id)} index={index} handle=".handle">
                    {(provided) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} className="container-fluid ingredient-input"
                            // style={{paddingLeft:"0px"}}
                        >
                            <div className="form-row">
                                <div className="col-1">
                                    
                                    <button type="button" className="delete-ingredient"
                                        onClick={() => {
                                            this.handleDeleteIngredient(id, name);
                                        }}
                                    >
                                        <FontAwesomeIcon icon="minus-square" pull="left" className="delete-ingredient-icon"/>
                                    </button>
                                    
                                    
                                </div>

                                <div className="col-10">
                                    <div className="form-row">
                                        <div className="col-8 ingredient-name-input">
                                            <Input type="text" className="form-control" value={name}
                                                onChange= {(event) => this.handleIngredientNameChange(id, name, isValid, event.target.value)}
                                                onBlur= {(event) => {this.validateIngredient(id, event)}}
                                                valid= {isValid == "valid"}
                                                invalid={isValid !== "valid" && isValid !== "init" && isValid !=="no-action"}
                                            />
                                            {(() => {
                                                if (isValid == "init" ) {

                                                } else if (isValid == "required") {
                                                    return (<FormFeedback>Required</FormFeedback>);
                                                } else {
                                                    return (<FormFeedback>Ingredient not found and will be <strong>uncategorised</strong></FormFeedback>);
                                                } 
                                            })()}
                                        </div>
                                        
                                        
                                        
                                        <div className="col-4">
                                            <div className="form-row" >
                                                <input type="text" className="form-control col-md-8 col-7" value={quantity}
                                                     onChange= {(event) => this.handleIngredientQuantityChange(id, name, isValid, event.target.value)}
                                                >
                                                   
                                                </input>
                                                <div className="input-group-text col-md-4 col-5 ingredient-unit" >
                                                    <span >{unit}</span>
                                                </div>
                                                
                                            </div>
                                            
                                        </div>
                                        
                                        {/* <img src="/assets/recipe-3.jpeg" width="20px" height="20px"/> */}
                                    </div>
                                </div>

                                <div className="handle input-group-append col-1" {...provided.dragHandleProps}>
                                    <span className="input-group-text ingredient-handle">
                                        <FontAwesomeIcon icon="grip-vertical" />
                                    </span>
                                </div>

                            </div>
                        </div>
                    )}
                </Draggable>
            )}
        )

        return (
            <>
                {ingredients}  
            </>
            
        );
    }

    validateIngredient(id, event) {
        const {target} = event;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const {name} = target;

        if (value !== "") {

            // alert(JSON.stringify({name: value}));
            var newList  = this.state.ingredients.map(ingredient => {
                if (ingredient.id === id) {
                    
                    return ({...ingredient, "name": value, isValid: "invalid"});
                } else {
                    return (ingredient);
                }
            });

            this.setState({
                ingredients: newList
            });
            this.props.handleIngredient(newList);
        } else {

        }
    }
    

    render() {

        console.log(JSON.stringify(this.state.ingredients))
        return (
            <div className="recipe-details-ingredient-box">
                
                <div className="recipe-details-ingredient-title">
                    <h4 style={{verticalAlign:"middle", margin:"0"}}>Ingredients</h4>
                </div>
                <div className="recipe-creation-ingredient">
            
                    <DragDropContext onDragEnd={this.handleOnDragEnd}>
                        <Droppable droppableId="ingredients">
                            {(provided) => (
                                <div className="ingredients" {...provided.droppableProps} ref={provided.innerRef}
                                    // style={{paddingLeft:"25px"}}
                                >
                                    {this.renderIngredients()}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                        
                    </DragDropContext>

                    <div className="container-fluid ingredient-input">
                        <div className="row">
                            <div className="col-1 offset-10" >
                                <button type="button" className="add-ingredient-button"
                                    onClick = {() => this.addNewIngredient()}
                                    
                                >
                                    <FontAwesomeIcon icon="plus-square" size="2x"/>
                                </button>
                            </div>

                        </div>
                    </div>
                    
                </div>
                
                
            </div>
            
            
        )
    }
}

export default RecipeIngredients;
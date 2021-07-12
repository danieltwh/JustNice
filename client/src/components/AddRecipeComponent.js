import React, {Component} from  'react';
import {Card, CardImg, CardTitle} from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import {withRouter} from 'react-router-dom';
import {connect} from "react-redux";

import { load_myrecipes, load_myrecipes_reset, load_currGrocList } from "../redux/ActionCreators"; 
import { baseUrl } from '../shared/baseUrl';


const mapStateToProps = state => {
    return {
      login: state.login,
      my_recipes: state.my_recipes,
      curr_grocList: state.curr_grocList
    }
  }
  
  const mapDispatchToProps = (dispatch) => ({
    load_myrecipes: (user_id) => {dispatch(load_myrecipes(user_id))},
    load_myrecipes_reset: () => {dispatch(load_myrecipes_reset())},
    load_currGrocList: (user_id, groc_id) => {dispatch(load_currGrocList(user_id, groc_id))}
  });

class AddRecipe extends Component {
    constructor(props) {
        super(props);

        this.state = {
            groceryListName: this.props.curr_grocList.grocery.list_name,
            grocery_id: this.props.groc_id,
            toAdd: {}
        };
        this.addDefaultSrc = this.addDefaultSrc.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeRecipeQuantity = this.handleChangeRecipeQuantity.bind(this);
    }

    componentDidMount() {
        if (this.props.my_recipes.inProgress === "not-loaded") {
            console.log(this.props.my_recipes.inProgress);
            this.props.load_myrecipes(this.props.login.user.id);
        }   
    }

    // componentWillUnmount() {

    //     if (this.props.my_recipes.inProgress === "success" && this.props.my_recipes.my_recipes.length >= 1 ) {
    //         console.log(this.props.my_recipes.inProgress);
    //         this.props.load_myrecipes_reset();
    //     }  
    // }
    

    addDefaultSrc(event) {
        event.target.src = "/assets/recipe-1.jpeg";
        event.target.onerror = null;
    }
    

    renderRecipes(recipes) {
        const recipesTiles = recipes.map(recipe => {
            return (
                <div key={recipe.rec_id} className="col-6 col-sm-4 col-lg-3 col-xl-2">
                    <Card className="recipe-tile">
                        <CardImg className="recipe-tile-img" src={recipe.img} onError={e => this.addDefaultSrc(e)} 
                        style={{"backgroundImage": "url('/assets/recipe-1.jpeg')", backgroundRepeat:"no-repeat",   objectFit: "contain"}} 
                            width="100px" height="100px"
                        />
                        <CardTitle>{recipe.rec_name}</CardTitle>
                        <div className="container">
                            <div className="form-row">
                                <button type="button" className="col-3" onClick={() => this.handleButton(recipe.rec_id, -1)} >-</button>
                                <input value={this.getRecipeValue(recipe.rec_id)}  name={recipe.rec_id} className="col-6" style={{textAlign:"center"}} 
                                    onChange={e => this.handleChangeRecipeQuantity(e.target.name, parseInt(e.target.value, 10))}
                                ></input>
                                <button type="button" className="col-3" onClick={() => this.handleButton(recipe.rec_id, 1)}>+</button>
                            </div> 
                            
                        </div>
                        
                        
                    </Card>
                </div>
            )
        });
        return recipesTiles;
    }

    getRecipeValue(name) {
        if (name in this.state.toAdd) {
            return (this.state.toAdd[name]);
        } else {
            return ("");
        }
    }

    handleChangeRecipeQuantity(name, newVal) {
        // const target = event.target;
        // const name = target.name;
        // const newVal = target.type === 'checkbox' ? target.checked : target.value;
        
        if (newVal > 0) {
            var newToAdd = {...this.state.toAdd};
            newToAdd[name] = newVal;
            this.setState({toAdd: newToAdd});
        } else {
            var newToAdd = {...this.state.toAdd};
            if (name in newToAdd) {
                delete newToAdd[name];
            }
            this.setState({toAdd: newToAdd});
        }
    }

    handleButton(name, incr) {
        var newToAdd = {...this.state.toAdd};
        if (!(name in newToAdd)) {
            newToAdd[name] = 0;
        }
        newToAdd[name] = newToAdd[name] + incr;
        this.setState({toAdd: newToAdd});
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        const newVal = target.type === 'checkbox' ? target.checked : target.value;

        this.setState({
            [name]: newVal,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        // alert(JSON.stringify(this.state));
        var toSend = {...this.state.toAdd};
        toSend["list_name"] = this.state.groceryListName;

        // alert(JSON.stringify(toSend));

        return fetch(baseUrl + `groclist/update/${this.props.login.user.id}/${this.state.grocery_id}/`,{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(
                toSend
            )
        })
        .then(resp => resp.json())
        .then(resp => {
            console.log(JSON.stringify(resp));
            if(resp.status === "Successfully updated"){
                this.props.load_currGrocList(this.props.login.user.id, this.props.groc_id);
            } else {
            }
        })
        .catch(err => console.log(err));
    }

    render() {
        return (
            <Modal isOpen={this.props.isEdit} toggle={event => this.props.toggleEdit(event)} className="">
                <form onSubmit={event => this.handleSubmit(event)}>
                    <ModalHeader toggle={event => this.props.toggleEdit(event)}>
                        <input name="groceryListName" value={this.state.groceryListName} onChange={e => this.handleChange(e)}></input>
                    </ModalHeader>
                    <ModalBody>
                        <div className="container-fluid">
                            <div className="row">
                                {this.renderRecipes(this.props.my_recipes.my_recipes)}
                            </div>
                        </div>

                        
                    </ModalBody>
                    <ModalFooter>
                        <Button type="submit" className="confirm-button" color="success" onClick={event => this.handleSubmit(event)}>Confirm</Button>{' '}
                        <Button className="cancel-button" color="secondary" onClick={event => this.props.toggleEdit(event)}>Cancel</Button>
                    </ModalFooter>
                </form >
            </Modal>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddRecipe));
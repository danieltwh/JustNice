import React, {Component} from  'react';
import {Card, CardImg, CardTitle, CardSubtitle} from 'reactstrap';
import { Link} from 'react-router-dom';

import {withRouter} from 'react-router-dom';
import {connect, useSelector, useDispatch} from "react-redux";

import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import { load_myGrocList, load_myGrocList_reset, create_new_GrocList } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
      login: state.login,
      groceryList: state.groceryList
    }
  }
  
const mapDispatchToProps = (dispatch) => ({
    load_myGrocList: (user_id) => dispatch(load_myGrocList(user_id)),
    load_myGrocList_reset: () => dispatch(load_myGrocList_reset()),
    create_new_GrocList: (user_id, list_id) => dispatch(create_new_GrocList(user_id, list_id))
});


class MyGroceryListPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOptionsOpen: false,
        };
        this.optionsMenu = React.createRef();
        this.toggleOptions = this.toggleOptions.bind(this);
        this.openOptions = this.openOptions.bind(this);
        this.closeOptions = this.closeOptions.bind(this);
    }

    componentDidMount() {
        if (this.props.groceryList.inProgress === "idle") {
            this.props.load_myGrocList(this.props.login.user.id);
        }
    }

    componentWillUnmount() {
        if(this.props.groceryList.inProgress === "success") {
            this.props.load_myGrocList_reset();
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

    renderGroceryListTiles(groceryLists) {
        const recipesTiles = groceryLists.map(groceryList => {
            return (
                
                <div key={groceryList.id} className="col-6 col-sm-4 col-lg-3 col-xl-2">
                <Link to={`/grocerylist/${parseInt(groceryList.list_id, 10)}`} style={{textDecoration: "none", color: "inherit"}}>
                    <Card className="grocery-list-tile">
                        {/* <CardImg className="grocery-list-tile-img" src={groceryList.img} alt={groceryList.name} /> */}
                        <CardTitle className="grocery-list-tile-name">{groceryList.list_name}</CardTitle>
                        <CardSubtitle className="mb-2 text-muted grocery-list-tile-subtitle">{`Created: 17/06/2021`}</CardSubtitle>
                    </Card>
                </Link>
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
                        {this.renderGroceryListTiles(this.props.groceryList.groceryList)}
                    </div>
                </div>

                <div className="grocery-list-options-button" id="grocery-list-options-button">
                   
                        <Fab color="primary" aria-label="add" onClick={() => this.props.create_new_GrocList(this.props.login.user.id, this.props.groceryList.groceryList.length + 1)}>
                            <AddIcon />
                        </Fab>
                    
                </div>
          

                {/* <button  className="grocery-list-options-button" id="grocery-list-options-button" onClick={this.toggleOptions}><img src="/assets/grocery-list-options-button.png"/></button>
                {this.state.isOptionsOpen ? (
                    <div className="grocery-list-options" id="grocery-list-options"
                        ref={element => {this.optionsMenu = element;}}>
                        <button className="grocery-list-options-item">
                            <i className="fa fa-plus grocery-list-options-icon-button" />
                            <span className="grocery-list-options-icon-right">Create</span>
                        </button>
                        <button className="grocery-list-options-item">
                            <i className="fa fa-edit grocery-list-options-icon-button" />
                            <span className="grocery-list-options-icon-right">Edit</span>
                        </button>
                    </div>)
                    : 
                    (
                        null
                    )
                } */}
            </>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyGroceryListPage));
import React, {Component} from  'react';
import {Card, CardImg, CardTitle} from 'reactstrap';
import { Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class MyRecipePage extends Component {
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
        // this.props.load_myrecipes(1);
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

    renderOptions() {
        return (
            <>
            <button  className="grocery-list-options-button" id="grocery-list-options-button" onClick={this.toggleOptions}><img src="/assets/grocery-list-options-button.png"/></button>
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
                }
        </>
        )
    }

    renderRecipes(recipes) {
        const recipesTiles = recipes.map(recipe => {
            return (
                
                <div key={recipe.rec_id} className="col-6 col-sm-4 col-lg-3 col-xl-2">
                
                    <Card className="recipe-tile">
                        <Link to={`/myrecipes/${parseInt(recipe.rec_id, 10)}`} style={{textDecoration: "none", color: "inherit"}}>
                            <CardImg className="recipe-tile-img" src={recipe.img} alt={recipe.rec_name} />
                            <CardTitle>{recipe.rec_name}</CardTitle>
                        </Link>
                        
                        
                        <div>
                            <Link to={`/edit/${parseInt(recipe.rec_id, 10)}`} style={{textDecoration: "none", color: "inherit"}}>
                                <button type="button" className="pull-right"><FontAwesomeIcon icon="edit" size="sm"/></button>
                            </Link>
                        </div>
                    </Card>
                
                
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
                        {this.renderRecipes(this.props.recipes)}
                    </div>
                </div>
                {this.renderOptions()}
            </>
        )
    }
}

export default MyRecipePage;
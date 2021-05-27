import React, {Component} from  'react';
import {Card, CardImg, CardTitle} from 'reactstrap';

class MyRecipePage extends Component {
    constructor(props) {
        super(props);

    }

    renderRecipes(recipes) {
        const recipesTiles = recipes.map(recipe => {
            return (
                <div key={recipe.id} className="col-6 col-md-4 col-lg-3">
                    <Card>
                        <CardImg width="100%" src={recipe.img} alt={recipe.name} />
                        <CardTitle>{recipe.name}</CardTitle>
                    </Card>
                </div>
            )
        });
        
        return recipesTiles;
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    {this.renderRecipes(this.props.recipes)}
                </div>
            </div>
        )
    }
}

export default MyRecipePage;
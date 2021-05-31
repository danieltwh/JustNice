import React, {Component} from  'react';
import {Card, CardImg, CardTitle} from 'reactstrap';

class ExplorePage extends Component {
    constructor(props) {
        super(props);

    }

    renderRecipes(recipes) {
        const recipesTiles = recipes.map(recipe => {
            return (
                <div key={recipe.id} className="col-6 col-sm-4 col-lg-3 col-xl-2">
                    <Card className="recipe-tile">
                        <CardImg className="recipe-tile-img" src={recipe.img} alt={recipe.name} />
                        <CardTitle>{recipe.name}</CardTitle>
                    </Card>
                </div>
            )
        });
        
        return recipesTiles;
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    {this.renderRecipes(this.props.recipes)}
                </div>
            </div>
        )
    }
}

export default ExplorePage;
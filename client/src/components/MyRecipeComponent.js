import React, { Component, useState } from 'react';
// import {Card, CardImg, CardTitle} from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";

import { load_myrecipes, load_myrecipes_reset } from "../redux/ActionCreators";

import { baseUrl } from "../shared/baseUrl";
import Loading from "./LoadingComponent";

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';

import Alert from '@material-ui/lab/Alert';
import Image from "material-ui-image";


const mapStateToProps = state => {
    return {
        login: state.login,
        my_recipes: state.my_recipes
    }
}

const mapDispatchToProps = (dispatch) => ({
    load_myrecipes: (user_id) => { dispatch(load_myrecipes(user_id)) },
    load_myrecipes_reset: () => { dispatch(load_myrecipes_reset()) }
});

const RecipeTile = (recipe) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    console.log(JSON.stringify(recipe));

    return (
        <div key={recipe.rec_id} className="col-6 col-sm-4 col-lg-3 col-xl-2">

            <Card className="recipe-tile">
                <CardContent>
                    <Typography style={{ fontSize: "20px", padding: "0" }}>
                        {recipe.recipe.rec_name}
                    </Typography>
                </CardContent>

                <Link to={`/myrecipes/${parseInt(recipe.recipe.rec_id, 10)}`} style={{ textDecoration: "none", color: "inherit" }}>

                    <Image className="recipe-tile-img" src={baseUrl + recipe.recipe.url} alt={recipe.recipe.rec_name} />
                    <CardContent style={{ padding: "2px 10px 5px 10px", alignItems: "center", }}>
                        <Grid container rowSpacing={2} columnSpacing={4} direction="row" justifyContent="center" alignItems="flex-start">
                            <Grid item xs={6} sm={6}>
                                {/* <Paper > */}
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Time: {recipe.recipe.cooking_time}min
                                </Typography>
                                {/* </Paper> */}
                            </Grid>
                            <Grid style={{ textAlign: "center" }} item xs={6} sm={6} >
                                {/* <Paper > */}
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Pax: {recipe.recipe.serving_pax}
                                </Typography>
                                {/* </Paper> */}
                            </Grid>

                            <Grid item xs={12} sm={12} md={12}>
                                {/* <Paper > */}
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Cuisine: {recipe.recipe.cuisine}
                                </Typography>
                                {/* </Paper> */}

                            </Grid>
                        </Grid>
                        {/* <Typography variant="body2" color="textSecondary" component="p">
                            Cooking Time: {recipe.cooking_time}min &nbsp;&nbsp;&nbsp; Pax: {recipe.serving_pax} <br/>
                            Cuisine: {recipe.cuisine}
                            </Typography> */}
                    </CardContent>
                </Link>


                <div>
                    <Button variant="contained" color="primary" className="pull-right" onClick={handleClick}>
                        <FontAwesomeIcon icon="edit" size="sm" />&nbsp; Edit
                    </Button>

                    <Menu id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "left",
                        }}
                        transformOrigin={{
                            vertical: "bottom",
                            horizontal: "center",
                        }}
                        style={{ marginRight: "20px" }}
                        TransitionComponent={Fade}>
                        <Link to={`/edit/${parseInt(recipe.recipe.rec_id, 10)}`} style={{ textDecoration: "none", color: "inherit" }}>
                            <MenuItem >
                                Edit
                            </MenuItem>
                        </Link>

                        <MenuItem onClick={handleClose}>Delete</MenuItem>
                    </Menu>


                </div>
            </Card>


        </div>
    )
}

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
        this.addDefaultSrc = this.addDefaultSrc.bind(this);
    }

    componentDidMount() {
        if (this.props.my_recipes.inProgress === "not-loaded") {
            console.log(this.props.my_recipes.inProgress);
            this.props.load_myrecipes(this.props.login.user.id);
        }
    }

    componentWillUnmount() {

        if (this.props.my_recipes.inProgress === "success" && this.props.my_recipes.my_recipes.length >= 1) {
            console.log(this.props.my_recipes.inProgress);
            this.props.load_myrecipes_reset();
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
        this.setState({ isOptionsOpen: true }, () => {
            document.addEventListener("click", this.closeOptions);
        });
    }

    closeOptions(event) {
        event.stopPropagation();
        // console.log(document.getElementById("grocery-list-options").contains(event.target));
        if (this.optionsMenu !== event.target && !this.optionsMenu.contains(event.target)) {
            // console.log("close Options")
            // console.log(this.optionsMenu)
            this.setState({ isOptionsOpen: false }, () => {
                document.removeEventListener("click", this.closeOptions);
            });
        }
    }

    renderOptions() {
        return (
            <>
                <div className="grocery-list-options-button" id="grocery-list-options-button">
                    <Link to="/newrecipe">
                        <Fab color="primary" aria-label="add">
                            <AddIcon />
                        </Fab>
                    </Link>
                </div>
            </>

        )
    }

    addDefaultSrc(event) {
        event.target.src = "/assets/recipe-1.jpeg";
        event.target.onerror = null;
    }

    getCurrentDate(separator = '') {

        var newDate = new Date()
        var date = newDate.getDate();
        var month = newDate.getMonth() + 1;
        var year = newDate.getFullYear();
        var h = newDate.getHours();
        var m = newDate.getMinutes();
        var s = newDate.getSeconds();

        return `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date}${separator}${h}${separator}${m}${separator}${s}`
    }

    renderRecipes(recipes) {
        const recipesTiles = recipes.map(recipe => <RecipeTile recipe={recipe} />);

        return recipesTiles;
    }

    render() {
        return (
            <>
                <div className="container-fluid">
                    {(() => {
                        if (this.props.my_recipes.inProgress === "failed") {
                            return (
                                <Alert severity="error">{this.props.my_recipes.errMess}</Alert>
                            )

                        } else if (this.props.my_recipes.inProgress === "inProgress") {
                            return (
                                <>
                                    <Alert severity="info">Hold on...Serving up the recipes soon!</Alert>
                                    <Loading />
                                </>
                            )
                        } else if (this.props.my_recipes.my_recipes.length === 0) {
                            return (
                                <Alert severity="info">
                                    Ohhh no... You don't seem to have any recipes. Create one here!
                                    <Button variant="contained" color="primary" style={{ marginLeft: "15px" }}>Create Recipe</Button>
                                </Alert>
                            )
                        }
                    })()}


                    <div className="row">
                        {this.renderRecipes(this.props.my_recipes.my_recipes)}
                    </div>
                </div>
                {this.renderOptions()}
            </>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyRecipePage));
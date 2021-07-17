import React, { Component, useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { makeStyles, withStyles, styled } from "@material-ui/core/styles";

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { InputAdornment, MenuItem, TextField } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

import Button from '@material-ui/core/Button';

import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';

import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles({
    titleItemRight: {
        color: 'white',
        backgroundColor: 'blue',
        top: '50%',
        height: 30,
        float: 'right',
        position: 'relative',
        transform: 'translateY(-50%)',
    },
    root: {
        backgroundColor: "#F2F1F9",
        width: "100%",
        padding: "10px 10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 20,
        padding: 0,
    },
    pos: {
        marginBottom: 12,
    },

    recipeDetails: {
        padding: "2px 10px 5px 10px",
        alignItems: "center",
    },

    gridRow: {
        margin: "10px 0px",
    },

    paper: {
        textAlign: "center",

    },
    paxDetails: {
        textAlign: "center",
    },

    cardBottom: {
        padding: 0,
        alignSelf: "bottom",
    }
});

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


export default function SearchBar(location) {
    const login = useSelector(state => state.login);

    const [search, setSearch] = useState("");
    const [advanceSearch, setAdvanceSearch] = useState("");
    const [cookingTime, setCookingTime] = useState("");
    const [servingPax, setServingPax] = useState("");
    const [cuisine, setCuisine] = useState("");
    const [recType, setRecType] = useState("");
    const [open, setOpen] = useState(true);

    const classes = useStyles();



    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        alert(JSON.stringify([open, search, cookingTime, servingPax, cuisine, recType]));
    };



    console.log(JSON.stringify([open, search, cookingTime, servingPax, cuisine, recType]));
    // console.log(search);


    return (
        <div className={classes.root}>
            <Grid container>
                <form >
                    <Grid item>
                        {/* <InputBase
                        className={classes.input}
                        placeholder="Search Recipes"
                        inputProps={{ 'aria-label': 'search google maps' }}
                    />
                    <IconButton type="submit" className={classes.iconButton} aria-label="search">
                        <SearchIcon />
                    </IconButton> */}
                        <TextField label="Search" value={search} onChange={(e) => {setSearch(e.target.value); setAdvanceSearch(e.target.value)}}
                            placeholder="Recipe / Ingredients" variant="outlined" color="secondary" size="small"
                            InputLabelProps={{ shrink: true, }} />
                        <button type="submit"
                            className="btn btn-light search-bar-btn"
                            onClick={event => { this.submitSearch(event) }}>
                            <i className="fa fa-search"></i>
                        </button>

                        <Button onClick={(e) => handleClickOpen()}>Advance Search</Button>

                        <Dialog onClose={(e) => handleClose()} aria-labelledby="customized-dialog-title" open={open}>
                            <DialogTitle id="customized-dialog-title" onClose={e => handleClose()}>
                                Advance Search
                            </DialogTitle>
                            <DialogContent dividers>
                            <Box sx={{ width: '100%' }}>
                                <Grid container spacing={2}>
                        
                                    <Grid container item xs={12} className={classes.gridRow}>
                                    <TextField fullWidth label="Search" value={advanceSearch} onChange={(e) => setAdvanceSearch(e.target.value)}
                                        placeholder="Recipe / Ingredients" variant="outlined" color="secondary" size="small"
                                        InputLabelProps={{ shrink: true, }} />
                                    </Grid>
                               

                                    <Grid item xs={12} > 
                                        <Grid container direction="row" justifyContent="flex-start" spacing={2}>
                                            <Grid item xs={6} sm={3}>
                                                <FormControl className={classes.formControl} style={{minWidth: 120, width:"100%"}}>
                                                    <TextField variant="outlined" size="small" 
                                                        label="Cooking Time" 
                                                        onChange={e => setCookingTime(e.target.value)}
                                                        value={cookingTime}
                                                        InputLabelProps={{ shrink: true, }}
                                                        InputProps={{
                                                            endAdornment: <InputAdornment position="end">min</InputAdornment>
                                                        }}>
                                                    </TextField>
                                                </FormControl>
                                            </Grid>
                                                
                                            <Grid item xs={6} sm={3}>
                                                <FormControl className={classes.formControl} style={{ width:"100%"}}>
                                                    <TextField variant="outlined" size="small" 
                                                        label="Serving Pax" 
                                                        InputLabelProps={{ shrink: true, }}
                                                        onChange={e => setServingPax(e.target.value)}
                                                        value={servingPax}
                                                        InputProps={{
                                                            startAdornment: <InputAdornment position="start"><PersonIcon  /></InputAdornment>
                                                        }}>
                                                    </TextField>
                                                </FormControl>
                                            </Grid>

                                            <Grid item xs={6} sm={3}>
                                                <FormControl  variant="outlined" size="small"  style={{minWidth: 120, width:"100%"}}>
                                                    <InputLabel id="demo-simple-select-placeholder-label-label">
                                                        Cuisine
                                                    </InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-placeholder-label-label"
                                                        id="demo-simple-select-placeholder-label"
                                                        value={cuisine}
                                                        onChange={e => setCuisine(e.target.value)}
                                                        label="Cuisine"
                                                    >
                                                        <MenuItem value="">
                                                            <em>None</em>
                                                        </MenuItem>
                                                        <MenuItem value={"Global"}>Global</MenuItem>
                                                        <MenuItem value={"Chinese"}>Chinese</MenuItem>
                                                        <MenuItem value={"Indian"}>Indian</MenuItem>
                                                    </Select>
                                                    {/* <FormHelperText>Label + placeholder</FormHelperText> */}
                                                </FormControl>
                                            </Grid>

                                            <Grid item xs={6} sm={3}>
                                                <FormControl  variant="outlined" size="small"  style={{width: "130px", width:"100%"}}>
                                                    <InputLabel id="demo-simple-select-placeholder-label-label">
                                                        Recipe Type
                                                    </InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-placeholder-label-label"
                                                        id="demo-simple-select-placeholder-label"
                                                        value={recType}
                                                        onChange={e => setRecType(e.target.value)}
                                                        label="Cuisine"
                                                    >
                                                        <MenuItem value="">
                                                            <em>None</em>
                                                        </MenuItem>
                                                        <MenuItem value={"Edible"}>Edible</MenuItem>
                                            
                                                    </Select>
                                                    {/* <FormHelperText>Label + placeholder</FormHelperText> */}
                                                </FormControl>
                                            </Grid>

                                            
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Box>

                                {/* <Typography gutterBottom>
                                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
                                    in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                                </Typography> */}

                            </DialogContent>
                            <DialogActions>
                                <Button autoFocus onClick={handleSubmit} color="primary">
                                    Search
                                </Button>
                            </DialogActions>
                        </Dialog>



                        {/* <IconButton type="submit" className={classes.iconButton} aria-label="search">
                        <SearchIcon />
                    </IconButton> */}
                    </Grid>
                </form>



            </Grid>
        </div>
    )




}
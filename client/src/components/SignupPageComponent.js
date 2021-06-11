import React, { Component } from 'react';
import { Col, Row, Navbar, NavbarBrand, Button, Form, FormGroup, FormFeedback, FormText, Label, Input } from 'reactstrap';
// import  {Form} from "react-bootstrap";
import {LocalForm, Control, Errors} from "react-redux-form";
import { Redirect } from 'react-router';

import { baseUrl } from '../shared/baseUrl';
import {login_success} from "../redux/ActionCreators";

const minLength = (len) => (value) => value && (value.length >= len);
const maxLength = (len) => (value) => !(value) || (value.length <= len);
const required = value => value && (value.length);
const email_re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;



class SignupPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            username: "",
            password: ""
            , validate: {
                first_name: "",
                last_name: "",
                email: "",
                username: "",
                password: ""
            }
            ,isLoading: false
        }
        this.handleSignup = this.handleSignup.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const { target } = event;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const { name } = target;

        this.setState({
            [name]: value,
        });
    }

    validateName(event) {
        const {target} = event;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const {name} = target;
        const result = (value.length > 0)
        if (result) {
            this.setState({validate: {...this.state.validate, [name]:"has-success"}});
        } else {
            this.setState({validate: {...this.state.validate, [name]:"has-danger"}});
        }
    }

    validateEmail(event) {
        const {target} = event;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const {name} = target;
        const email_re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const result = (value.length > 0 && email_re.test(value));
        if (result) {
            this.setState({validate: {...this.state.validate, [name]:"has-success"}});
        } else {
            this.setState({validate: {...this.state.validate, [name]:"has-danger"}});
        }
    }

    validateUsername(event) {
        const {target} = event;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const {name} = target;
        const result = true;
        if (result) {
            this.setState({validate: {...this.state.validate, [name]:"has-success"}});
        } else {
            this.setState({validate: {...this.state.validate, [name]:"has-danger"}});
        }
    }

    handleSignup(event) {
        event.preventDefault();

        // console.log("Username: " + this.state.username + " Password: " + this.state.password);
        // alert("Username: " + this.state.username + " Password: " + this.state.password);

        console.log("Firstname: " + this.state.first_name + " Lastname: " + this.state.last_name + " Email: " + this.state.email +
        " Username: " + this.state.username + " Password: " + this.state.password)

        alert("Firstname: " + this.state.first_name + " Lastname: " + this.state.last_name + " Email: " + this.state.email +
        " Username: " + this.state.username + " Password: " + this.state.password)
        return fetch(baseUrl + "user/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "first_name": this.state.first_name, 
                "last_name": this.state.last_name,
                "email": this.state.email,
                "username": this.state.username,
                "password": this.state.password
            })
        })
        .then(resp => resp.json())
        .then(resp => {
            console.log(JSON.stringify(resp));
            if (resp === "Added Successfully") {
                const user = true;
                this.props.signup_success(user);
                <Redirect to="/explore" />
            }
        })
        .catch(err => console.log(err));
    }

    validate() {
        const email_re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const validation = {
            first_name: (this.state.first_name!="" && this.state.first_name.length > 0) ? true : false,
            last_name: (this.state.last_name!=null && this.state.last_name.length > 0 ) ? true : false,
            email: (this.state.email!=null && this.state.email.length > 0 && email_re.test(this.state.email)) ? true : false,
            username: true,
            password: true
        }
        return validation;
    }

    renderSignupForm() {
        console.log(JSON.stringify(this.state))
        
        const validation = this.validate();
        console.log(JSON.stringify(validation))

        const canSubmit = (this.state.validate.first_name && this.state.validate.last_name &&
            this.state.validate.email && this.state.validate.username)

        return (
            // <LocalForm>
            //     <Row form>
            //         <Col md={6}>
            //             <Row className="form-group">
            //                 <Label htmlfor="first_name">Firstname</Label>
            //                 <Control.text model=".first_name"  type="text" name="first_name" id="first_name" 
            //                     className="form-group" placeholder=""
            //                     validators= {{
            //                         required, minLength: minLength(3), maxLength: maxLength(15)
            //                     }}
            //                 />
            //                 <Errors className="text-danger" model=".first_name" show="touched"
            //                     messages= {{
            //                         required: "Required",
            //                         minLength: "Must be greater than 2 characters",
            //                         maxLength: "Must be 15 characters or less"
            //                     }}
            //                 />
            //             </Row>
            //         </Col>
            //         <Col md={6}>
            //             <FormGroup>
            //                 <Label for="last_name">Lastname</Label>
            //                 <Input type="text" name="last_name" id="last_name" placeholder="" />
            //             </FormGroup>
            //         </Col>
            //     </Row>

           
            //     <FormGroup>
            //         <Label for="email">Email</Label>
            //         <Input type="email" name="email" id="email" placeholder="abc@gmail.com" />
            //     </FormGroup>

            //     <FormGroup>
            //         <Label for="username">Username</Label>
            //         <Input type="username" name="username" id="username" placeholder="" />
            //     </FormGroup>

            //     <FormGroup>
            //         <Label for="password">Password</Label>
            //         <Input type="password" name="password" id="password" placeholder="" />
            //     </FormGroup>
        
            //     <FormGroup check>
            //         <Input type="checkbox" name="check" id="exampleCheck"/>
            //         <Label for="exampleCheck" check>I accept the Terms of Use & Privacy Policy</Label>
            //     </FormGroup>
            //     <Button className="btn btn-primary">Sign Up</Button>
            // </LocalForm>


            <Form className="form" onSubmit={this.handleSignup}>
                <Row form>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="first_name">Firstname</Label>
                            <Input type="text" name="first_name" id="first_name" placeholder="" 
                                valid={this.state.validate.first_name === "has-success"} 
                                invalid={this.state.validate.first_name === "has-danger"}
                                onChange={(e) => {
                                    this.validateName(e);
                                    this.handleChange(e)}
                                    }
                                value={this.state.first_name}
                                onBlur={(e) => {
                                    this.validateName(e);
                                    this.handleChange(e)}}
                            />
                            <FormFeedback>Required</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="last_name">Lastname</Label>
                            <Input type="text" name="last_name" id="last_name" placeholder="" 
                                valid={this.state.validate.last_name === "has-success"} 
                                invalid={this.state.validate.last_name === "has-danger"}
                                onChange={(e) => {
                                    this.validateName(e);
                                    this.handleChange(e)}
                                    }
                                value={this.state.last_name}
                                onBlur={(e) => {
                                    this.validateName(e);
                                    this.handleChange(e)}}
                            />
                            <FormFeedback>Required</FormFeedback>
                        </FormGroup>
                    </Col>
                </Row>

           
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" name="email" id="email" placeholder="abc@gmail.com" 
                        valid={this.state.validate.email === "has-success"} 
                        invalid={this.state.validate.email === "has-danger"}
                        onChange={(e) => {
                            this.validateEmail(e);
                            this.handleChange(e)}
                            }
                        value={this.state.email}
                        onBlur={(e) => {
                            this.validateEmail(e);
                            this.handleChange(e)}}
                    />
                    <FormFeedback>{(this.state.email.length <= 0) ? "Required" : "Invalid Email"}</FormFeedback>
                </FormGroup>

                <FormGroup>
                    <Label for="username">Username</Label>
                    <Input type="username" name="username" id="username" placeholder="" 
                        valid={this.state.validate.username === "has-success"} 
                        invalid={this.state.validate.username === "has-danger"}
                        onChange={(e) => {
                            this.validateUsername(e);
                            this.handleChange(e)}
                            }
                        value={this.state.username}
                        onBlur={(e) => {
                            this.validateUsername(e);
                            this.handleChange(e)}}
                    />
                </FormGroup>

                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type="password" name="password" id="password" placeholder="" 
                        onChange={(e) => {
                            this.handleChange(e)}
                            }
                        onBlur={(e) => {
                            this.handleChange(e)}}
                    />
                </FormGroup>

                <FormGroup>
                    <Label for="confirm_password">Confirm Password</Label>
                    <Input type="password" name="confirm_password" id="confirm_password" placeholder="" />
                </FormGroup>
        
                <FormGroup check>
                    <Input type="checkbox" name="check" id="exampleCheck"/>
                    <Label for="exampleCheck" check>I accept the Terms of Use & Privacy Policy</Label>
                </FormGroup>
                <button type="submit" className="btn btn-primary" disabled={!canSubmit}>Sign Up</button>
            </Form>




            // <div className="container-fluid signup-form">
            //     <div className="row">
            //         <Form className="col-10 offset-1 col-lg-6 offset-lg-3" onSubmit={(event) => this.handleSignup(event)}>
            //             <FormGroup className="row">
            //                 <Label className="col-3" htmlFor="firstname">Firstname</Label>
            //                 <Input className="col-8 offset-1" type='text' id='firstname' name='firstname'
            //                     onChange={(event) => this.setState({firstname: event.target.value})}
            //                 />
            //             </FormGroup>

            //             <FormGroup className="row">
            //                 <Label className="col-3" htmlFor="lastname">Lastname</Label>
            //                 <Input className="col-7 offset-2" type='text' id='lastname' name= "lastname"
            //                     onChange={(event) => this.setState({lastname: event.target.value})}
            //                 />
            //             </FormGroup>

            //             <FormGroup className="row">
            //                 <Label className="col-3" htmlFor="email">Email</Label>
            //                 <Input className="col-7 offset-2" type='email' id='email' name= "email"
            //                     onChange={(event) => this.setState({email: event.target.value})}
            //                 />
            //             </FormGroup>

            //             <FormGroup className="row">
            //                 <Label className="col-3" htmlFor="username">Username</Label>
            //                 <Input className="col-7 offset-2" type='text' id='username' name='username'
            //                     onChange={(event) => this.setState({username: event.target.value})}
            //                 />
            //             </FormGroup>

            //             <FormGroup className="row">
            //                 <Label className="col-3" htmlFor="password">Password</Label>
            //                 <Input className="col-7 offset-2" type='password' id='password' name='password'
            //                     onChange={(event) => this.setState({password: event.target.value})}
            //                 />
            //             </FormGroup>
            //             <FormGroup className="row">
            //                 <div className="col-12 text-right">
            //                     <Button type="Submit" value="submit" className="bg-primary">Submit</Button>
            //                 </div>
                            
                
                            
            //             </FormGroup>
                        
            //         </Form>
            //     </div>
            // </div>
        )
    }

    render() {
        return (
            <div className="signup-bg">
                <div className="signup-form">
                    <div className="container">
                        <h2>Sign Up</h2>
                        <p>Please fill in this form to create an account!</p>
                        <hr />
                        {this.renderSignupForm()}
                    </div>
                </div>
                
            </div>
            
        );
    }
}
export default SignupPage;

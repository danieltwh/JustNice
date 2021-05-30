import React, { Component } from 'react';
import { Navbar, NavbarBrand, Button, Form, FormGroup, Label, Input } from 'reactstrap';

class SignupPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: null,
            lastname: null,
            email: null,
            username: null,
            password: null
        }
        this.handleSignup = this.handleSignup.bind(this);
    }

    handleSignup(event) {
        event.preventDefault();

        // console.log("Username: " + this.state.username + " Password: " + this.state.password);
        // alert("Username: " + this.state.username + " Password: " + this.state.password);
        this.props.login_attempt(this.state.username, this.state.password);
        
    }

    renderSignupForm() {
        return (
            <div className="container">
                <div className="row">
                    <Form className="container col-10 col-md-6 offset-md-3" onSubmit={(event) => this.handleLogin(event)}>
                        <FormGroup className="row">
                            <Label className="col-2" htmlFor="firstname">Firstname</Label>
                            <Input className="col-9 offset-1" type='text' id='firstname' name='firstname'
                                onChange={(event) => this.setState({firstname: event.target.value})}
                            />
                        </FormGroup>

                        <FormGroup className="row">
                            <Label className="col-2" htmlFor="lastname">Lastname</Label>
                            <Input className="col-9 offset-1" type='text' id='lastname' name= "lastname"
                                onChange={(event) => this.setState({lastname: event.target.value})}
                            />
                        </FormGroup>

                        <FormGroup className="row">
                            <Label className="col-2" htmlFor="email">Email</Label>
                            <Input className="col-9 offset-1" type='email' id='email' name= "email"
                                onChange={(event) => this.setState({email: event.target.value})}
                            />
                        </FormGroup>

                        <FormGroup className="row">
                            <Label className="col-2" htmlFor="username">Username</Label>
                            <Input className="col-9 offset-1" type='text' id='username' name='username'
                                onChange={(event) => this.setState({username: event.target.value})}
                            />
                        </FormGroup>

                        <FormGroup className="row">
                            <Label className="col-2" htmlFor="password">Password</Label>
                            <Input className="col-9 offset-1" type='password' id='password' name='password'
                                onChange={(event) => this.setState({password: event.target.value})}
                            />
                        </FormGroup>
                        <Button type="Submit" value="submit" className="bg-primary">Submit</Button>
                    </Form>
                </div>
            </div>
        )
    }

    render() {
        return (
            <>
                {this.renderSignupForm()}
            </>
        );
    }
}
export default SignupPage;

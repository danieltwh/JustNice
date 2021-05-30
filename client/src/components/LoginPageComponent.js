import React, { Component } from 'react';
import { Navbar, NavbarBrand, Button, Form, FormGroup, Label, Input } from 'reactstrap';

function LoginPageHeader(props) {
    return (
        <div>
        <Navbar dark expand="md">
          <NavbarBrand href="/" className="navbar-brand-mobile">JustNice</NavbarBrand>
        </Navbar>
      </div>
    )
}


class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null
        }
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(event) {
        event.preventDefault();

        // console.log("Username: " + this.state.username + " Password: " + this.state.password);
        // alert("Username: " + this.state.username + " Password: " + this.state.password);
        this.props.login_attempt(this.state.username, this.state.password);
        
    }

    renderLoginForm() {
        return (
            <div className="container login-form">
                <div className="row">
                    <Form className="col-6 offset-3" onSubmit={(event) => this.handleLogin(event)}>
                        <FormGroup>
                            <Label htmlFor="username">Username</Label>
                            <Input type='text' id='username' name='username'
                                onChange={(event) => this.setState({username: event.target.value})}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor="password">Password</Label>
                            <Input type='password' id='password' name='password'
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
                {this.renderLoginForm()}
            </>
        );
    }
}
export default LoginPage;

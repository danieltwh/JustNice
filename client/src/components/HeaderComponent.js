import React, {Component} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavbarText
  } from 'reactstrap';

  import { ButtonDropdown, UncontrolledDropdown, DropdownItem,DropdownToggle, DropdownMenu} from 'reactstrap';

  import { Link, NavLink } from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false,
            isProfileOpen: false
        }
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleProfile = this.toggleProfile.bind(this);
    }

    toggleNav() {
        this.setState({isNavOpen:!this.state.isNavOpen});
    }

    toggleProfile() {
        this.setState({isProfileOpen: !this.state.isProfileOpen});
    }

    render() {
        return (
            <div>
              <Navbar dark expand="md">
                <NavbarToggler onClick={this.toggleNav} onBlur={this.toggleNav}/>
                
                <NavLink to="/explore">
                  <NavbarBrand className="navbar-brand-mobile">JustNice</NavbarBrand>
                </NavLink>
                
                <div className="profile-icon">
                    <ButtonDropdown className="" isOpen={this.state.isProfileOpen} toggle={this.toggleProfile}>
                        <DropdownToggle caret>
                            Profile
                        </DropdownToggle>
                        <DropdownMenu>
                            {/* <DropdownItem header>Profile</DropdownItem> */}
                            {/* <DropdownItem disabled>Action</DropdownItem> */}
                            <DropdownItem>Account</DropdownItem>
                            <DropdownItem>Settings</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem onClick={this.props.signout}>Sign Out</DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>
                </div>
                <Collapse isOpen={this.state.isNavOpen} navbar>
                  <Nav className="mr-auto" navbar>
                    <NavItem>
                      <NavLink className="nav-link" to="/explore">Explore</NavLink>
                    </NavItem>

                    <NavItem>
                      <NavLink className="nav-link" to="/myrecipes/" >My Recipe</NavLink>
                    </NavItem>

                    <NavItem>
                      <NavLink className="nav-link" to="/grocerylist" >Grocery List</NavLink>
                    </NavItem>

                    

                    {/* <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav caret>
                        Options
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem>
                          Option 1
                        </DropdownItem>
                        <DropdownItem>
                          Option 2
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>
                          Reset
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown> */}
                  </Nav>
                  
                </Collapse>
                


                
              </Navbar>
              
            </div>
          );
    }
}
  
export default Header;
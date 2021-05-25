import React, { Component } from "react";
import { logOutUser } from "../redux/actions/action-helper";
import {
  Button,
  Navbar,
  Form,
  Nav,
  NavDropdown,
  Container,
  LinkContainer,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class NavBar extends Component {
  handleLogOut = (e) => {
    e.preventDefault();
    this.props.logOutUser();
  };
  render() {
    let NavElems;
    if (!this.props.isLoggedIn) {
      NavElems = (
        <Form inline className="text-white">
          <Link to="/login">
            <Button className="m-2" variant="outline-primary">
              Log in
            </Button>
          </Link>
          or
          <Link to="/signin">
            <Button className="m-2" variant="outline-primary">
              Sign in
            </Button>
          </Link>
        </Form>
      );
    } else {
      NavElems = (
        <React.Fragment>
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/bankAccount">
              Bank Account
            </Nav.Link>
          </Nav>
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/buy">
              Buy BTC
            </Nav.Link>
          </Nav>
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/sell">
              Sell BTC
            </Nav.Link>
          </Nav>
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/bills">
              Bills
            </Nav.Link>
          </Nav>

          <Navbar.Collapse className="justify-content-end">
            <NavDropdown
              title={this.props.currentUser.name}
              className="text-white m-2"
            >
              <NavDropdown.Item
                as={Link}
                to="/profile"
                className="font-weight-light"
              >
                Your account
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/login"
                onClick={this.handleLogOut}
              >
                Log out
              </NavDropdown.Item>
            </NavDropdown>
          </Navbar.Collapse>
        </React.Fragment>
      );
    }

    return (
      <Navbar bg="light" variant="light">
        <Container fluid className="w-75">
          <Navbar.Brand
            as={Link}
            to="/dashboard"
            className="font-weight-lighter display-5"
          >
            Bit Corner
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          {NavElems}
        </Container>
      </Navbar>
    );
  }
}
const mapStateToProps = (state) => state;
export default connect(mapStateToProps, { logOutUser })(NavBar);

import React from "react";

import {
  Container,
  Row,
  Col,
  Button,
  Navbar,
  Nav,
  NavbarBrand,
  NavLink,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const Header = (props) => {
  const currentUser = props.userName;
  return (
    <header>
      <Navbar
        fixed="top"
        color="light"
        light
        expand="xs"
        className="border-bottom border-gray bg-white"
        style={{ height: 80 }}
      >
        <Container>
          <Row noGutters className="position-relative w-100 align-items-center">
            <Col className="d-none d-lg-flex justify-content-start">
              <Nav className="mrx-auto" navbar>
                {currentUser ? (
                  <NavItem className="d-flex align-items-center">
                    <NavLink className="font-weight-bold" href="/">
                      Welcome, {currentUser}!
                    </NavLink>
                  </NavItem>
                ) : null}

                <NavItem className="d-flex align-items-center">
                  <NavLink className="font-weight-bold" href="/">
                    Home
                  </NavLink>
                </NavItem>

                <NavItem
                  className="d-flex align-items-center"
                  onClick={() => props.onHandleOrder()}
                >
                  <NavLink className="font-weight-bold btn">Menu</NavLink>
                </NavItem>

                <UncontrolledDropdown
                  className="d-flex align-items-center"
                  nav
                  inNavbar
                >
                  <DropdownToggle className="font-weight-bold" nav caret>
                    Account
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem
                      className="font-weight-bold text-secondary text-uppercase"
                      header
                      disabled
                    >
                      My Account
                    </DropdownItem>
                    <DropdownItem divider />
                    {currentUser ? <DropdownItem>Profile</DropdownItem> : null}
                    {currentUser ? (
                      <DropdownItem onClick={() => props.onHandleStores()}>
                        Store Admin
                      </DropdownItem>
                    ) : null}
                    {currentUser ? (
                      <DropdownItem onClick={() => props.onHandleHistory()}>
                        Order History
                      </DropdownItem>
                    ) : null}
                    {currentUser ? (
                      <DropdownItem
                        onClick={() =>
                          props.onHandleLogout ? props.onHandleLogout() : null
                        }
                      >
                        Logout
                      </DropdownItem>
                    ) : (
                      <DropdownItem onClick={() => props.onHandleLogin()}>
                        Login
                      </DropdownItem>
                    )}
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Col>

            <Col className="d-flex justify-content-xs-start justify-content-lg-center">
              <NavbarBrand
                className="d-inline-block p-0"
                href="/"
                style={{ width: 80 }}
              >
                <img
                  src="https://jah-lex-workshop-2018.s3.amazonaws.com/mob302/images/0001.png"
                  alt="logo"
                  className="position-relative img-fluid"
                />
              </NavbarBrand>
            </Col>

            <Col className="d-none d-lg-flex justify-content-end">
              <Button
                className="info"
                onClick={() =>
                  props.onHandleReview ? props.onHandleReview() : null
                }
              >
                Tell us how we're doing
              </Button>
            </Col>
          </Row>
        </Container>
      </Navbar>
    </header>
  );
};
export default Header;

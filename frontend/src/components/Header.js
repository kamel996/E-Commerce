import React from "react";
import { Container, Dropdown, NavDropdown } from "react-bootstrap";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/loginActions";
import { useNavigate } from "react-router-dom";
function Header() {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <Container>
      <header>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>E-commerce</Navbar.Brand>
            </LinkContainer>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav style={{ marginLeft: "auto" }}>
                <LinkContainer to="cart">
                  <Nav.Link>
                    <i className="fas fa-shopping-cart"></i>Cart
                  </Nav.Link>
                </LinkContainer>
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <LinkContainer to="login">
                    <Nav.Link>
                      <i className="fas fa-user"></i>Sign In
                    </Nav.Link>
                  </LinkContainer>
                )}
                {userInfo && userInfo.isAdmin && (
                  <NavDropdown title="Dashboard" id="adminmenu">
                    <LinkContainer to="/admin/userlist">
                      <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/productlist">
                      <NavDropdown.Item>Products</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/orderlist">
                      <NavDropdown.Item>Orders</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </Container>
  );
}

export default Header;

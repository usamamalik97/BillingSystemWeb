import styled from "styled-components";
import { Layout } from "antd";
import {
  Navbar,
  Nav,
  Button,
  Form,
  FormControl,
  NavDropdown,
} from "react-bootstrap";

const NavItem = styled.div`
  background-color: #ffaf20;
`;
//background-color: #4db6ac;
/*const NavItem = styled.div`
  background-color: #152737;
  color: white;
`;
 style={{ color: "white" }}
*/

interface NavbarCustomProps {
  menu: any[];
}
const NavbarCustom = ({ menu }: NavbarCustomProps) => {
  return (
    <Layout className="layout">
      <NavItem>
        <Navbar
          collapseOnSelect
          expand="lg"
          style={{ justifyContent: "space-between" }}
        >
          <Navbar.Brand
            href="/home"
            style={{
              width: "55%",
              fontSize: "30px",
              fontFamily: "fantasy",
              marginLeft: "15px",
            }}
          >
            Hassan Hardware
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Form>
              <Nav className="mr-auto">
                {menu.map(
                  (menuItem) =>
                    menuItem.listItems ? ( // Check if it's a dropdown menu item
                      <NavDropdown
                        title={menuItem.title}
                        id={`nav-dropdown-${menuItem.id}`}
                        key={menuItem.id}
                        style={{ width: "100%" }}
                      >
                        {menuItem.listItems.map((subMenu, index) => (
                          <span key={index}>
                            {subMenu.id === 8 && (
                              <hr
                                className={"border border-dark"}
                                style={{ margin: "2px", padding: "0px" }}
                              ></hr>
                            )}
                            <NavDropdown.Item
                              href={subMenu.url}
                              key={subMenu.id}
                            >
                              {subMenu.icon}
                              {subMenu.title}
                            </NavDropdown.Item>
                          </span>
                        ))}
                      </NavDropdown>
                    ) : (
                      <Nav.Link
                        href={menuItem.url}
                        key={menuItem.id}
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          width: "100%",
                        }}
                      >
                        {menuItem.icon}
                        {menuItem.title}
                      </Nav.Link>
                    )
                  /*(menuItem) => (
                    <Nav.Link
                      href={menuItem.url}
                      key={menuItem.id}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      {menuItem.icon}
                      {menuItem.title}
                    </Nav.Link>
                    //menuItem.listItems.map((subMenu) => (
                    /*<Nav.Link
                      href={subMenu.url}
                      key={subMenu.id}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      {subMenu.icon}
                      {subMenu.title}
                    </Nav.Link>*/
                  /*)*/

                  //))
                )}
              </Nav>
            </Form>
          </Navbar.Collapse>
        </Navbar>
      </NavItem>
    </Layout>
  );
};

export default NavbarCustom;

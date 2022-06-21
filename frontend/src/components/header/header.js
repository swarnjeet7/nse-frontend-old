import { Navbar, Container, Nav, Button, NavDropdown } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function Header() {
  const [, , removeCookie] = useCookies();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeCookie("authorization");
    navigate("/login", { replace: true });
  };

  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark" fixed="top">
        <Container fluid>
          <Navbar.Brand href="/dashboard">
            <img
              src="/logo.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Import" id="import-dropdown">
                <NavDropdown.Item href="/import/cash-bhavcopy">
                  Cash Bhavcopy
                </NavDropdown.Item>
                <NavDropdown.Item href="/import/fo-bhavcopy">
                  FO Bhavcopy
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Cash Reports" id="reports-cash-dropdown">
                <NavDropdown.Item href="/cash-reports/bhavcopy">
                  Bhavcopy
                </NavDropdown.Item>
                <NavDropdown.Item href="/cash-reports/gainers-loosers">
                  Gainers/Loosers
                </NavDropdown.Item>
                <NavDropdown.Item href="/cash-reports/graph">
                  Graph
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="FO Reports" id="reports-fo-dropdown">
                <NavDropdown.Item href="/fo-reports/bhavcopy">
                  Bhavcopy
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Pivot" id="pivot-dropdown">
                <NavDropdown.Item href="/pivot">Show Pivot</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Portfolio" id="portfolio-dropdown">
                <NavDropdown.Item href="/portfolio/create">
                  Create Portfolio
                </NavDropdown.Item>
                <NavDropdown.Item href="/portfolio/manage">
                  Manage Portfolio
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Users" id="users-dropdown">
                <NavDropdown.Item href="/user/manage">
                  Manage Users
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Button variant="outline-secondary" onClick={handleLogout}>
              Logout
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;

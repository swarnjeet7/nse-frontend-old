import { Navbar, Container, Nav, Button, NavDropdown } from "react-bootstrap";
import ReportsBhavcopyModal from "../reportsBhavcopyModal";
import { useState } from "react";

function Header() {
  const [show, setShow] = useState(false);
  const [isCashBhavcopy, setIsCashBhavcopy] = useState(false);
  const handleLogout = () => {};

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
                <NavDropdown.Item
                  onClick={() => {
                    setShow(true);
                    setIsCashBhavcopy(true);
                  }}
                >
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
                <NavDropdown.Item
                  onClick={() => {
                    setShow(true);
                    setIsCashBhavcopy(false);
                  }}
                >
                  Bhavcopy
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Pivots" id="pivots-dropdown">
                <NavDropdown.Item href="/pivots/show">
                  Show Pivots
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Portfolio" id="portfolio-dropdown">
                <NavDropdown.Item href="/portfolio/create">
                  Create Portfolio
                </NavDropdown.Item>
                <NavDropdown.Item href="/portfolio/edit">
                  Edit Portfolio
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Users" id="users-dropdown">
                <NavDropdown.Item href="/user/create">
                  Create Users
                </NavDropdown.Item>
                <NavDropdown.Item href="/user/edit">
                  Edit Users
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Button variant="outline-secondary" onClick={handleLogout}>
              Logout
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {show && (
        <ReportsBhavcopyModal
          show={show}
          isCashBhavcopy={isCashBhavcopy}
          onHide={() => setShow(false)}
        />
      )}
    </>
  );
}

export default Header;

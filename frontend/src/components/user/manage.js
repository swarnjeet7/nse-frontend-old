import { Container, Form, Row, Col, Button } from "react-bootstrap";

function ManageUser() {
  const handleSubmit = () => {};

  return (
    <Container fluid>
      <Row>
        <Col className="border-right">
          <div className="border-bottom mb-3">Create User</div>
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>User Name</Form.Label>
              <Form.Control type="text" placeholder="User Name" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>User Type</Form.Label>
              <Form.Select aria-label="Default select example">
                <option>Select user type</option>
                <option value="1">Admin</option>
                <option value="2">Manager</option>
                <option value="3">Executive</option>
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="select" className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" placeholder="Full Name" />
            </Form.Group>
            <Form.Group controlId="select" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="text" placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="select" className="mb-5">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="text" placeholder="Confirm Password" />
            </Form.Group>
            <Row className="mb-5">
              <Col className="d-flex justify-content-end">
                <Button
                  variant="outline-primary"
                  type="submit"
                  className="w-100"
                >
                  Creat User
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col>
          <div className="border-bottom mb-3">Portfolio Map</div>
          <div>Portfolio's</div>
          <ul className="list-unstyled" style={{ paddingLeft: 20 }}>
            <li
              style={{
                borderLeft: "1px dotted black",
                paddingLeft: 10,
                borderBottom: "1px dotted black",
                height: 40,
              }}
            >
              <span
                style={{
                  display: "block",
                  background: "white",
                  transform: "translate(0, 50%)",
                }}
              >
                <Button variant="dark" size="sm">
                  Swarnjeet
                </Button>
              </span>
            </li>
            <li
              style={{
                borderLeft: "1px dotted black",
                paddingLeft: 10,
                borderBottom: "1px dotted black",
                height: 40,
              }}
            >
              <span
                style={{
                  display: "block",
                  background: "white",
                  transform: "translate(0, 50%)",
                }}
              >
                <Button variant="outline-dark" size="sm">
                  Manjeet
                </Button>
              </span>
            </li>
            <li
              style={{
                borderLeft: "1px dotted black",
                paddingLeft: 10,
                borderBottom: "1px dotted black",
                height: 40,
              }}
            >
              <span
                style={{
                  display: "block",
                  background: "white",
                  transform: "translate(0, 50%)",
                }}
              >
                <Button variant="outline-dark" size="sm">
                  Satyaveer
                </Button>
              </span>
            </li>
          </ul>
        </Col>
        <Col>
          <div className="border-bottom mb-3">Edit User Profile</div>
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="User Name"
                value="Swarnjeet"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>User Type</Form.Label>
              <Form.Select aria-label="Default select example" value={1}>
                <option>Select user type</option>
                <option value="1">Admin</option>
                <option value="2">Manager</option>
                <option value="3">Executive</option>
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="select" className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Full Name"
                value="Swarnjeet singh"
              />
            </Form.Group>
            <Form.Group controlId="select" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value="hellokitty"
              />
            </Form.Group>
            <Form.Group controlId="select" className="mb-5">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value="hellokitty"
              />
            </Form.Group>
            <Row className="mb-5">
              <Col className="d-flex justify-content-end">
                <Button
                  variant="outline-primary"
                  type="submit"
                  className="w-100"
                >
                  Update User
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default ManageUser;

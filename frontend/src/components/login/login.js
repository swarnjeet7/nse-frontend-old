import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap/";

const LoginForm = (props) => {
  const [state, setState] = useState({ user: null, error: null });
  const [validated, setValidated] = useState(false);
  let { user, error } = state;

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
    setValidated(true);

    try {
      let user = { token: "hsdfkewoidf@sis#RFGS" };
      setState({ user });
    } catch (error) {
      setState({ error });
    }
  };

  return (
    <Container>
      {error && <p>{error.message}</p>}
      {user && <Navigate to="/dashboard" replace={true} />}

      <Row className="gx-5">
        <h1 className="text-center p-5">Welcome to NSE Stock Analysis</h1>
        <Col
          xs={{ span: 8, offset: 1 }}
          sm={{ span: 6, offset: 3 }}
          md={{ span: 4, offset: 4 }}
        >
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group
              as={Col}
              controlId="validationCustom04"
              className="mb-3"
            >
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="State" required />
              <Form.Control.Feedback type="invalid">
                Please provide a valid username.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              as={Col}
              controlId="validationCustom05"
              className="mb-3"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" required />
              <Form.Control.Feedback type="invalid">
                Please provide a valid password.
              </Form.Control.Feedback>
            </Form.Group>

            <Row>
              <Col className="d-flex justify-content-end">
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;

import _ from "lodash";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Form, Container, Row, Col } from "react-bootstrap";
import Button from "../../molecule/button";

const LoginForm = () => {
  const [cookies, setCookie] = useCookies(["authorization"]);
  const [form, setForm] = useState({ UserName: "", Password: "" });
  const [error, setError] = useState(null);
  const [validated, setValidated] = useState(false);
  const authCookie = _.get(cookies, "authorization");
  const [loader, setLoader] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const loginForm = event.currentTarget;
    if (loginForm.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      return false;
    }

    try {
      setLoader(true);
      fetch("/user/login", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.status === 200) {
            setCookie("authorization", res.token, { path: "/" });
          } else {
            setError(res.message);
          }
          setLoader(false);
        });
    } catch (error) {
      setLoader(false);
      setError(error);
    }
  };

  const handleInputChange = (event) => {
    setForm((prevForm) => {
      return {
        ...prevForm,
        [event.target.placeholder]: event.target.value,
      };
    });
  };

  return (
    <Container>
      {authCookie && <Navigate to="/dashboard" replace={true} />}

      <Row className="gx-5">
        <div className="text-center mt-2">
          <img src="/logo-large.png" alt="logo" width="150" />
        </div>
        <h2 className="text-center p-3">Welcome to NSE Stock Analysis</h2>
        <hr />
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
              <Form.Label>Username *</Form.Label>
              <Form.Control
                type="text"
                placeholder="UserName"
                required
                value={form.UserName}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid username.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              as={Col}
              controlId="validationCustom05"
              className="mb-3"
            >
              <Form.Label>Password *</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                required
                value={form.Password}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid password.
              </Form.Control.Feedback>
            </Form.Group>

            <Row>{error && <p className="h6 text-danger">{error}</p>}</Row>

            <Row>
              <Col className="d-flex justify-content-end">
                <Button isWaiting={loader}>Submit</Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;

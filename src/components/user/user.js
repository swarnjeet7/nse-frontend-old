import { useState, useEffect, useRef } from "react";
import {
  Container,
  Form,
  Row,
  Col,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import _ from "lodash";
import Button from "../../molecule/button";
import config from "../../config";

function User() {
  const activeBtn = useRef();
  const DEFAULT_FORM = {
    UserName: "",
    UserType: "Executive",
    FullName: "",
    Password: "",
    ConfirmPassword: "",
  };

  const [form, setForm] = useState(DEFAULT_FORM);
  const [formValidated, setFormValidated] = useState(false);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [creatUserLoader, setCreatUserLoader] = useState(false);
  const [updateUserLoader, setUpdateUserLoader] = useState(false);
  const [updateForm, setUpdateForm] = useState(DEFAULT_FORM);
  const [updateFormValidated, setUpdateFormValidated] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleCreateUserSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setCreatUserLoader(true);
    const userForm = event.currentTarget;
    if (form.ConfirmPassword !== form.Password) {
      setShowToast(true);
      setMessage("Password and ConfirmPassword does not match");
      setCreatUserLoader(false);
      return;
    }
    if (userForm.checkValidity() === false) {
      setFormValidated(true);
      setCreatUserLoader(false);
      return false;
    }

    fetch(`${config.BASE_API_URL}/user/create`, {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          setMessage("User has been added successfully");
          setForm(DEFAULT_FORM);
          getAllUsers();
        }
        setCreatUserLoader(false);
      })
      .catch((error) => {
        setMessage(error.message);
        setCreatUserLoader(false);
      });
  };

  const handleUpdateUserSubmit = (event) => {
    event.preventDefault();
    setUpdateUserLoader(true);
    const userForm = event.currentTarget;
    if (updateForm.ConfirmPassword !== updateForm.Password) {
      showToast(true);
      setMessage("Password and ConfirmPassword does not match");
    }
    if (userForm.checkValidity() === false) {
      event.stopPropagation();
      setUpdateFormValidated(true);
      setUpdateUserLoader(false);
      return false;
    }
    fetch(`${config.BASE_API_URL}/user/update`, {
      method: "PATCH",
      body: JSON.stringify(updateForm),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setUpdateUserLoader(false);
        if (res.status === 200) {
          setMessage("User has been updated successfully");
          setUpdateForm(DEFAULT_FORM);
          getAllUsers();
        }
      })
      .catch((error) => {
        setMessage(error.message);
        setUpdateUserLoader(false);
      });
  };

  const handleClassActive = (el) => {
    const currentEl = activeBtn.current;
    if (currentEl) {
      currentEl.classList.remove("btn-dark");
      currentEl.classList.add("btn-outline-dark");
    }
    el.classList.add("btn-dark");
    el.classList.remove("btn-outline-dark");
    activeBtn.current = el;
  };

  const handleEditUser = (user) => {
    const { UserName, UserType, FullName } = user;
    setMessage("");
    setUpdateForm({
      UserName,
      UserType,
      FullName,
      Password: "",
      ConfirmPassword: "",
    });
  };

  const handleUpdateInputChange = (e) => {
    setUpdateForm((prevState) => {
      return {
        ...prevState,
        [e.target.id]: e.target.value,
      };
    });
  };

  const handleInputChange = (event) => {
    const target = event.target;

    setForm((prevForm) => {
      return {
        ...prevForm,
        [target.id]: target.value,
      };
    });
  };

  const getAllUsers = () => {
    fetch(`${config.BASE_API_URL}/user/all`)
      .then((res) => res.json())
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
        setMessage(err.message);
      });
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <Container fluid>
        <Row>
          <Col className="border-right">
            <div className="border-bottom mb-3">Create User</div>
            <Form
              noValidate
              validated={formValidated}
              onSubmit={handleCreateUserSubmit}
            >
              <Form.Group className="mb-3">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="User Name"
                  id="UserName"
                  value={form.UserName}
                  onChange={handleInputChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid user name.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>User Type</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  id="UserType"
                  value={form.UserType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="Manager">Manager</option>
                  <option value="Executive">Executive</option>
                  <option value="Admin">Admin</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Please select user type.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Full Name"
                  id="FullName"
                  value={form.FullName}
                  onChange={handleInputChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid full name.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  id="Password"
                  value={form.Password}
                  onChange={handleInputChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid password.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-5">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  id="ConfirmPassword"
                  value={form.ConfirmPassword}
                  onChange={handleInputChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid confirm password.
                </Form.Control.Feedback>
              </Form.Group>
              <Row className="mb-5">
                <Col className="d-flex justify-content-end">
                  <Button
                    variant="outline-primary"
                    className="w-100"
                    isWaiting={creatUserLoader}
                  >
                    Creat User
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>

          <Col>
            <div className="border-bottom mb-3">User's Map</div>
            <div>Users List</div>
            <ul className="list-unstyled" style={{ paddingLeft: 20 }}>
              {users.map((user) => {
                return (
                  <li
                    key={user._id}
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
                      <Button
                        variant="outline-dark"
                        size="sm"
                        onClick={(event) => {
                          handleClassActive(event.target);
                          handleEditUser(user);
                        }}
                      >
                        {_.capitalize(user.UserName)}
                      </Button>
                    </span>
                  </li>
                );
              })}
            </ul>
          </Col>

          <Col>
            <div className="border-bottom mb-3">Edit User Profile</div>
            <Form
              noValidate
              validated={updateFormValidated}
              onSubmit={handleUpdateUserSubmit}
            >
              <Form.Group className="mb-3">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="User Name"
                  id="UserName"
                  value={updateForm.UserName}
                  onChange={handleUpdateInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>User Type</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  id="UserType"
                  value={updateForm.UserType}
                  onChange={handleUpdateInputChange}
                >
                  <option>Select user type</option>
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="Executive">Executive</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  id="FullName"
                  placeholder="Full Name"
                  value={updateForm.FullName}
                  onChange={handleUpdateInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  id="Password"
                  placeholder="Password"
                  value={updateForm.Password}
                  onChange={handleUpdateInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-5">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  id="ConfirmPassword"
                  placeholder="Confirm Password"
                  value={updateForm.ConfirmPassword}
                  onChange={handleUpdateInputChange}
                />
              </Form.Group>
              <Row className="mb-5">
                <Col className="d-flex justify-content-end">
                  <Button
                    variant="outline-primary"
                    className="w-100"
                    isWaiting={updateUserLoader}
                  >
                    Update User
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
      <ToastContainer className="p-3" position={{ position: "middle-start" }}>
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
          bg="Success"
          className="mb-3"
        >
          <Toast.Header>
            <strong className="me-auto">From status</strong>
          </Toast.Header>
          <Toast.Body>
            <strong className="me-auto">{message}</strong>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default User;

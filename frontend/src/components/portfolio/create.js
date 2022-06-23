import { useState, useEffect, useRef } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";

function CreatePortfolio() {
  const activeBtn = useRef(null);
  const [portfolios, setPortfolios] = useState([]);
  const [loader, setLoader] = useState(false);
  const DEFAULT_FORM = {
    Portfolio: "",
    FullName: "",
    Address: "",
  };
  const [form, setForm] = useState(DEFAULT_FORM);
  const [formValidated, setformValidated] = useState(false);
  const [updateForm, setUpdateForm] = useState(DEFAULT_FORM);
  const [updateFormValidated, setupdateFormValidated] = useState(false);
  const [updateMsg, setUpdateMsg] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoader(true);
    const portfolioForm = event.currentTarget;
    if (portfolioForm.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setformValidated(true);
      setLoader(false);
      return false;
    }
    fetch("/portfolio", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setLoader(false);
        if (res.status === 200) {
          setForm(DEFAULT_FORM);
          getAllPortfolio();
        }
      })
      .catch((error) => {
        setError(error.message);
        setLoader(false);
      });
  };

  const handleUpdateSubmit = (event) => {
    event.preventDefault();
    setLoader(true);
    const portfolioForm = event.currentTarget;
    if (portfolioForm.checkValidity() === false) {
      event.stopPropagation();
      setupdateFormValidated(true);
      setLoader(false);
      return false;
    }
    fetch("/portfolio", {
      method: "PATCH",
      body: JSON.stringify(updateForm),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setLoader(false);
        setUpdateMsg(res.message);
        if (res.status === 200) {
          getAllPortfolio();
          setUpdateForm(DEFAULT_FORM);
        }
      })
      .catch((error) => {
        setError(
          error.message || "Something went wrong. Please try after some time"
        );
        setLoader(false);
      });
  };

  const handleEditPortfolio = (portfolio) => {
    const { Portfolio, FullName, Address } = portfolio;
    setUpdateMsg("");
    setUpdateForm({
      Portfolio,
      FullName,
      Address,
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

  const handleUpdateInputChange = (event) => {
    const target = event.target;

    setUpdateForm((prevForm) => {
      return {
        ...prevForm,
        [target.dataset.id]: target.value,
      };
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

  useEffect(() => {
    getAllPortfolio();
  }, []);

  const getAllPortfolio = () => {
    fetch("/portfolio")
      .then((res) => res.json())
      .then((res) => {
        setPortfolios(res.data);
      });
  };

  return (
    <Container fluid>
      <Row>
        <Col className="border-right">
          <div className="border-bottom mb-3">Create Portfolio</div>
          <Form noValidate validated={formValidated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Portfolio Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Portfolio Name"
                id="Portfolio"
                value={form.Portfolio}
                onChange={handleInputChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid portfolio name.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                id="FullName"
                placeholder="Full Name"
                onChange={handleInputChange}
                value={form.FullName}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid full name.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-5">
              <Form.Label>Full Address</Form.Label>
              <Form.Control
                type="text"
                id="Address"
                placeholder="Full Address"
                onChange={handleInputChange}
                value={form.Address}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid full addres.
              </Form.Control.Feedback>
            </Form.Group>
            <Row className="mb-5">
              <Col className="d-flex justify-content-end">
                <Button
                  variant="outline-primary"
                  type="submit"
                  className="w-100"
                >
                  Creat Portfolio
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>

        <Col>
          <div className="border-bottom mb-3">Portfolio Map</div>
          <div>Portfolio's</div>
          <ul className="list-unstyled" style={{ paddingLeft: 20 }}>
            {portfolios.map((portfolio) => {
              return (
                <li
                  key={portfolio.Portfolio}
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
                        handleEditPortfolio(portfolio);
                      }}
                    >
                      {portfolio.Portfolio}
                    </Button>
                  </span>
                </li>
              );
            })}
          </ul>
        </Col>

        <Col>
          <div className="border-bottom mb-3">Edit Portfolio</div>
          <Form
            noValidate
            validated={updateFormValidated}
            onSubmit={handleUpdateSubmit}
          >
            <Form.Group className="mb-3">
              <Form.Label>Portfolio Name</Form.Label>
              <Form.Control
                type="text"
                data-id="Portfolio"
                placeholder="Portfolio Name"
                onChange={handleUpdateInputChange}
                value={updateForm.Portfolio}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid portfolio name.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                data-id="FullName"
                placeholder="Full Name"
                onChange={handleUpdateInputChange}
                value={updateForm.FullName}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid full name.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-5">
              <Form.Label>Full Address</Form.Label>
              <Form.Control
                type="text"
                data-id="Address"
                placeholder="Full Address"
                onChange={handleUpdateInputChange}
                value={updateForm.Address}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid address.
              </Form.Control.Feedback>
            </Form.Group>

            {updateMsg && <p className="text-success mb-3">{updateMsg}</p>}

            {error && (
              <p className="text-danger mb-3">
                {error + ", it seems that internet is not working."}
              </p>
            )}

            <Row className="mb-5">
              <Col className="d-flex justify-content-end">
                <Button
                  variant="outline-primary"
                  type="submit"
                  className="w-100"
                >
                  Update Portfolio
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default CreatePortfolio;

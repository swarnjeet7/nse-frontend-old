import { useState, useEffect } from "react";
import _ from "lodash";
import { Container, Form, Row, Col, Table } from "react-bootstrap";
import Loader from "../loader";
import Button from "../../molecule/button";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import config from "../../config";

function ShowPivots() {
  const [form, setForm] = useState({
    from: "05/23/2022",
    Portfolio: "",
  });
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState("");
  const [portfolios, setPortfolios] = useState([]);
  const DEFAULT_PORTFOLIO_VALUE = "Select portfolio";

  useEffect(() => {
    fetch(`${config.BASE_API_URL}/portfolio`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        setPortfolios(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handleDateChange = (newDate) => {
    setForm((prevForm) => ({
      ...prevForm,
      from: newDate.format("MM/DD/yyyy"),
    }));
  };

  const handlePortfolioChange = (event) => {
    let value = event.target.value;
    if (DEFAULT_PORTFOLIO_VALUE === value) {
      value = "";
    }
    setForm((prevForm) => ({
      ...prevForm,
      Portfolio: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoader(true);
    const formData = _.reduce(
      form,
      (str, value, key) => {
        return (str += `${key}=${value}&`);
      },
      ""
    );
    const url = `${config.BASE_API_URL}/pivots?${formData.slice(0, -1)}`;
    fetch(url, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res.data);
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
        console.error(error);
      });
  };

  return (
    <Container fluid>
      <div>
        <Form noValidate onSubmit={handleSubmit}>
          <Row className="mb-5">
            <Col>
              <Form.Group controlId="date">
                <Form.Label>Select date *</Form.Label>
                <DateRangePicker
                  initialSettings={{
                    singleDatePicker: true,
                    startDate: form.from,
                  }}
                  onCallback={handleDateChange}
                >
                  <input type="text" className="form-control col-4" />
                </DateRangePicker>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="select">
                <Form.Label>{DEFAULT_PORTFOLIO_VALUE}</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={handlePortfolioChange}
                  value={form.Portfolio}
                >
                  <option value={null}>{DEFAULT_PORTFOLIO_VALUE}</option>
                  {portfolios.map((item) => (
                    <option value={item.Portfolio} key={item._id}>
                      {item.Portfolio}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="select" className="mb-5">
                <Form.Label>
                  <span className="opacity-zero">Click the button</span>
                </Form.Label>
                <Button
                  variant="outline-primary"
                  className="w-100"
                  fill="#0d6efd"
                  isWaiting={loader}
                >
                  Submit
                </Button>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </div>
      <main style={{ overflow: "auto" }}>
        {loader ? (
          <Loader type="circle" fill="#0d6efd" />
        ) : data.length ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Series</th>
                <th>R3</th>
                <th>R2</th>
                <th>R1</th>
                <th>Pivots</th>
                <th>S1</th>
                <th>S2</th>
                <th>S3</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, i) => {
                const { Symbol, Series, R3, R2, R1, P, S1, S2, S3 } = item;
                return (
                  <tr key={`${Symbol}${i}`}>
                    <td>{Symbol}</td>
                    <td>{Series}</td>
                    <td>{R3}</td>
                    <td>{R2}</td>
                    <td>{R1}</td>
                    <td>{P}</td>
                    <td>{S1}</td>
                    <td>{S2}</td>
                    <td>{S3}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        ) : (
          <h4 className="text-center">
            Please select the date from date picker menu and submit the form
          </h4>
        )}
      </main>
    </Container>
  );
}

export default ShowPivots;

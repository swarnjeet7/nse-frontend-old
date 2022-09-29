import { useState } from "react";
import { Container, Form, Row, Col } from "react-bootstrap";
import Loader from "../loader";
import Button from "../../molecule/button";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import config from "../../config";

function CreatePivot() {
  const [date, setDate] = useState("05/23/2022");
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("");

  const handleDateChange = (newDate) => {
    setDate(newDate.format("MM/DD/yyyy"));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoader(true);

    const url = `${config.BASE_API_URL}/pivots`;
    fetch(url, {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({ from: date }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setMessage(res.message);
        // setLoader(false);
      })
      .catch((error) => {
        // setLoader(false);
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
                    startDate: date,
                  }}
                  onCallback={handleDateChange}
                >
                  <input type="text" className="form-control col-4" />
                </DateRangePicker>
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
        ) : (
          <h4 className="text-center">
            {message
              ? message
              : "Please select the date from date picker menu and submit the form"}
          </h4>
        )}
      </main>
    </Container>
  );
}

export default CreatePivot;

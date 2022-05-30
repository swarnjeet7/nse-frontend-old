import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

function ImportFile(props) {
  const [error, setError] = useState(null);
  const [file, setFiles] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!file) {
      setError(true);
    }
    const formData = new FormData();
    formData.append("file", file);
    setError(true);

    fetch("http://localhost:8080/cash-reports/bhavcopy", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChange = (event) => {
    const file = event.target?.files[0];
    setFiles(file);
  };

  return (
    <Container>
      <Row className="gx-5">
        <h1 className="text-center p-5">Import {props.title} Bhavcopy</h1>
        <Col
          xs={{ span: 8, offset: 1 }}
          sm={{ span: 6, offset: 3 }}
          md={{ span: 4, offset: 4 }}
        >
          <Form noValidate validated={error} onSubmit={handleSubmit}>
            <Form.Group controlId="formFile" className="mb-5">
              <Form.Label className="mb-3">
                Plesae import the today's Bhavcopy file as in csv format
              </Form.Label>
              <Form.Control
                type="file"
                required
                name="file"
                onChange={handleChange}
              />
            </Form.Group>

            <Row>
              <Col className="d-flex justify-content-end">
                <div className="d-grid gap-2">
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default ImportFile;

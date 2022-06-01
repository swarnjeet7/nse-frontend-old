import React, { useState, useRef } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Toast,
  ToastContainer,
} from "react-bootstrap";

function ImportFile(props) {
  const inputRef = useRef(null);
  const [error, setError] = useState(null);
  const [file, setFiles] = useState(null);
  const [msg, setMsg] = useState("");
  const [show, setShow] = useState(false);
  const { title } = props;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!file) {
      setError(true);
    }
    const formData = new FormData();
    formData.append("file", file);
    setError(true);

    const url = `http://localhost:8080/${
      title === "FO" ? "fo-reports" : "cash-reports"
    }/bhavcopy`;

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          setError(null);
          setFiles(null);
          setMsg(res.message);
          setShow(true);
          inputRef.current.value = "";
        }
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
    <>
      <Container>
        <Row className="gx-5">
          <h1 className="text-center p-5">Import {title} Bhavcopy</h1>
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
                  ref={inputRef}
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
      <ToastContainer className="p-3" position={{ position: "top-center" }}>
        <Toast
          onClose={() => setShow(false)}
          show={show}
          delay={3000}
          autohide
          bg="Success"
          className="mb-3"
        >
          <Toast.Header>
            <strong className="me-auto">File upload status</strong>
          </Toast.Header>
          <Toast.Body>
            <strong className="me-auto">{msg}</strong>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default ImportFile;

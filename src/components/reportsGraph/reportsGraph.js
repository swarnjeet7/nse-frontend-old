import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import { Form, Row, Col } from "react-bootstrap";
import Button from "../../molecule/button";
import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import _ from "lodash";
import Loader from "../loader";
import moment from "moment";
import "./graph.css";
import config from "../../config";

function ReportsGraph(props) {
  const [form, setForm] = useState({
    Symbol: "",
    from: "05/23/2022",
    to: "05/27/2022",
  });
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [symbols, setSymbols] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    fetch(`${config.BASE_API_URL}/symbols`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        setSymbols(res.data);
        setForm((prevForm) => {
          return {
            ...prevForm,
            Symbol: res.data[0].name,
          };
        });
      })
      .catch((err) => setError(err));
  }, []);

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
    const url = `${config.BASE_API_URL}/cash-reports/bhavcopy?${formData.slice(
      0,
      -1
    )}`;
    fetch(url, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        const data = res.data.map((row) => {
          const momentDate = moment(new Date(row.Timestamp));
          console.log("date", momentDate);
          const year = momentDate.year();
          const month = momentDate.month();
          const day = momentDate.day();
          return {
            date: `${day}-${month}-${year}`,
            [form.Symbol]: row.High,
          };
        });
        setData(data);
        setLoader(false);
      })
      .catch((error) => {
        console.error(error);
        setLoader(false);
      });
  };

  return (
    <>
      <Form noValidate onSubmit={handleSubmit}>
        <Row className="justify-content-md-center">
          <Col md="3">
            <Form.Group controlId="date" className="mb-3">
              <Form.Label>Symbol</Form.Label>
              <Form.Select
                aria-label="Floating label select example"
                value={form.Symbol}
                onChange={(event) => {
                  console.log(event.target.value);
                  setForm((prevForm) => ({
                    ...prevForm,
                    Symbol: event.target.value,
                  }));
                }}
              >
                {symbols.map((symbol) => (
                  <option value={symbol.name} key={symbol._id}>
                    {symbol.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md="3">
            <Form.Group controlId="date" className="mb-3">
              <Form.Label>Date</Form.Label>
              <DateRangePicker
                initialSettings={{
                  startDate: form.from,
                  endDate: form.to,
                }}
                onCallback={(start, end) => {
                  setForm((prevForm) => {
                    return {
                      ...prevForm,
                      from: start,
                      to: end,
                    };
                  });
                }}
              >
                <input type="text" className="form-control col-4" required />
              </DateRangePicker>
            </Form.Group>
          </Col>
          <Col md="3">
            <Form.Group controlId="date" className="mb-3">
              <Form.Label>
                <span style={{ color: "transparent" }}>button</span>
              </Form.Label>
              <Button
                variant="outline-primary"
                className="w-100"
                isWaiting={loader}
              >
                Submit
              </Button>
            </Form.Group>
          </Col>
        </Row>
      </Form>

      <main>
        {error && <p>{error.message}</p>}

        {loader ? (
          <Loader type="circle" fill="#0d6efd" />
        ) : (
          !_.isEmpty(data) && (
            <LineChart
              className="mt-4 m-auto"
              width={800}
              height={500}
              data={data}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey={form.Symbol}
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          )
        )}
      </main>
    </>
  );
}

export default ReportsGraph;

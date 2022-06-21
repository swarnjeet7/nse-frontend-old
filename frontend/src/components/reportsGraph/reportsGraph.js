import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import _ from "lodash";
import Loader from "../loader";
import moment from "moment";
import "./graph.css";

function ReportsGraph(props) {
  const [form, setForm] = useState({
    Symbol: "",
    from: "05/23/2022",
    to: "05/27/2022",
  });
  const [data, setData] = useState([]);
  const [error, setError] = useState([]);
  const [symbols, setSymbols] = useState([]);
  const [loader, setLoader] = useState(false);

  const options = {
    title: {
      text: `${form.Symbol} line graph from ${moment(
        new Date(form.from)
      ).format("DD MMM")} to ${moment(new Date(form.to)).format("DD MMM")}`,
    },
    yAxis: {
      title: {
        text: "Price range",
      },
    },
    xAxis: {
      type: "datetime",
      labels: {
        formatter: function () {
          return Highcharts.dateFormat("%e %b", new Date(this.value));
        },
      },
    },
    // xAxis: {
    //   type: "datetime",
    //   dateTimeLabelFormats: {
    //     day: "%e%b%y",
    //     month: "%b '%y",
    //   },
    // },
    series: [
      {
        data,
      },
    ],
  };

  useEffect(() => {
    fetch("/symbol")
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
    const url = `/cash-reports/bhavcopy?${formData.slice(0, -1)}`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        const data = res.data.map((row) => {
          const momentDate = moment(new Date(row.Timestamp));
          const year = momentDate.year();
          const month = momentDate.month();
          const day = momentDate.day();
          const date = Date.UTC(year, month, day);
          return [date, row.High];
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
              <Button variant="outline-primary" type="submit" className="w-100">
                Submit
              </Button>
            </Form.Group>
          </Col>
        </Row>
      </Form>

      <main>
        {error && <p>{error.message}</p>}

        {loader ? (
          <Loader />
        ) : (
          !_.isEmpty(data) && (
            <HighchartsReact highcharts={Highcharts} options={options} />
          )
        )}
      </main>
    </>
  );
}

export default ReportsGraph;

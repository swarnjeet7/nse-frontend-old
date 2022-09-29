import {
  Container,
  Form,
  Row,
  Col,
  Button,
  CloseButton,
} from "react-bootstrap";
import { useEffect, useState, useRef } from "react";
import SearchComponent from "../searchComponent/searchComponent";
import config from "../../config";

function ManagePortfolio() {
  const activeBtn = useRef(null);
  const [portfolios, setPortfolios] = useState([]);
  const [Scripts, setScripts] = useState([]);
  const [loader, setLoader] = useState(false);
  const [symbols, setSymbols] = useState([]);

  const handleSubmit = () => {};

  const handleEditPortfolioScript = (portfolio) => {
    const { Portfolio } = portfolio;
    fetch(`${config.BASE_API_URL}/portfolioScript?Portfolio=${Portfolio}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          setScripts(res.data.Scripts);
        }
      });
  };

  const handleRemoveSymbol = (symbol, i) => {
    Scripts.splice(i, 1);
    setScripts([...Scripts]);
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
    fetch(`${config.BASE_API_URL}/symbols`)
      .then((res) => res.json())
      .then((res) => {
        setSymbols(res.data);
      });
  }, []);

  const getAllPortfolio = () => {
    fetch(`${config.BASE_API_URL}/portfolio`)
      .then((res) => res.json())
      .then((res) => {
        setPortfolios(res.data);
      });
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <div
            className="border-bottom mb-3"
            style={{
              height: 33,
            }}
          >
            Portfolio Map
          </div>
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
                  <div
                    style={{
                      background: "white",
                      transform: "translate(0, 50%)",
                    }}
                  >
                    <Button
                      variant="outline-dark"
                      size="sm"
                      onClick={(event) => {
                        handleClassActive(event.target);
                        handleEditPortfolioScript(portfolio);
                      }}
                    >
                      {portfolio.Portfolio}
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        </Col>
        <Col className="border-right">
          <div className="border-bottom mb-3">
            <Row>
              <Col>Portfolio Scripts</Col>
              <Col>
                <SearchComponent data={symbols} isEnable={!activeBtn.current} />
              </Col>
            </Row>
          </div>

          {Scripts.length ? (
            Scripts.map((symbol, i) => (
              <Button variant="outline-primary" className="mr-2" key={symbol}>
                <span className="pr-2">{symbol} </span>{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-x"
                  viewBox="0 0 16 16"
                  onClick={() => handleRemoveSymbol(symbol, i)}
                >
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
              </Button>
            ))
          ) : activeBtn?.current ? (
            <p>There is no scripts found, Please add symbol</p>
          ) : null}
        </Col>
      </Row>
    </Container>
  );
}

export default ManagePortfolio;

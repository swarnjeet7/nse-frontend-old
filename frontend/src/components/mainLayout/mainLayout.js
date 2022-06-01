import Header from "../header";
import { Outlet } from "react-router-dom";
import { Breadcrumb, Container } from "react-bootstrap";
import _ from "lodash";
import { useEffect, useState } from "react";

function MainLayout(props) {
  const pathname = window.location.pathname;
  const [urlParams, setUrlParams] = useState(
    _.remove(pathname.split("/"), _.identity)
  );

  useEffect(() => {
    if (pathname !== window.location.pathname) {
      setUrlParams(_.remove(window.location.pathname.split("/"), _.identity));
    }
  }, [pathname]);

  return (
    <>
      <Header />
      <Container
        fluid
        className="pt-5 pb-5 mt-5"
        style={{ height: "calc(100vh - 56px)" }}
      >
        <Breadcrumb>
          <Breadcrumb.Item href="/dashboard">Home</Breadcrumb.Item>
          {urlParams.map((url, i) => (
            <Breadcrumb.Item active key={i}>
              {_.capitalize(url)}
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>

        <Outlet {...props} />
      </Container>
    </>
  );
}

export default MainLayout;

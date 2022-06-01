import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard";
import Login from "./components/login";
import ProtectedRoutes from "./components/ProtectedRoutes";
import ImportFile from "./components/importFile/importFile";
import ReportsBhavcopy from "./components/reportsBhavcopy";
import GainersLoosers from "./components/gainersLoosers";
import ReportsGraph from "./components/reportsGraph";
import ShowPivots from "./components/pivots";
import Portfolio from "./components/portfolio";
import User from "./components/user";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/import">
            <Route path="cash-bhavcopy" element={<ImportFile title="Cash" />} />
            <Route path="fo-bhavcopy" element={<ImportFile title="FO" />} />
          </Route>

          <Route path="/cash-reports">
            <Route
              path="bhavcopy"
              element={<ReportsBhavcopy title="Cash Reports" isCashBhavcopy />}
            />
            <Route path="gainers-loosers" element={<GainersLoosers />} />
            <Route path="graph" element={<ReportsGraph />} />
          </Route>

          <Route path="/fo-reports">
            <Route path="bhavcopy" element={<ReportsBhavcopy title="FO" />} />
          </Route>

          <Route path="/pivots">
            <Route path="show" element={<ShowPivots />} />
          </Route>

          <Route path="/portfolio">
            <Route path="create" element={<Portfolio.CreatePortfolio />} />
            <Route path="edit" element={<Portfolio.EditPortfolio />} />
          </Route>

          <Route path="/user">
            <Route path="create" element={<User.CreateUser />} />
            <Route path="edit" element={<User.EditUser />} />
          </Route>
        </Route>
        <Route path="*" element={() => "404 not found"} />
      </Routes>
    </div>
  );
}

export default App;

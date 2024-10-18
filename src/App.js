import "./App.css";
import React from "react";
import Home from "./Pages/Home/Home";
import Layout from "./Pages/Layout/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Transaction from "./Pages/Transaction/Transaction";
import Settlement from "./Pages/SettlementSection/Settlement";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/transactions" element={<Transaction />} />
            <Route path="/settlements" element={<Settlement />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;

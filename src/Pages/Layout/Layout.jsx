import React from "react";
import styles from "./layout.module.css";
import { Col, Row } from "react-bootstrap";
import Header from "../../Componenets/Header/Header";
import Sidebar from "../../Componenets/Sidebar/Sidebar";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Row className="g-0">
        <Col className="p-0" md={2}>
          <Sidebar />
        </Col>
        <Col className="p-0" md={10}>
        <Header/>
          <div className={styles.main_section}>{children}</div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Layout;

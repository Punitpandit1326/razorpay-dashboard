import React from "react";
import { FiInfo } from "react-icons/fi";
import styles from "./insight.module.css";
import { Col, Row } from "react-bootstrap";

const Insights = () => {
  return (
    <React.Fragment>
      <div className={styles.hero_Section}>
        <div className={styles.header}>
          <h3>Top Insights</h3>
          <select className={styles.timeSelect}>
            <option>Last week</option>
            <option>Last month</option>
            <option>Last year</option>
          </select>
        </div>

        <Row>
          <Col>
            <div className={styles.box}>
              <div>
                <h6>
                  Payment count <FiInfo />
                </h6>
                <span>Last Week</span>
                <h6 className="pt-3">0</h6>
              </div>
              <div className={styles.right_box}></div>
            </div>
          </Col>
          <Col>
            <div className={styles.box}>
              <div>
                <h6>
                  Payment failure count <FiInfo />
                </h6>
                <span>Last Week</span>
                <h6 className="pt-3">0</h6>
              </div>
              <div className={styles.right_box}></div>
            </div>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default Insights;

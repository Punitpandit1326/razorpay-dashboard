import React, { useState } from "react";
import styles from "./settle.module.css";
import { LuCopy } from "react-icons/lu";
import { Row, Col, Form } from "react-bootstrap";
import { CiClock2, CiShare1 } from "react-icons/ci";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { IoMdRefresh, IoMdInformationCircleOutline } from "react-icons/io";
const Settlement = () => {
  const [payments, setPayments] = useState([
    {
      settle: "setl_OfxH9vz9sRvqsF",
      amount: "₹ 82.00",
      UTR: "CB0054156688",
      recipt: "",
      createdOn: "	28 Sep 2024, 05:03:09 pm",
      status: "Processed",
      anchor: "Details",
    },
  ]);

  return (
    <React.Fragment>
      <div className={styles.settlement_header}>
        <div className={styles.header}>
          <div className="d-flex gap-2">
            <h6>Overview</h6>
            <span>
              <CiClock2 /> 13 mins ago
            </span>
            <p>
              <IoMdRefresh /> Refresh
            </p>
          </div>
          <div className="d-flex gap-2">
            <p>
              <CiClock2 /> My Settlement Cycle
            </p>
            <p>
              Documentation <CiShare1 />
            </p>
          </div>
        </div>
        <hr />

        <Row>
          <Col>
            <div className={styles.box}>
              <p>
                Upcoming settlement
                <IoMdInformationCircleOutline />
              </p>
              <h6>₹ 0.00</h6>
            </div>
          </Col>
          <Col>
            <div className={styles.box}>
              <p>
                Settlement due today
                <IoMdInformationCircleOutline />
              </p>
              <h6>₹ 0.00</h6>
            </div>
          </Col>
          <Col>
            <div className={styles.box}>
              <p>
                Previous settlement <IoMdInformationCircleOutline />
              </p>
              <div>
                <h6>₹82.01</h6>
                <div className={styles.statusBadge}>
                  <IoMdInformationCircleOutline /> Processed
                </div>
              </div>
            </div>
          </Col>
          <Col>
            <div className={styles.box}>
              <p>
                Upcoming settlement
                <IoMdInformationCircleOutline />
              </p>
              <h6>NA</h6>
            </div>
          </Col>
        </Row>
      </div>

      <div className={styles.settle}>
        <h6>Settlement</h6>
        <hr />
        <Form>
          <Row className="mb-3 mx-2">
            <Form.Group as={Col} md="2" controlId="validationCustom01">
              <Form.Label>Duration</Form.Label>
              <Form.Select required>
                <option value="">All Time</option>
                <option value="1">1 Month</option>
                <option value="3">3 Months</option>
                <option value="6">6 Months</option>
                <option value="12">12 Months</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} md="2" controlId="validationCustom02">
              <Form.Label>UTR number</Form.Label>
              <Form.Control required type="number" />
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustomUsername">
              <Form.Label>Settllement ID</Form.Label>
              <Form.Control required type="text" />
            </Form.Group>
            <Form.Group as={Col} md="2" controlId="validationCustomUsername">
              <Form.Label>Status</Form.Label>
              <Form.Select required>
                <option value="">All Time</option>
                <option value="1">1 Month</option>
                <option value="3">3 Months</option>
                <option value="6">6 Months</option>
                <option value="12">12 Months</option>
              </Form.Select>
            </Form.Group>

            <Col>
              <div className={styles.btn}>
                <button>Search</button>
                <button>Clear</button>
              </div>
            </Col>
          </Row>
        </Form>

        {/* --------table---------- */}
        <div className={styles.campaings_table_section}>
          <table hover className="table campaings-table">
            <thead>
              <tr>
                <th className="text-start" scope="col">
                  Created on
                </th>
                <th scope="col" className="text-center">
                  Settlment ID
                </th>
                <th scope="col">
                  UTR number <IoMdInformationCircleOutline />
                </th>
                <th scope="col">Net SEttlement</th>
                <th scope="col">Status</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {payments.length > 0 ? (
                payments.map((payment, index) => (
                  <tr key={index} className={styles.tableRow}>
                    <td>{payment.createdOn}</td>
                    <td className="text-center">{payment.settle}
                    <LuCopy
                        className={styles.copyIcon}
                        onClick={() =>
                          navigator.clipboard.writeText(payment.settle)
                        }/>
                    </td>
                    <td className="text-center">
                      {payment.UTR}{" "}
                      <LuCopy
                        className={styles.copyIcon}
                        onClick={() =>
                          navigator.clipboard.writeText(payment.UTR)
                        }
                      />
                    </td>
                    <td className="text-center">
                      {payment.amount} <IoMdInformationCircleOutline />
                    </td>
                    <td className="text-center">
                      <div className={styles.statusBadge}>
                        <IoMdInformationCircleOutline /> {payment.status}
                      </div>
                    </td>
                    <td className="text-primary">
                      {payment.anchor} <MdOutlineKeyboardArrowRight />
                    </td>
                
                    
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    style={{
                      textAlign: "center",
                      padding: "8rem 0",
                      borderBottom: "none",
                    }}
                  >
                    <div className="no-payment">
                      <img
                        src="/img/find.svg"
                        alt="No payment"
                        style={{ width: "100px", marginBottom: "20px" }}
                      />
                      <h6>No payment in selected duration</h6>
                      <p>Search using different keywords or time duration</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Settlement;

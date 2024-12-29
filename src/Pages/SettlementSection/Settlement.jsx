import React, { useEffect, useState } from "react";
import styles from "./settle.module.css";
import { LuCopy } from "react-icons/lu";
import { Row, Col, Form } from "react-bootstrap";
import { CiClock2, CiShare1 } from "react-icons/ci";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { IoMdRefresh, IoMdInformationCircleOutline } from "react-icons/io";
import { format } from "date-fns";
import FormatAmount from "../../Componenets/Formatting/FormatAmount";
import { API_URL } from "../../config";
const Settlement = () => {
  const [currentBalance, setCurrentBalance] = useState("0.00");
  const [settlementDueToday, setSettlementDueToday] = useState("0.00");
  const [previousSettlement, setPreviousSettlement] = useState("0.00");
  const [settlementData, setSettlementData] = useState([]);
  const [selectedRange, setSelectedRange] = useState("All Time");

  const handleDropdownChange = (event) => {
    setSelectedRange(event.target.value); // Update selected range
  };

  useEffect(() => {
    const fetchSettlementOverviewData = async () => {
      try {
        const response = await fetch(
          `${API_URL}settlement-overview-listing`
        );
        const result = await response.json();

        if (result.status === "success") {
          setCurrentBalance(result.data.current_balance);
          setSettlementDueToday(result.data.settlement_due_today);
          setPreviousSettlement(result.data.previous_settlement);
        } else {
          console.error("Failed to fetch settlement data");
        }
      } catch (error) {
        console.error("Error fetching settlement data:", error);
      }
    };

    fetchSettlementOverviewData();
  }, []);

  useEffect(() => {
    const fetchSettlementData = async () => {
      try {
        const response = await fetch(
          `${API_URL}settlement-payments-listing?filters[duration]=${selectedRange}`
        );
        const result = await response.json();

        if (result.status === "success") {
          setSettlementData(result.data);
        } else {
          console.error("Failed to fetch settlement data");
        }
      } catch (error) {
        console.error("Error fetching settlement data:", error);
      }
    };

    fetchSettlementData();
  }, [selectedRange]);
  // Conditional rendering: if settlementData is not available yet
  // if (!settlementData) {
  //   return <div>Loading...</div>; // Show a loading indicator while data is fetched
  // }
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
                Current balance
                <IoMdInformationCircleOutline />
              </p>
              <h6>₹ {<FormatAmount amount={parseFloat(currentBalance)} />}</h6>
            </div>
          </Col>
          <Col>
            <div className={styles.box}>
              <p>
                Settlement due today
                <IoMdInformationCircleOutline />
              </p>
              <h6>
                ₹ {<FormatAmount amount={parseFloat(settlementDueToday)} />}
              </h6>
            </div>
          </Col>
          <Col>
            <div className={styles.box}>
              <p>
                Previous settlement <IoMdInformationCircleOutline />
              </p>
              <div>
                <h6>
                  ₹ {<FormatAmount amount={parseFloat(previousSettlement)} />}
                </h6>
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
              <Form.Select
                required
                value={selectedRange}
                onChange={handleDropdownChange}
              >
                <option value="All Time">All Time</option>
                <option value="Last 7 days">Last 7 days</option>
                <option value="Last 30 days">Last 30 days</option>
                <option value="Last 90 days">Last 90 days</option>
                <option value="Jan 2024 - till date">
                  Jan 2024 - till date
                </option>
                <option value="This financial year">This financial year</option>
                <option value="Custom">Custom</option>
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
                <th scope="col" className="text-start">
                  Settlment ID
                </th>
                <th scope="col" className="text-start">
                  UTR number <IoMdInformationCircleOutline />
                </th>
                <th scope="col" className="text-start">
                  Net SEttlement
                </th>
                <th scope="col" className="text-start">
                  Status
                </th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {settlementData.length > 0 ? (
                settlementData.map((payment, index) => (
                  <tr key={index} className={styles.tableRow}>
                    <td>
                      {format(
                        new Date(payment.created_on),
                        "MMM dd yyyy, hh:mm a"
                      )}
                    </td>
                    <td>
                      {payment.settlement_id}
                      <LuCopy
                        className={styles.copyIcon}
                        onClick={() =>
                          navigator.clipboard.writeText(payment.settlement_id)
                        }
                      />
                    </td>
                    <td>
                      {payment.utr_no}{" "}
                      <LuCopy
                        className={styles.copyIcon}
                        onClick={() =>
                          navigator.clipboard.writeText(payment.utr_no)
                        }
                      />
                    </td>
                    <td>
                      {
                        <FormatAmount
                          amount={parseFloat(payment.net_Settlement)}
                        />
                      }{" "}
                      <IoMdInformationCircleOutline />
                    </td>
                    <td>
                      <div className={styles.statusBadge}>
                        <IoMdInformationCircleOutline /> {payment.status}
                      </div>
                    </td>
                    <td className="text-primary">
                      Details <MdOutlineKeyboardArrowRight />
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

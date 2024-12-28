import React, { useEffect, useState } from "react";
import styles from "./table.module.css";
import "./table.css";
import { IoSearchOutline } from "react-icons/io5";
import { Form, Row, Col } from "react-bootstrap";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { format } from "date-fns";

const PaymentsTable = () => {
  const [active, setActive] = useState("payments");
  const [paymentsTable, setPaymentsTable] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedRange, setSelectedRange] = useState("Today");
  const [payments, setPayments] = useState([
    {
      id: "order_P2ZTk41UsnI8Ce",
      amount: "₹ 50,000.00",
      attempt: "0",
      recipt: "",
      createdOn: "	28 Sep 2024, 05:03:09 pm",
      status: "Created",
    },
  ]);

  const handleDropdownChange = (event) => {
    setSelectedRange(event.target.value); // Update selected range
  };

  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/transaction-payments-listing?filters[duration]=${selectedRange}`
        );
        const result = await response.json();

        if (result.status === "success") {
          setTransactions(result.data);
        } else {
          console.error("Failed to fetch transactions");
        }
      } catch (error) {
        console.error("Error fetching transaction data:", error);
      }
    };

    fetchTransactionData();
  }, [selectedRange]);

  return (
    <React.Fragment>
      <div className={styles.main_box}>
        <div className={styles.heading}>
          <h6
            className={active === "payments" ? styles.activeText : ""}
            onClick={() => setActive("payments")}
          >
            {" "}
            Payments
          </h6>
          <h6
            className={active === "orders" ? styles.activeText : ""}
            onClick={() => setActive("orders")}
          >
            {" "}
            Orders
          </h6>
        </div>
        <hr />

        <div className={styles.content}>
          {active === "payments" && (
            <div>
              <div className={styles.section}>
                <div className="d-flex gap-2">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={selectedRange}
                    onChange={handleDropdownChange}
                  >
                    <option value="Today">Today</option>
                    <option value="Last 7 days">Last 7 days</option>
                    <option value="Last 30 days">Last 30 days</option>
                    <option value="Last 90 days">Last 90 days</option>
                    <option value="Jan 2024 - till date">
                      Jan 2024 - till date
                    </option>
                    <option value="This financial year">
                      This financial year
                    </option>
                    <option value="Custom">Custom</option>
                  </select>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>Payment method</option>
                    <option value="1">All</option>
                    <option value="2">Created</option>
                    <option value="3">Authenticated</option>
                  </select>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>Status: All</option>
                    <option value="1">Created</option>
                    <option value="2">Authrozied</option>
                    <option value="3">Authenticated</option>
                  </select>
                </div>
                <div className={styles.input_section}>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>Payment ID</option>
                    <option value="1">Order ID</option>
                    <option value="2">Payment Number</option>
                    <option value="3">Notes</option>
                  </select>
                  <input type="text" placeholder="search" />
                  <button>
                    <IoSearchOutline size={18} />
                  </button>
                </div>
              </div>

              <div className="campaings-table-section">
                <table className="table campaings-table">
                  <thead>
                    <tr>
                      <th scope="col" className="text-start">
                        Payment ID
                      </th>
                      <th scope="col" className="text-start">
                        Bank RRN
                      </th>
                      <th scope="col" className="text-start">
                        Customer Details
                      </th>
                      <th scope="col" className="text-start">
                        Created on
                      </th>
                      <th scope="col" className="text-start">
                        Amount
                      </th>
                      <th scope="col" className="text-start">
                        Status
                      </th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.length > 0 ? (
                      transactions.map((transaction, index) => (
                        <tr key={transaction.id}>
                          <td className="text-start p-0">
                            {transaction.payment_id}
                          </td>
                          <td className="p-0">
                            <p className="text-start mb-0">{transaction.bank_rrn}</p>
                            <p className="text-start small-text">Credit Card</p>
                          </td>
                          <td className="p-0">
                            <p className="text-start mb-0">{transaction.customer_detail}</p>
                            <p className="text-start small-text">{transaction.customer_email}</p>
                          </td>
                          <td className="p-0">
                            {format(
                              new Date(transaction.created_on),
                              "MMM dd yyyy, hh:mm a"
                            )}
                          </td>
                          <td className="p-0">₹{parseFloat(transaction.amount).toFixed(2)}</td>
                          <td>
                            <div className={styles.statusBadge}>
                              <IoMdInformationCircleOutline />{" "}
                              {transaction.status}
                            </div>
                          </td>
                          <td className="text-primary p-0">
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
                            <p>
                              Search using different keywords or time duration
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        <div className={styles.content_order}>
          {active === "orders" && (
            <div>
              <Form>
                <Row className="mb-3">
                  <Form.Group as={Col} md="2" controlId="validationCustom01">
                    <Form.Label>Order Id</Form.Label>
                    <Form.Control required type="number" />
                  </Form.Group>
                  <Form.Group as={Col} md="3" controlId="validationCustom02">
                    <Form.Label>Recipt</Form.Label>
                    <Form.Control required type="number" />
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md="3"
                    controlId="validationCustomUsername"
                  >
                    <Form.Label>Notes</Form.Label>
                    <Form.Control required type="text" />
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md="3"
                    controlId="validationCustomUsername"
                  >
                    <Form.Label>Status</Form.Label>
                    <Form.Control required type="text" />
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md="1"
                    controlId="validationCustomUsername"
                  >
                    <Form.Label>Count</Form.Label>
                    <Form.Control required type="number" />
                  </Form.Group>
                </Row>
              </Form>

              <div className={styles.btn}>
                <button>Search</button>
                <button>Clear</button>
              </div>

              <div className={styles.campaings_table_section}>
                <table className="table campaings-table">
                  <thead>
                    <tr>
                      <th scope="col" className="text-start">
                        Payment ID
                      </th>
                      <th scope="col">Amount</th>
                      <th scope="col">Attempts</th>
                      <th scope="col">Recipt</th>
                      <th scope="col">Created on</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.length > 0 ? (
                      payments.map((payment, index) => (
                        <tr key={index}>
                          <td className="text-primary">{payment.id}</td>
                          <td className="text-center">{payment.amount}</td>
                          <td className="text-center">{payment.attempt}</td>
                          <td className="text-center">{payment.recipt}</td>
                          <td className="text-center">{payment.createdOn}</td>
                          <td>{payment.status}</td>
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
                            <p>
                              Search using different keywords or time duration
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default PaymentsTable;

import React, { useState } from "react";
import { FiInfo } from "react-icons/fi";
import styles from "./overview.module.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import ReactApexChart from "react-apexcharts";

const PaymentsOverview = () => {
  const [activeTab, setActiveTab] = useState("collect");
  const [series] = useState([{
    name: "Desktops",
    data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
  }]);

  const [options] = useState({
    chart: {
      height: 350,
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },

    grid: {
      row: {
        colors: ['transparent'], 
      },
    },
    xaxis: {
      categories: ['Oct 03', 'Oct 04', 'Oct 05', 'Oct 06', 'Oct 07', 'Oct 08', 'Oct 09'],
    }
  });

  return (
    <div className={styles.paymentsOverviewContainer}>
      <div className={styles.header}>
        <h3>Payments Overview</h3>
        <select className={styles.timeSelect}>
          <option>Last week</option>
          <option>Last month</option>
          <option>Last year</option>
        </select>
      </div>

      <div className={`${styles.overviewContent}`}>
        <div className={`${styles.collectedAmount}  ${
            activeTab === "collect" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("collect")}
        >
          <p>
            Collected Amount{" "}
            <OverlayTrigger
              placement="bottom"
              overlay={
                <Tooltip
                  id="tooltip-info"
                  style={{ fontFamily: "inter", fontSize: ".75rem" }}
                >
                  Amount Collect in your Razorpay balance and to be deposit in
                  your bank account
                </Tooltip>
              }
            >
              <span>
                <FiInfo style={{ cursor: "pointer" }} />
              </span>
            </OverlayTrigger>
          </p>

          <h2>
            <span className="text-secondary">₹ </span>
            <span className="text-black" style={{ fontSize: "1.5rem" }}>
              0
            </span>
            <span className="text-secondary">.00</span>
          </h2>
        </div>
        <div
          className={`${styles.refunds} ${
            activeTab === "Refunds" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("Refunds")}
        >
          <p>
            Refunds{" "}
            <OverlayTrigger
              placement="bottom"
              overlay={
                <Tooltip
                  id="tooltip-info"
                  style={{ fontFamily: "inter", fontSize: ".75rem" }}
                >
                  Amount reserved to customer(s) bank account
                </Tooltip>
              }
            >
              <span>
                <FiInfo style={{ cursor: "pointer" }} />
              </span>
            </OverlayTrigger>
          </p>

          <h3>--</h3>
        </div>
        <div
          className={`${styles.orders} ${
            activeTab === "Orders" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("Orders")}
        >
          <p>
            Orders{" "}
            <OverlayTrigger
              placement="bottom"
              overlay={
                <Tooltip
                  id="tooltip-info"
                  style={{ fontFamily: "inter", fontSize: ".75rem" }}
                >
                  Amount reserved to customer(s) bank account
                </Tooltip>
              }
            >
              <span>
                <FiInfo style={{ cursor: "pointer" }} />
              </span>
            </OverlayTrigger>
          </p>
          <h3>--</h3>
        </div>
      </div>


      <div id="chart">
        <ReactApexChart options={options} series={series} type="line" height={350} />
      </div>
    </div>
  );
};

export default PaymentsOverview;

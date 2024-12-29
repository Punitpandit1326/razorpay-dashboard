import React, { useEffect, useState } from "react";
import { FiInfo } from "react-icons/fi";
import styles from "./overview.module.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import ReactApexChart from "react-apexcharts";
import FormatAmount from "../Formatting/FormatAmount";
import { API_URL } from "../../config";

const PaymentsOverview = () => {
  const [activeTab, setActiveTab] = useState("collect");
  
    const [collectedAmount, setCollectedAmount] = useState(0.00);
    const [orders, setOrders] = useState(0.00);
    const [refunds, setRefunds] = useState(0.00);
    const [selectedOption, setSelectedOption] = useState('Today');
    
  const [series] = useState([
    {
      name: "Desktops",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
    },
  ]);
  
    useEffect(() => {
      // Function to fetch data from your API
      const fetchData = async () => {
        try {
          const response = await fetch(`${API_URL}transaction-overview-listing?filters[duration]=${selectedOption}`);
          const result = await response.json();
          
          if (result.status === 'success') {
            setCollectedAmount(parseFloat(result.data?.collected_amount || 0.00));
            setOrders(result.data?.orders || 0.00);
            setRefunds(parseFloat(result.data?.refunds || 0.00));
          } else {
            console.error('Failed to fetch data');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      // Call the fetchData function when the component is mounted
      fetchData();
    }, [selectedOption]);
    
  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value); // Update selected range
  };

  const [options] = useState({
    chart: {
      height: 350,
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },

    grid: {
      row: {
        colors: ["transparent"],
      },
    },
    xaxis: {
      categories: [
        "Oct 03",
        "Oct 04",
        "Oct 05",
        "Oct 06",
        "Oct 07",
        "Oct 08",
        "Oct 09",
      ],
    },
  });

  return (
    <div className={styles.paymentsOverviewContainer}>
      <div className={styles.header}>
        <h3>Payments Overview</h3>
        <select className={styles.timeSelect}
                    value={selectedOption}
                    onChange={handleDropdownChange}>
          <option value="Today">Today</option>
          <option value="Last 7 days">Last 7 days</option>
          <option value="Last 30 days">Last 30 days</option>
          <option value="Last 90 days">Last 90 days</option>
          <option value="Jan 2024 - till date">Jan 2024 - till date</option>
          <option value="This financial year">This financial year</option>
          <option value="Custom">Custom</option>
        </select>
      </div>

      <div className={`${styles.overviewContent}`}>
        <div
          className={`${styles.collectedAmount}  ${
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
            <FormatAmount amount={parseFloat(collectedAmount)} />
            </span>
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

          <h3>
          <span className="text-secondary">₹ </span>
            <span className="text-black" style={{ fontSize: "1.5rem" }}>
          <FormatAmount amount={parseFloat(refunds)} />
            </span>
          </h3>
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
          <h3>
          <span className="text-secondary">₹ </span>
            <span className="text-black" style={{ fontSize: "1.5rem" }}>
          <FormatAmount amount={parseFloat(orders)} />
            </span>
          </h3>
        </div>
      </div>

      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height={350}
        />
      </div>
    </div>
  );
};

export default PaymentsOverview;

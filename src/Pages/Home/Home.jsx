import React, { useEffect, useState } from "react";
import styles from "./home.module.css";
import { Link } from "react-router-dom";
import { PiDotBold } from "react-icons/pi";
import { RxDotFilled } from "react-icons/rx";
import { FaHeadphones } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import Slider from "../../Componenets/Slider/Slider";
import Insights from "../../Componenets/Insights/Insights";
import PaymentsOverview from "../../Componenets/Payment/PaymentsOverview";
import { format } from "date-fns";

const Home = () => {
  const [userName, setUserName] = useState("John Doe");
  const [currentBalance, setCurrentBalance] = useState("0.00");
  const [status, setStatus] = useState("Processed");
  const [lastSettlement, setLastSettlement] = useState("0.00");
  const [depositDate, setDepositDate] = useState("2024-08-02");
  const currentDate = format(new Date(), 'EEE, MMM dd');

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
    });
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/dashboard-data-listing"
        );
        const result = await response.json();

        if (result.status === "success") {
          setUserName(result.data.user_name);
          setCurrentBalance(result.data.current_balance);
          setLastSettlement(result.data.last_settlement);
          setStatus(result.data.status);
          setDepositDate(result.data.deposit_date);
        } else {
          console.error("Failed to fetch dashboard data");
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <React.Fragment>
      <div className={styles.hero_section}>
        <h1>Good Afternoon, {userName} !</h1>
        <p>{currentDate}</p>

        {/* -------balance-section---------- */}

        <div className={styles.balance_section}>
          <div className={styles.left_Section}>
            <h6>Current balance</h6>
            <p>
              {" "}
              <span className="text-secondary">₹ </span>{parseFloat(currentBalance).toFixed(0)}<span>.00</span>{" "}
            </p>
          </div>
          <div className={styles.right_Section}>
            <h6>Last Settlement</h6>
            <p>
              <span className="text-secondary">₹ </span>{parseFloat(lastSettlement).toFixed(0)}<span>.01</span>{" "}
            </p>
            <div className="d-flex gap-1">
              <h2>{status}</h2>
              <h3>
                <RxDotFilled /> Deposited in your bank account on {formatDate(depositDate)}{" "}
                <RxDotFilled />
              </h3>
              <Link to={""}>
                View all settlements <FaArrowRightLong />
              </Link>
              <img src="/img/processed.gif" alt="Example GIF" />
              <img src="/img/checkicon.svg" className={styles.icon_section} />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h1>Key Updates - You're all caught up!</h1>
      </div>
      <PaymentsOverview />
      <Insights />
      <Slider />

      <div className={styles.bottom_footer}>
        <div className="d-flex mt-2">
          {" "}
          <p> © 2017-2024 Copyright Razorpay</p>{" "}
          <PiDotBold className="text-secondary" />
          <Link to={""}>Terms of Use</Link>{" "}
          <PiDotBold className="text-secondary" />{" "}
          <Link to={""}>Privacy Policy</Link>
          <PiDotBold className="text-secondary" />
        </div>
        <div className={styles.help}>
          <h6>
            {" "}
            <FaHeadphones /> Help & Suppport
          </h6>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;

import React, { useState } from "react";
import styles from "./transaction.module.css";
import { IoWarningOutline,  IoCloseCircleOutline } from "react-icons/io5";
import {
  IoIosArrowDown,
  IoMdInformationCircleOutline,
  IoIosArrowForward
} from "react-icons/io";
import { BsDot } from "react-icons/bs";
import { Link } from "react-router-dom";
import PaymentsTable from "../../Componenets/PaymentsTable/PaymentsTable";
import { PiDotBold } from "react-icons/pi";
import { FaHeadphones } from "react-icons/fa";

const Transaction = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <React.Fragment>
      <div className={styles.overview_section}>
        <div className="d-flex gap-2">
          <h6>Overview </h6>
          <p onClick={toggleDropdown}>
            Today <IoIosArrowDown />{" "}
          </p>
        </div>
        {isOpen && (
          <div className={styles.submenu}>
            <ul>
              <li>Duration</li>
              <li>Today</li>
              <li>Last 7 days</li>
              <li>Last 30 days</li>
              <li>Last 90 days</li>
            </ul>
          </div>
        )}

        <div className={styles.box_sec}>
          <div className={styles.collected_amount}>
            <h6>
              Collected Amount <IoMdInformationCircleOutline />
            </h6>
            <h1>₹0.00</h1>
            <span>from 0 captured payments</span>
          </div>
          <div className={styles.gridContainer}>
            <div className={styles.box}>
              <div className="d-flex justify-content-between">
                <p className="m-0">
                  {" "}
                  <img src="/img/rupee.svg" alt="rupey" /> Refunds{" "}
                  <IoMdInformationCircleOutline />
                </p>
                <Link>View All</Link>
                <IoIosArrowForward />
              </div>
              <h2>
                <span className="text-secondary">₹ </span>
                <span
                  className="text-black"
                  style={{ fontSize: "1.5rem", color: "#000" }}
                >
                  0
                </span>
                <span className="text-secondary">.00</span>
              </h2>
              <h6>0 processed</h6>
            </div>
            <div className={styles.box}>
              <div className="d-flex justify-content-between">
                <p className="m-0">
                  {" "}
                  <IoWarningOutline className="text-danger" /> Disputes{" "}
                  <IoMdInformationCircleOutline />
                </p>
                <Link>View All</Link>
                <IoIosArrowForward />
              </div>
              <h2>
                <span className="text-secondary">₹ </span>
                <span
                  className="text-black"
                  style={{ fontSize: "1.5rem", color: "#000" }}
                >
                  0
                </span>
                <span className="text-secondary">.00</span>
              </h2>
            <div className="d-flex">  <h6>0 processed</h6> <h6> <BsDot/> under-reivew</h6></div>
            </div>
            <div className={styles.box}>
              <div className="d-flex justify-content-between">
                <p className="m-0">
                  {" "}
                  < IoCloseCircleOutline className="text-danger" /> Failed{" "}
                  <IoMdInformationCircleOutline />
                </p>
                <Link>View All</Link>
                <IoIosArrowForward />
              </div>
              <h2>
                <span className="text-secondary">₹ </span>
                <span
                  className="text-black"
                  style={{ fontSize: "1.5rem", color: "#000" }}
                >
                  0
                </span>
                <span className="text-secondary">.00</span>
              </h2>
              <h6>payment</h6>
            </div>
          </div>
        </div>
      </div>
      <PaymentsTable/>


      {/* -------Footer-area-------- */}
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
            <h6> <FaHeadphones/> Help & Suppport</h6>
        </div>
      </div>
        {/* -------Footer-end-------- */}
    </React.Fragment>
  );
};

export default Transaction;

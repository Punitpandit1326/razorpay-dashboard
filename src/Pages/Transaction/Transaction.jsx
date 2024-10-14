import React, { useState } from "react";
import styles from "./transaction.module.css";
import { IoIosWarning } from "react-icons/io";
import { IoIosArrowDown, IoMdInformationCircleOutline } from "react-icons/io";


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
            <h6>Collected Amount <IoMdInformationCircleOutline/></h6>
            <h1>₹0.00</h1>
            <span>from 0 captured payments</span>
          </div>
          <div className={styles.gridContainer}>
            <div className={styles.box}>
                <div>
<img src="/img/ruee.svg" alt="" />
                </div>
            </div>
            <div className={styles.box}>Box 2</div>
            <div className={styles.box}>Box 3</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Transaction;

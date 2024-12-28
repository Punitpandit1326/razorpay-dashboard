import React, { useEffect, useState } from "react";
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
import FormatAmount from "../../Componenets/Formatting/FormatAmount";

const Transaction = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [collectedAmount, setCollectedAmount] = useState(0.00);
  const [capturedPayments, setCapturedPayments] = useState(0);
  const [refunds, setRefunds] = useState(0.00);
  const [disputes, setDisputes] = useState(0.00);
  const [failedPayments, setFailedPayments] = useState(0);
  const [processed, setProcessed] = useState(0);
  const [underReview, setUnderReview] = useState(0);
  const [open, setOpen] = useState(0);
  const [selectedOption, setSelectedOption] = useState('Today');

  useEffect(() => {
    // Function to fetch data from your API
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/transaction-overview-listing?filters[duration]=${selectedOption}`);
        const result = await response.json();
        
        if (result.status === 'success') {
          setCollectedAmount(parseFloat(result.data?.collected_amount || 0.00));
          setCapturedPayments(result.data?.captured_payment || 0);
          setRefunds(parseFloat(result.data?.refunds || 0.00));
          setDisputes(parseFloat(result.data?.disputes || 0.00));
          setOpen(result.data?.open || 0);
          setFailedPayments(result.data?.failed_payments || 0);
          setProcessed(result.data?.processed || 0);
          setUnderReview(result.data?.under_review || 0);
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

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // Function to handle the option click and make the API call
  const handleOptionClick = async (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <React.Fragment>
      <div className={styles.overview_section}>
        <div className="d-flex gap-2">
          <h6>Overview </h6>
          <p onClick={toggleDropdown}>
          {selectedOption} <IoIosArrowDown />{" "}
          </p>
        </div>
        {isOpen && (
          <div className={styles.submenu}>
            <ul>
              {/* <li>Duration</li> */}
              <li onClick={() => handleOptionClick('Today')}>Today</li>
              <li onClick={() => handleOptionClick('Last 7 days')}>Last 7 days</li>
              <li onClick={() => handleOptionClick('Last 30 days')}>Last 30 days</li>
              <li onClick={() => handleOptionClick('Last 90 days')}>Last 90 days</li>
              <li onClick={() => handleOptionClick('Jan 2024 - till date')}>Jan 2024 - till date</li>
              <li onClick={() => handleOptionClick('This financial year')}>This financial year</li>
              <li onClick={() => handleOptionClick('Custom')}>Custom</li>
            </ul>
          </div>
        )}

        <div className={styles.box_sec}>
          <div className={styles.collected_amount}>
            <h6>
              Collected Amount <IoMdInformationCircleOutline />
            </h6>
            <h1>₹<FormatAmount amount={collectedAmount} /></h1>
            <span>from {capturedPayments} captured payments</span>
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
                  {<FormatAmount amount={refunds} />}
                </span>
              </h2>
              <h6>{processed} processed</h6>
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
                  {<FormatAmount amount={disputes} />}
                </span>
              </h2>
            <div className="d-flex">  <h6>{open} open</h6> <h6> <BsDot/> {underReview} under-reivew</h6></div>
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
              <h3>
                  {failedPayments}
              </h3>
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

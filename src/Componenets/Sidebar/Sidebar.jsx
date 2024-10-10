import React from "react";
import { FaPoll } from "react-icons/fa";
import { GrCopy } from "react-icons/gr";
import styles from "./sidebar.module.css";
import { BsRepeat } from "react-icons/bs";
import { ImUsers } from "react-icons/im";
import { AiFillAppstore } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { IoLinkSharp, IoQrCode } from "react-icons/io5";
import { IoMdRepeat, IoMdSettings } from "react-icons/io";
import { MdCurrencyRupee, MdLocalOffer } from "react-icons/md";
import { RiCheckDoubleFill, RiTwitterXLine } from "react-icons/ri";

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <img src="/img/logo.svg" alt="Logo" />
      </div>
      <nav>
        <ul>
          <li className={isActive("/") ? styles.active : ""}>
            <Link to="/">
              {" "}
              <FaPoll /> &nbsp; Home
            </Link>
          </li>
          <li className={isActive("/transactions") ? styles.active : ""}>
            <Link to="/transactions">
              <IoMdRepeat /> &nbsp; Transactions
            </Link>
          </li>
          <li className={isActive("/settlements") ? styles.active : ""}>
            <Link to="/settlements">
              <RiCheckDoubleFill /> &nbsp; Settlements
            </Link>
          </li>
          <li className={isActive("/reports") ? styles.active : ""}>
            <Link to="/reports">
              <GrCopy /> &nbsp; Reports
            </Link>
          </li>
          <li className={isActive("/account-settings") ? styles.active : ""}>
            <Link to="/account-settings">
              <IoMdSettings /> &nbsp; Account & Settings
            </Link>
          </li>
        </ul>
        <h6>PAYMENT PRODUCTS</h6>
        <ul>
          <li className={isActive("/paymet-links") ? styles.active : ""}>
            <Link to="/paymet-links">
              {" "}
              <IoLinkSharp /> &nbsp; Payment Links
            </Link>
          </li>
          <li className={isActive("/codes") ? styles.active : ""}>
            <Link to="/codes">
              <IoQrCode /> &nbsp; QR Codes
            </Link>
          </li>
          <li className={isActive("/subscriptions") ? styles.active : ""}>
            <Link to="/subscriptions">
              <BsRepeat /> &nbsp; Subscriptions
            </Link>
          </li>
          <p>SHOW ALL (13)</p>
        </ul>
        <h6>BANKING PRODUCTS</h6>
        <ul>
          <li className={isActive("/banking") ? styles.active : ""}>
            <Link to="/banking">
              {" "}
              <RiTwitterXLine /> &nbsp; x Banking
            </Link>
          </li>
          <li className={isActive("/loan") ? styles.active : ""}>
            <Link to="/loan">
              <MdCurrencyRupee /> &nbsp; Loans
            </Link>
          </li>
          <li className={isActive("/Customers") ? styles.active : ""}>
            <Link to="/Customers">
              <ImUsers /> &nbsp; Customers
            </Link>
          </li>
          <li className={isActive("/offer") ? styles.active : ""}>
            <Link to="/reports">
              <MdLocalOffer /> &nbsp; Offers
            </Link>
          </li>
          <li className={isActive("/apps") ? styles.active : ""}>
            <Link to="/apps">
              <AiFillAppstore /> &nbsp; Apps &  Deals
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

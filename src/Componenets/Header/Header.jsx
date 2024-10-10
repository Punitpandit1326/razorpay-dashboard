import React from "react";
import styles from "./head.module.css";
import { CiUser } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TbSpeakerphone, TbWaveSawTool } from "react-icons/tb";

const Header = () => {
  return (
    <div className={styles.main_div}>
      <div>
        <input
          type="text"
          placeholder="Search payment products, settings, and more"
        />
        <IoIosSearch className={styles.icon} />
      </div>
      <div className="d-flex gap-3">
        <h6>
          <img src="/img/check.png" alt="check" width="15" height="35" /> Live
          Mode
          <MdKeyboardArrowDown />
        </h6>
        <TbSpeakerphone className="mt-1" size={20} />
        <TbWaveSawTool className="mt-1" size={20} />
        <CiUser className="mt-1" size={20} />
      </div>
    </div>
  );
};

export default Header;

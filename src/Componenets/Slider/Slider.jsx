import React from "react";
import "./slide.css";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import styles from "./slider.module.css";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Slider = () => {
  return (
    <React.Fragment>
      <div className={styles.main_slider}>
        <h5>Products for you</h5>
        <Swiper
          slidesPerView={3.5}
          spaceBetween={30}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className={styles.cards}>
              <img src="/img/cross-border-payment.jpg" alt="payment" />
              <div className={styles.child}>
                <h6>Cross Border Payment</h6>
                <p>Receive payments from 200+ countries and go global</p>
                <Link to={""} className={styles.knowMore}>
                  Know More
                </Link>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <div className={styles.cards}>
              <img src="/img/qr-code.jpg" alt="qr" />
              <div className={styles.child}>
                <h6>Qr Code</h6>
                <p>
                  Grow your business with your own, branded multi-feature QR
                  Code
                </p>
                <Link to={""} className={styles.knowMore}>
                  Know More
                </Link>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <div className={styles.cards}>
              <img src="/img/payment-links.jpg" alt="payment" />
              <div className={styles.child}>
                <h6>Payment Links</h6>
                <p>
                  Create and share links over email, text and social to accept
                  payments instantly.
                </p>
                <Link to={""} className={styles.knowMore}>
                  Know More
                </Link>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <div className={styles.cards}>
              <img src="/img/pos.jpg" alt="payment" />
              <div className={styles.child}>
                <h6>Razorpay POS</h6>
                <p>
                  Accept seamless in-store payments with India's best POS
                  solution.
                </p>
                <Link to={""} className={styles.knowMore}>
                  Know More
                </Link>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <div className={styles.cards}>
              <img src="/img/payroll.jpg" alt="payment" />
              <div className={styles.child}>
                <h6>Payroll</h6>
                <p>Master payroll and compliance with RazorpayX Payroll</p>
                <Link to={""} className={styles.knowMore}>
                  Know More
                </Link>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <div className={styles.cards}>
              <img src="/img/current-account.jpg" alt="payment" />
              <div className={styles.child}>
                <h6>Current Account</h6>
                <p>
                  Automate all your banking needs with India’s best current
                  account
                </p>
                <Link to={""} className={styles.knowMore}>
                  Know More
                </Link>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </React.Fragment>
  );
};

export default Slider;

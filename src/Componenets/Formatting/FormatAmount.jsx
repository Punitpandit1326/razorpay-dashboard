import React from "react";

const FormatAmount = ({ amount }) => { // Destructure amount from props
  const formatAmount = (amount) => {
    if (amount >= 100000) {
      // Convert to Lakhs format (1 Lakh = 100,000)
      const amountInLakhs = amount / 100000;
      return `${amountInLakhs.toFixed(2)}L`; // Formatting with 2 decimal places
    } else if (amount >= 10000) {
      // Split into integer and decimal parts
      const [integerPart, decimalPart] = amount.toFixed(2).split(".");
      // Format the integer part with commas
      const formattedInteger = parseInt(integerPart).toLocaleString();
      // Combine the integer part with the decimal part
      return `${formattedInteger}.${decimalPart}`;
    } else {
      // For amounts less than 10,000, return the number as is
      return amount.toFixed(2);
    }
  };

  return <>{formatAmount(amount)}</>; // Render the formatted amount
};

export default FormatAmount;

import React from "react";
import spinner from "/spinner.svg";

function Spinner({ className = "", h = 8 }) {
  return (
    <div className="mb-6 flex justify-center mx-auto ">
      <img className={`h-${h}  ${className} `} src={spinner} alt="...Loading" />
    </div>
  );
}

export default Spinner;

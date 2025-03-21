import React, { forwardRef, useId } from "react";
import PropTypes from "prop-types";

const Input = forwardRef(function Input(
  { label, placeholder, type = "text", className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className={`w-full mt-6 ${className}`.trim()}>
      {label && (
        <label
          className="block text-sm font-medium text-gray-300 mb-2"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        type={type}
        className={`
          text-gray-300
          w-full
          bg-secondary
          px-4
          py-2
          border
          border-primary
          rounded-md
          shadow-sm
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          focus:border-blue-500
          transition duration-200
          focus:bg-secondary
          focus:text-white
        `}
        {...props}
        placeholder={placeholder}
      />
    </div>
  );
});

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
};

export default Input;

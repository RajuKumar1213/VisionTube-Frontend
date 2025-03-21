import React from "react";

function Button({
  type = "button",
  className = "",
  children,
  py = 2,
  px = 4,
  hover = "bg-slate-500",
  ...props
}) {
  return (
    <button
      type={type}
      className={`${className} flex items-center justify-center  ring-1 ring-slate-700  px-${px} py-${py} hover:${hover} transition duration-200 rounded-full`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;

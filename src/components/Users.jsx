import React from "react";

function Users() {
  return (
    <div className="flex items-center space-x-6 hover:bg-slate-700 p-2 rounded-md transition duration-200">
      <img
        src="https://live.staticflickr.com/65535/53304801011_7e10dfe545_z.jpg"
        alt="ap"
        className="w-10 h-10 object-cover rounded-full"
      />
      <span>Acharya Prashant</span>
    </div>
  );
}

export default Users;

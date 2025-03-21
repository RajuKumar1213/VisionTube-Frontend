// import React, { useState } from "react";
// import authService from "../services/auth.service";

// const Modal = ({ oldImageUrl, onClose }) => {
//   const [newImagePreview, setNewImagePreview] = useState(null);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];

//     if (file) {
//       setNewImagePreview(URL.createObjectURL(file));
//       authService.updateCoverImage(file).then((res) => {
//         if (res.statusCode === 200) {
//           window.location.reload();
//         }
//       });
//     } else {
//       setNewImagePreview(null);
//     }
//   };

//   const handleUpload = () => {
//     // Logic to upload the new image
//     console.log("Image uploaded!");
//     onClose(); // Close the modal after upload
//   };

//   return (
//     <div className="fixed  rounded-lg inset-0 bg-black bg-opacity-50 flex">
//       {/* Blurred out background */}

//       {/* Modal on the right */}
//
//     </div>
//   );
// };

// export default Modal;

import { useEffect } from "react";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden"); // Prevent scrolling
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
      {/* Clicking outside the modal closes it */}
      <div
        className="bg-secondary w-[90%] sm:w-[500px] p-6 rounded-xl shadow-lg max-h-[80vh] overflow-auto"
        onClick={(e) => e.stopPropagation()} // Stop modal from closing when clicking inside
      >
        {/* Close Button */}
        <button
          className=" rounded-full text-red-600 absolute top-2 right-2 cursor-pointer  hover:text-white text-2xl"
          onClick={onClose}
        >
          <CancelRoundedIcon />
        </button>

        {/* Modal Content */}
        {children}
      </div>
    </div>
  );
};

export default Modal;

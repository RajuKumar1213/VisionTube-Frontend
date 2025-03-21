import { useState } from "react";
import { useNavigate } from "react-router-dom";
import WestOutlinedIcon from "@mui/icons-material/WestOutlined";

const SearchBar = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/videos?query=${encodeURIComponent(searchTerm)}`);
      onClose();
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex justify-center bg-secondary w-full h-screen py-2 "
    >
      <div className="space-x-3">
        <button onClick={onClose}>
          <WestOutlinedIcon />
        </button>

        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 border rounded-lg w-64 bg-gray-800 text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="submit"
          className="bg-gray-600 px-4 py-2 rounded-lg text-white"
        >
          🔍
        </button>
      </div>
    </form>
  );
};

export default SearchBar;

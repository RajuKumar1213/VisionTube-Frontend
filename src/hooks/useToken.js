import { useSelector } from "react-redux";
import { selectToken } from "../redux/features/authSlice"; // Replace with your Redux selector

const useToken = () => {
  const token = useSelector(selectToken); // Get the token from Redux store
  return token;
};

export default useToken;

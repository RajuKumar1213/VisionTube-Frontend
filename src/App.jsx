import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./redux/features/authSlice.js";
import authService from "./services/auth.service.js";
import { Header, FixedSidebar, Container, Sidebar } from "./components";
import { Outlet } from "react-router-dom";
import spinner from "/spinner.svg";
import LoadingBar from "react-top-loading-bar";
import { setProgress } from "./redux/features/progressSlice.js";
import Alert from "./components/Alert.jsx";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const userStatus = useSelector((state) => state.auth.status);
  const progress = useSelector((state) => state.progress.progress);

  useEffect(() => {
    const authenticated = localStorage.getItem("accessToken");

    if (authenticated && userStatus == false) {
      authService
        .getCurrentUser()
        .then((userData) => {
          if (userData) {
            dispatch(login(userData.data));
          } else {
            dispatch(logout());
          }
        })
        .finally(() => setLoading(false));
    } else {
      dispatch(logout());
      setLoading(false);
    }
  }, []);

  return !loading ? (
    <div className="min-h-screen box-border text-white ">
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => dispatch(setProgress(0))}
      />
      <Header />
      <Alert />
      <FixedSidebar />
      <Sidebar />
      <Container>
        <Outlet />
      </Container>
    </div>
  ) : (
    <img src={spinner} alt="" className="w-14 mx-auto my-auto h-screen" />
  );
}
export default App;

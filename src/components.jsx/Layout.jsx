import Nav from "./Nav";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { fetchData, getStatus } from "../app/slice/slice";
import AOS from "aos";
import Loading from "./Loading";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const Layout = () => {
  const dispatch = useDispatch();

  const { status, error } = useSelector(getStatus);

  useEffect(() => {
    AOS.init({
      delay: 200,
    });
  }, []);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchData());
    }
  }, [status, dispatch]);

  return (
    <>
      {status === "loading" ? (
        <Loading />
      ) : status === "rejected" ? (
        <p className="error">{error}</p>
      ) : (
        <section className="layout">
          <div className="layout1">
            <Nav />
          </div>
          <div className="layout2">
            <div className="layoutA">
              <Sidebar />
            </div>
            <div className="layoutb">
              <Outlet />
            </div>
          </div>
        </section>
      )}
    </>
  );
};
export default Layout;

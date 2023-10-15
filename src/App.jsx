import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components.jsx/Home";
import Cart from "./components.jsx/Cart";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "./components.jsx/Layout";
import MenClothing from "./components.jsx/MenClothing";
import WomenClothing from "./components.jsx/WomenClothing";
import Jewelery from "./components.jsx/Jewelery";
import Electronics from "./components.jsx/Electronics";
import ViewItem from "./components.jsx/ViewItem";
import Banking from "./components.jsx/Banking";
import ErrorPath from "./components.jsx/ErrorPath";
import SearchResult from "./components.jsx/SearchResults";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/men" element={<MenClothing />} />
            <Route path="/women" element={<WomenClothing />} />
            <Route path="/electronics" element={<Electronics />} />
            <Route path="/jewelery" element={<Jewelery />} />
            <Route path ="/searchResults" element={<SearchResult/>}/>
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/view" element={<ViewItem />} />
          <Route path="/banking" element={<Banking />} />
          <Route path="*" element={<ErrorPath />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;

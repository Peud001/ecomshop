import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getTotal } from "../app/slice/cartSlice";
import { getIsOpen } from "../app/slice/slice";
import Search from "./Search";

const Nav = () => {
  const dispatch = useDispatch();
  const cartQuantity = useSelector((state) => state.cart.cartQuantity);
  const isOpen = useSelector((state) => state.ecom.isOpen);

  useEffect(() => {
    dispatch(getTotal());
  }, [cartQuantity, dispatch]);

  const toggleHamburger = () => {
    dispatch(getIsOpen(!isOpen));
  };

  return (
    <section className="nav-section">
      <div className="nav set-space">
        <div
          className={isOpen ? "open-menu-active" : "close-menu-active"}
          onClick={toggleHamburger}
        >
          <div className="hamburger-menu"></div>
        </div>
        <Link to="/" className="logo">
          <img src="ecom.png" />
        </Link>
        <Search />
        <div className="logo-cart">
          <Link to="/cart" className="cart">
            <img src="cart.png" />
            <p className="cart-count">
              <span>{cartQuantity}</span>
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
};
export default Nav;

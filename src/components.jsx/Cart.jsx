import { useSelector, useDispatch } from "react-redux";
import {
  getCartItems,
  increaseItem,
  decreaseItem,
  removeItem,
  getTotal,
} from "../app/slice/cartSlice";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Nav from "./Nav";
import BackToTop from "./BackToTop";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(getCartItems);
  const cartTotal = useSelector((state) => state.cart.cartsubTotal);

  useEffect(() => {
    dispatch(getTotal());
  }, [dispatch, cartItems]);

  return (
    <section>
    <Nav/>
    <div className="cart-section">
      {cartItems.length ? (
        <div className="cart-page set-space">
          <div className="cart-col1">
            {cartItems &&
              cartItems.map((item) => {
                return (
                  <div key={item.id} className="cart-items">
                    <div className="cart-item-left">
                      <div className="cart-image">
                        <img src={item.image} />
                        <div>
                          <p>{item.title}</p>
                          <p className="item-price">
                            ${Math.round(item.price * 100) / 100}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="item-amount">
                          $
                          {Math.round(item.itemQuantity * item.price * 100) /
                            100}
                        </p>
                      </div>
                    </div>
                    <div className="cart-item-right">
                      <div>
                        <button
                          className="remove"
                          onClick={() => dispatch(removeItem(item))}
                        >
                          Remove
                        </button>
                      </div>
                      <div className="cart-quantity">
                        <button
                          className="btn-cart"
                          onClick={() => dispatch(decreaseItem(item))}
                        >
                          -
                        </button>
                        <span>{item.itemQuantity}</span>
                        <button
                          className="btn-cart"
                          onClick={() => dispatch(increaseItem(item))}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="cart-summary">
            <p className="summary">CART SUMMARY</p>
            <div className="sub-total">
              <p>Subtotal</p>
              <p>${Math.round(cartTotal * 100) / 100}</p>
            </div>
            <div className="checkout">
              <Link to='/banking' className="btn-cart">
                CHECKOUT (${Math.round(cartTotal * 100) / 100})
              </Link>
            </div>
            <Link to="/" className="continue-to-shop">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
              <span className="shopping-text">Continue Shopping</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="empty-cart">
          <h1>Cart is Empty</h1>
          <div>
            <img src="cartempty.jpg" />
          </div>
          <div>
            <Link to="/" className="continue-shopping">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
              <span className="continue-shopping">Start Shopping</span>
            </Link>
          </div>
        </div>
      )}
    </div>
    <BackToTop/>
    </section>
  );
};
export default Cart;

import { useSelector, useDispatch } from "react-redux";
import { fetchJewel, getStatus } from "../app/slice/jewelSlice";
import { useEffect } from "react";
import Loading from "./Loading";
import { addToCart } from "../app/slice/cartSlice";

const Jewelery = () => {
  const { jewel, status, error } = useSelector(getStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchJewel());
    }
  }, [status, dispatch]);

  return (
    <section>
      <div>
        {status === "loading" ? (
          <Loading />
        ) : status === "rejected" ? (
          <p className="error">{error}</p>
        ) : (
          <div className="item-container">
            {jewel?.map((item) => {
              return (
                <div key={item.id} className="item-content">
                  <div className="displayed-item">
                    <div className="items">
                      <img src={item.image} />
                    </div>
                    <div className="details">
                      <p className="title">
                        {item.title.length > 45
                          ? item.title.slice(0, 45) + "..."
                          : item.title}
                      </p>
                      <p className="price">${item.price}</p>
                      <button
                        onClick={() => dispatch(addToCart(item))}
                        className="cart-add"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
export default Jewelery;

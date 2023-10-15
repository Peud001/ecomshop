import { useSelector, useDispatch } from "react-redux";
import { fetchElect, getElect } from "../app/slice/electSlice";
import Loading from "./Loading";
import { addToCart, getTotal } from "../app/slice/cartSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Electronics = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { elect, status, error } = useSelector(getElect);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchElect());
    }
  }, [dispatch, status]);

  const handleClick = (item) => {
    localStorage.setItem("view", JSON.stringify(item));
    navigate("/view");
  };

  return (
    <section>
      <div>
        {status === "loading" ? (
          <Loading />
        ) : status === "rejected" ? (
          <p className="error">{error}</p>
        ) : (
          <div className="item-container">
            {elect.map((item) => {
              return (
                <div key={item.id} className="item-content">
                  <div className="displayed-item">
                    <div className="items" onClick={() => handleClick(item)}>
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
                        onClick={() => {
                          dispatch(addToCart(item));
                          dispatch(getTotal());
                        }}
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
export default Electronics;

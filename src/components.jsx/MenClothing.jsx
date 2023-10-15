import { useSelector, useDispatch } from "react-redux";
import { fetchMenC, getMenC } from "../app/slice/menCSlice";
import { useEffect } from "react";
import Loading from "./Loading";
import { addToCart, getTotal } from "../app/slice/cartSlice";
import { useNavigate } from "react-router-dom";

const MenClothing = () => {
  const navigate = useNavigate();
  const { menC, status, error } = useSelector(getMenC);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchMenC());
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
            {menC.map((item) => {
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
export default MenClothing;

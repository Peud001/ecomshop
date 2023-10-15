import { useSelector, useDispatch } from "react-redux";
import { addToCart, getTotal } from "../app/slice/cartSlice";
import { useNavigate } from "react-router-dom";
import BackToTop from "./BackToTop";
import { useState } from "react";
import Paginate from "./Paginate";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.ecom.data);

  const [pageNumber, setPageNumber] = useState(1);
  const itemPerPage = 12;

  const endIndex = pageNumber * itemPerPage;
  const startIndex = endIndex - itemPerPage;

  const currentData = data.slice(startIndex, endIndex);

  const handleClick = (item) => {
    localStorage.setItem("view", JSON.stringify(item));
    navigate("/view");
  };

  const changePage = (pageNum) => {
    setPageNumber(pageNum);
  };

  return (
    <section className="home-section">
      <div className="home">
        <div className="item-container">
          {currentData.map((item) => {
            return (
              <div key={item.id} className="item-content">
                <div className="displayed-item">
                  <div onClick={() => handleClick(item)} className="items">
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
      </div>
      <BackToTop />
      <Paginate
        totalData={data.length}
        itemPerPage={itemPerPage}
        changePage={changePage}
      />
    </section>
  );
};
export default Home;

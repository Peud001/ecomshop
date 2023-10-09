import { useSelector, useDispatch } from "react-redux";
import { addToCart, getTotal } from "../app/slice/cartSlice";
import { useNavigate } from "react-router-dom";
import BackToTop from "./BackToTop";

const Home = () => {
  
  const dispatch = useDispatch()
  const data = useSelector(state => state.ecom.data)
  const navigate = useNavigate()

  const handleClick = (item) => {
    localStorage.setItem('view', JSON.stringify(item))
    navigate('/view')
  }

  return (
    <section className="home-section">
      <div className="home">
            <div className="item-container">
              {data.map((item) => {
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
                            dispatch(addToCart(item))
                            dispatch(getTotal())
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
        <BackToTop/>
    </section>
  );
};
export default Home;

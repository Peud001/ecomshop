import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart, getTotal } from "../app/slice/cartSlice";

const SearchResult = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector(state => state.ecom.searchResult)

  const handleClick = (item) => {
    localStorage.setItem("view", JSON.stringify(item));
    navigate("/view");
  };

  return (
    <div>
      <div className="home">
        {
            data.length > 0? (
                <div className="item-container">
          {data.map((item) => (
            <div key={item.id} className="item-content">
              <div className="displayed-item">
                <div onClick={() => handleClick(item)} className="items">
                  <img src={item.image} alt={item.title} />
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
          ))}
        </div>
            ) : (
                <div className="no-matches">
                <p
                style={{
                    textAlign: 'center',
                    fontStyle : 'italic',
                    color : 'grey',
                    fontSize : '20px'
                }}
                >There are no matches...
                </p>
                </div>
            )
        }
      </div>
    </div>
  );
};

export default SearchResult;

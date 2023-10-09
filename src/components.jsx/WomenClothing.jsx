import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Loading from "./Loading";
import { addToCart } from "../app/slice/cartSlice";
import { getWomenC, fetchWomenC } from "../app/slice/womenCSlice";

const WomenClothing = () => {

    const dispatch = useDispatch()
    const {womenC, status, error} = useSelector(getWomenC)

    useEffect(() => {
        if(status === 'idle'){
            dispatch(fetchWomenC())
        }
    }, [dispatch, status])

    return(
        <section>
            {
                status === 'loading'?
                <Loading/>
                :
                status === 'rejected'?
                <p className="error">{error}</p>
                :
                <div className="item-container">
            {womenC.map((item) => {
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
            }
        </section>
    )
}
export default WomenClothing
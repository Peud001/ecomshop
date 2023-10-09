import { useEffect, useState } from "react";
import Nav from "./Nav";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getTotal } from "../app/slice/cartSlice";
import { getCartItems } from "../app/slice/cartSlice";

const ViewItem = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(getCartItems)
  const [viewItem, setViewItem] = useState(null);
  const [findItem, setFindItem] = useState()


  useEffect(() => {
    const item = JSON.parse(localStorage.getItem("view"));
    setViewItem(item);
  }, []);

  useEffect(() => {
    const findView = cartItems.find((item) => viewItem && item.id === viewItem.id)
    
    if(findView && findView.itemQuantity){
        setFindItem(findView.itemQuantity)
    }
  }, [cartItems, viewItem])

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    dispatch(getTotal());
  };  

  return (
    <section className="view-section">
      <div className="view-nav">
        <Nav />
      </div>
      <div className="set-space view-content">
        {viewItem && (
          <div>
            <div className="view-item">
              <div className="view-image">
                <img className="image" src={viewItem.image} />
              </div>
              <div className="item-info">
                <p className="view-title">{viewItem.title}</p>
                <p className="view-price">${viewItem.price}</p>
                <p>
                  <button className="view-btn" onClick={() => handleAddToCart(viewItem)}>
                    Add to Cart
                  </button>
                    {
                        findItem && <div style={{paddingTop: 10, fontSize:14}}>{findItem} of this item(s) has been added to cart</div>
                    }
                </p>
                <h3>Product description</h3>
              <p className="view-description">{viewItem.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ViewItem;

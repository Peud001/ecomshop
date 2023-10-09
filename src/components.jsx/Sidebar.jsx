import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getIsOpen } from "../app/slice/slice";

const Sidebar = () => {

  const dispatch = useDispatch()
  const isOpen = useSelector(state => state.ecom.isOpen)
  const [activeItem, setActiveItem] = useState(null);

  const sidebarItems = [
    { label: "All categories", to: "/" },
    { label: "Men clothings", to: "men" },
    { label: "Women clothings", to: "women" },
    { label: "Jewelry", to: "jewelery" },
    { label: "Electronics", to: "electronics" },
  ];

  const handleItemClick = (index) => {
    setActiveItem(index === activeItem ? null : index);
    dispatch(getIsOpen(false))
  };

  return (
    <section className={`sidebar ${isOpen? '' :  'active'}`}>
      <p className="sidebar-heading">Categories</p>
      <div className="sidebar-items">
        {sidebarItems.map((item, index) => (
          <div
            key={index}
            onClick={() => handleItemClick(index)}
            className={activeItem === index ? "active" : ""}
          >
            <Link className="sidebar-item" to={item.to}>
              {item.label}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Sidebar;

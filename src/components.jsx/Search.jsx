import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getSearchData } from "../app/slice/slice";

const Search = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const data = useSelector((state) => state.ecom.data);

  const [searchInput, setSearchInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      const result = data.filter((item) => item.title.toLowerCase().includes(searchInput.toLowerCase()));
      localStorage.setItem("searchR", JSON.stringify(result));
      navigate("/searchResults");
      const getResult = JSON.parse(localStorage.getItem("searchR")) || [];
      dispatch(getSearchData(getResult));
    }
    else{
        dispatch(getSearchData([]))
    }
  };

  return (
    <div className="search">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="search"
          value={searchInput}
          placeholder="Search products..."
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="#f68b1e"
            className="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </button>
      </form>
    </div>
  );
};
export default Search;

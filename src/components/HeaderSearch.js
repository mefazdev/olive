import React, { useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { db } from "../firebase";
import { collection, query, getDocs } from "@firebase/firestore";

import { Link } from "react-router-dom";
import { unstable_renderSubtreeIntoContainer } from "react-dom";
function HeaderSearch() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearch] = useState(false);

  const fetchData = async () => {
    const q = await query(collection(db, "products"));
    const data = await getDocs(q);
    setProducts(data.docs.map((doc) => doc));
  };
  useEffect(() => {
    fetchData();
  }, []);

  const controlSearch = (e) => {
    setSearchTerm(e);
    setSearch(true);
  };
  const searchSuccess = () => {
    setSearchTerm("");
  };
  return (
    <div className="header__input__div">
      <span className="header__serach__p">
        <p>All Categories</p>
      </span>
      <div>
        <input
          type="text"
          value={searchTerm}
          placeholder="Search for books by key word"
          onChange={(e) => controlSearch(e.target.value)}
        />
        {searchTerm ? <div className="header__search__div">
          {products
            .filter((data) => {
              if (searchTerm == "") {
                return data;
              } else if (
                data
                  .data()
                  .name.toLowerCase()
                  .includes(searchTerm.toLowerCase())
              ) {
                return data;
              }
            })
            .map((data, index) => {
              if (searchTerm) {
                return (
                  <Link
                    onClick={searchSuccess}
                    key={index}
                    to={`/book/${data.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div className="header__search__item" key={index}>
                      {data.data().name}
                    </div>
                  </Link>
                );
              }
            })}
        </div> : ''}
        
      </div>

      {/* <Link to="/search"> */}
      <span className="header__serach__span">
        <SearchIcon />
      </span>
      {/* </Link> */}
    </div>
  );
}

export default HeaderSearch;

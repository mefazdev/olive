import "../style/css/categories.css";
import "./../style/css/justArrived.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import SearchIcon from "@material-ui/icons/Search";
import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import FilterListIcon from "@material-ui/icons/FilterList";

function FilterSearch() {
  const [openFilter, setOpenFilter] = useState(false);
  return (
    <Col className="search__items_col " xs="12" lg="2">
      <div className="filter__icon__div">
        <FilterListIcon
          id="filter__icon"
          onClick={() => setOpenFilter(!openFilter)}
          type="button"
        />
      </div>

      <div className={openFilter ? "search__items__open" : "search__items"}>
        <div className="search__items__head">
          <h5>Search Author</h5>
          <div className="search__items__input ">
            <input />
            <div className="search__items__icon__div">
              <SearchIcon type="button" onClick={""} id="search__items__icon" />
            </div>
          </div>
        </div>

        {/*  Language */}
        <Dropdown id="search__dropdown">
          <Dropdown.Toggle variant="none" id="dropdown-basic">
            Language
          </Dropdown.Toggle>

          <Dropdown.Menu id="dropdown__menu">
            <div className="search__item">
              <div className="search__item__row">
                <input type="checkbox" /> <p>English</p>
              </div>
              <div className="search__item__row">
                <input type="checkbox" /> <p>Malayalam</p>
              </div>
              <div className="search__item__row">
                <input type="checkbox" /> <p>Hindi</p>
              </div>
              <div className="search__item__row">
                <input type="checkbox" /> <p>Hindi</p>
              </div>
            </div>
          </Dropdown.Menu>
        </Dropdown>

        {/* FORMAT */}
        <Dropdown id="search__dropdown">
          <Dropdown.Toggle variant="none" id="dropdown-basic">
            Format
          </Dropdown.Toggle>

          <Dropdown.Menu id="dropdown__menu">
            <div className="search__item">
              <div className="search__item__row">
                <input type="checkbox" /> <p>Paperback</p>
              </div>
              <div className="search__item__row">
                <input type="checkbox" /> <p>Hard cover</p>
              </div>
              <div className="search__item__row">
                <input type="checkbox" /> <p>E books</p>
              </div>
              <div className="search__item__row">
                <input type="checkbox" /> <p>Audio Books</p>
              </div>
            </div>
          </Dropdown.Menu>
        </Dropdown>

        {/* FILTER BY PRICE */}

        <Dropdown id="search__dropdown">
          <Dropdown.Toggle variant="none" id="dropdown-basic">
            Filter By Price
          </Dropdown.Toggle>

          <Dropdown.Menu id="dropdown__menu">
            <div className="search__item">
              <div className="search__item__row">
                <input type="checkbox" /> <p>Low - High</p>
              </div>
              <div className="search__item__row">
                <input type="checkbox" /> <p>High - Low</p>
              </div>
            </div>
          </Dropdown.Menu>
        </Dropdown>

        {/* BY DATE */}

        <Dropdown id="search__dropdown">
          <Dropdown.Toggle variant="none" id="dropdown-basic">
            By Date
          </Dropdown.Toggle>

          <Dropdown.Menu id="dropdown__menu">
            <div className="search__item">
              <div className="search__item__row">
                <input type="checkbox" /> <p>New - Old</p>
              </div>
              <div className="search__item__row">
                <input type="checkbox" /> <p>Old - New</p>
              </div>
            </div>
          </Dropdown.Menu>
        </Dropdown>

        {/* BY REVIEW */}

        <Dropdown id="search__dropdown">
          <Dropdown.Toggle variant="none" id="dropdown-basic">
            By Reviews
          </Dropdown.Toggle>

          <Dropdown.Menu id="dropdown__menu">
            <div className="search__item">
              <div className="search__item__row">
                <input type="checkbox" /> <p>5 Star</p>
              </div>
              <div className="search__item__row">
                <input type="checkbox" /> <p>4 Star</p>
              </div>
              <div className="search__item__row">
                <input type="checkbox" /> <p>3 Star</p>
              </div>
              <div className="search__item__row">
                <input type="checkbox" /> <p>2 Star</p>
              </div>
              <div className="search__item__row">
                <input type="checkbox" /> <p>1 Star</p>
              </div>
            </div>
          </Dropdown.Menu>
        </Dropdown>

        {/* BY PUBLISHER */}

        <Dropdown id="search__dropdown">
          <Dropdown.Toggle variant="none" id="dropdown-basic">
            By Publisher
          </Dropdown.Toggle>

          <Dropdown.Menu id="dropdown__menu">
            <div className="search__item">
              <div className="search__item__row">
                <input type="checkbox" /> <p>DC BOOKS</p>
              </div>
              <div className="search__item__row">
                <input type="checkbox" /> <p>PUBLISHER 1</p>
              </div>
              <div className="search__item__row">
                <input type="checkbox" /> <p>PUBLISHER 3</p>
              </div>
            </div>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </Col>
  );
}

export default FilterSearch;

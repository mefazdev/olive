import Dropdown from "react-bootstrap/Dropdown";
import "../style/css/categories.css";
import "../style/css/no__result.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Featur from "../components/Featur";
import image from "../images/no-result.png";
import "../style/css/searchResult.css";
import { useState } from "react";
import FilterSearch from "../components/FilterSearch";

function NoSearchResult() {
  const [openFilter, setOpenFilter] = useState(false);
  return (
    <div className="no__result container">
      <Row>
        {/* <<<<<<<<<<<<<<< FILTER SEARCH >>>>>>>>>>>>>>>>>>> */}
        <FilterSearch />
        <Col md="7">
          <div className="no__result__content">
            <div className="search__head__row">
              <h5>
                Search result for "
                <span style={{ color: "#46CE04" }}>Rising Like a Storm</span>"
              </h5>
            </div>
            <div className="no__result__image">
              <div className="no__result__image__head">
                <h2>NO BOOKS FOUND</h2>
                <h6>Please try another keyword</h6>
              </div>
              <div className="no__result__image__cover">
                <img className="col-12" src={image} />
              </div>
            </div>
          </div>
        </Col>
      </Row>

      <Featur />
    </div>
  );
}

export default NoSearchResult;

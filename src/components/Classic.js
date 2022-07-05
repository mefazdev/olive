import React, { useEffect, useState } from "react";
import { db, storage } from "../firebase";
import { collection, query, getDocs, where } from "@firebase/firestore";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
function Classic() {
  const [classic, setClassic] = useState([]);
  const fetchData = async () => {
    const q = await query(
      collection(db, "products"),
      where("classic", "==", true)
    );
    const data = await getDocs(q);
    setClassic(data.docs.map((doc) => doc));
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="home__discover">
      <div className="home__discover__head__row ">
        <h5>Discover New Reads</h5>
        <Link
          to="/classic"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <p>View all</p>
        </Link>
      </div>
      <div className="home__discover__content">
        <Row>
          {classic.map((data, index) => {
            if (index < 5 && data.data().stock > 0) {
              return (
                <Link
                  to={`/book/${data.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Col className="home__discover__col" sm="6" lg="3">
                    <img className="col-12" src={data.data().thumbnail} />
                  </Col>
                </Link>
              );
            }
          })}
        </Row>
      </div>
    </div>
  );
}

export default Classic;

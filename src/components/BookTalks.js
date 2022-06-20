import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import {
  collection,
  
  orderBy,
  query,
  getDocs,
} from "@firebase/firestore";
import Moment from "moment";
 

function BookTalks() {
  const [data, setData] = useState([]);
 

  const fetchData = async () => {
    const q = await query(
      collection(db, "bookTalk"),
      orderBy("timestamp", "desc")
    );
    const data = await getDocs(q);
    setData(data.docs.map((doc) => doc));
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="home__talks">
      <div className="home__talks__head__row ">
        <h5>Book Talks</h5>
        <Link
          to="/bookTalks"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <p>View all</p>
        </Link>
      </div>

      <Row>
        {data.map((data, index) => {
          const date = Moment(data.time).format("MMM DD YYYY");
          if (index < 4) {
            return (
              <Col key={index} sm="auto" md="4">
                <Link
                  to={`/booktalk/${data.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="home__talks__div">
                    <img className="col-12" src={data.data().image} />
                    <div className="home__talks__date">
                      <p>{date}</p>
                      <p>|</p>
                      <p>Admin</p>
                    </div>

                    <h5>
                      Benefits of Reading How It Can Positively Affect Your Life
                    </h5>
                  </div>
                </Link>
              </Col>
            );
          }
        })}
      </Row>
    </div>
  );
}

export default BookTalks;

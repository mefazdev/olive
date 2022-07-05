import React, { useEffect, useState } from "react";
import { db } from "../firebase";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { collection, orderBy, query, getDocs } from "@firebase/firestore";

function BoolOfMonth() {
  const [book, setBook] = useState([]);
  const [author, setAuthor] = useState([]);
  const [bookMore, setBookMore] = useState(true);
  const [authorMore, setAuthorMore] = useState(true);
  const fetchBook = async () => {
    const q = await query(
      collection(db, "bookMonth"),
      orderBy("timestamp", "desc")
    );
    const data = await getDocs(q);
    setBook(data.docs.map((doc) => doc.data()));
  };
  const fetchAuthor = async () => {
    const q = await query(
      collection(db, "authorMonth"),
      orderBy("timestamp", "desc")
    );
    const data = await getDocs(q);
    setAuthor(data.docs.map((doc) => doc));
  };
  useEffect(() => {
    fetchBook();
    fetchAuthor();
  }, []);

  return (
    <div className="home__month__row">
      <Row>
        <Col md>
          <div className="home__month">
            <div className="home__month__content">
              <Row>
                {book.map((data, index) => {
                  if (index < 1) {
                    return (
                      <Row key={index}>
                        <Col key={index} md="4" id="month__book__col">
                          <img className="col-8 col-md-11" src={data.image} />
                        </Col>

                        <Col md="8">
                          <h6>Book of the month</h6>
                          <h4>{data.name}</h4>
                          <p>
                            <p>
                              {bookMore
                                ? data.description.slice(0, 500)
                                : data.description}

                              <span
                                onClick={() => setBookMore(!bookMore)}
                                style={{
                                  color: "#46CE04",
                                  marginLeft: "5px",
                                  cursor: "pointer",
                                }}
                              >
                                {bookMore ? "Read more" : "Read less"}
                              </span>
                            </p>{" "}
                          </p>
                        </Col>
                      </Row>
                    );
                  }
                })}
              </Row>
            </div>
          </div>
        </Col>
        <Col md>
          <Col md>
            <div className="home__month">
              <div className="home__month__content">
                <Row>
                  {author.map((data, index) => {
                    if (index < 1) {
                      return (
                        <Row key={index}>
                          <Col md="4" id="month__book__col">
                            <img
                              className="col-8 col-md-11"
                              src={data.data().image}
                            />
                          </Col>
                          <Col md="8">
                            <h6>Author of the month</h6>
                            <h4>{data.data().name}</h4>
                            <p>
                              {authorMore
                                ? data.data().description.slice(0, 500)
                                : data.data().description}

                              <span
                                onClick={() => setAuthorMore(!authorMore)}
                                style={{
                                  color: "#46CE04",
                                  marginLeft: "5px",
                                  cursor: "pointer",
                                }}
                              >
                                {authorMore ? "Read more" : "Read less"}
                              </span>
                            </p>
                          </Col>
                        </Row>
                      );
                    }
                  })}
                </Row>
              </div>
            </div>
          </Col>
        </Col>
      </Row>
    </div>
  );
}

export default BoolOfMonth;

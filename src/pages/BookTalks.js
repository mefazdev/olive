import React, { useEffect, useState } from "react";
import Featur from "../components/Featur";
import "../style/css/bookTalks.css";

import { Link } from "react-router-dom";

import { collection, orderBy, query, getDocs } from "@firebase/firestore";
import Moment from "moment";
import { db } from "../firebase";
import Header from "../components/Header";
import Footer from "../components/Footer";
function BookTalks() {
  const [bookTalk, setBookTalk] = useState([]);
  const fetchData = async () => {
    const q = await query(
      collection(db, "bookTalk"),
      orderBy("timestamp", "desc")
    );
    const data = await getDocs(q);
    setBookTalk(data.docs.map((doc) => doc));
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Header />
      <div className="container">
        <div className="body">
          <div className="Books-container container">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div className="book-talks">
                  <p className="title">Book Talks</p>
                </div>
              </div>
            </div>
            <div className="row">
              {bookTalk.map((data) => {
                return (
                  <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4">
                    <Link
                      to={`/booktalk/${data.id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <div className="book">
                        <img
                          className="image"
                          src={data.data().image}
                          alt="image1"
                        />
                        <p className="date">
                          {Moment(data.time).format("MMM DD YYYY")} | Admin
                        </p>
                        <p className="book-text">{data.data().title}</p>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <Featur />
      </div>{" "}
      <Footer />{" "}
    </>
  );
}

export default BookTalks;

import React, { useState } from "react";
import Featur from "../components/Featur";
import "../style/css/bookTalks.css";
import talk1 from "../images/talks1.png";
import talk2 from "../images/talks2.png";
import talk3 from "../images/talks3.png";
import talk4 from "../images/talk4.png";
import talk5 from "../images/talk5.png";
import talk6 from "../images/talk6.png";
import { Link } from "react-router-dom";
function BookTalks() {
  const [data] = useState([
    {
      image: talk1,
      caption: "Benefits of Reading How It Can Positively Affect Your Life",
    },
    {
      image: talk2,
      caption: "The Art of reading, read and lead",
    },
    {
      image: talk3,
      caption: "Benefits of Reading How It Can Positively Affect Your Life",
    },
    {
      image: talk4,
      caption: "The Art of reading, read and lead",
    },
    {
      image: talk5,
      caption: "Benefits of Reading How It Can Positively Affect Your Life",
    },
    {
      image: talk6,
      caption: "The Art of reading, read and lead",
    },
  ]);
  return (
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
            {data.map((data) => {
              return (
                <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4">
                  <Link
                    to="/blog"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div className="book">
                      <img className="image" src={data.image} alt="image1" />
                      <p className="date">10 April 2021 | Admin</p>
                      <p className="book-text">{data.caption}</p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Featur />
    </div>
  );
}

export default BookTalks;

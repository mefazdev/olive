import React from "react";
import Featur from "../components/Featur";
import Header from "../components/Header";
import image from "../images/error.png";
import "../style/css/error.css";
import Footer from '../components/Footer'
function Error() {
  return (
    <>
    <Header/>
   
    <div className="error container">
      <div className="error__content">
        <h1>ERROR 404</h1>
        <h4>This page is no written yet</h4>

        <div className="error__img">
          <img className="col-12" src={image} />
        </div>
      </div>
      <Featur />
    </div> <Footer/> </>
  );
}

export default Error;

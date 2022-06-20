import React, { useState } from "react";
import Featur from "../components/Featur";
import "../style/css/address.css";
import { Link, useHistory } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import Footer from "../components/Footer";
import { db, storage } from "../firebase";
import { addDoc, collection, serverTimestamp } from "@firebase/firestore";
import { auth } from "../firebase";
import Header from "../components/Header";

function Address() {
  const [user, setUser] = useState({});
  const [quantity, setQuantity] = useState(false);

  const [name, setName] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [streetAddress2, setStreetAddress2] = useState("");
  const [town, setTown] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [pin, setPin] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const history = useHistory();
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
  const userId = user?.uid;
  const addAdress = async () => {
    await addDoc(collection(db, "address"), {
      name: name,
      houseNo: houseNo,
      streetAddress: streetAddress,
      streetAddress2: streetAddress2,
      town: town,
      district: district,
      state: state,
      pin: pin,
      phone: phone,
      email: email,
      timestamp: serverTimestamp(),
      userID: user.uid,
    });
    history.push("/address");
  };
  return (
    <div>
      <Header />
      <div className="body">
        <div className="container5 container">
          <div className="title-container5">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <p className="step">Step 1/2</p>
                <p className="address-title">Address</p>
                <hr className="underline1"></hr>
                <div className="image-box">
                  <img
                    className="right-image"
                    src={process.env.PUBLIC_URL + "/images/wing2.jpg"}
                    alt="image3"
                  />
                </div>
                <div className="input-container">
                  <p className="label">Full Name</p>
                  <input
                    className="in"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="input-container">
                  <p className="label">House / Office No </p>
                  <input
                    className="in"
                    type="text"
                    onChange={(e) => setHouseNo(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="form-container5">
            <div className="details">
              <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                  <div className="input-container">
                    <p className="label">Street Address</p>
                    <input
                      className="in"
                      type="text"
                      value={streetAddress}
                      onChange={(e) => setStreetAddress(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                  <div className="input-container">
                    <p className="label">Street Address 2</p>
                    <input
                      className="in"
                      type="text"
                      value={streetAddress2}
                      onChange={(e) => setStreetAddress2(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                  <div className="input-container">
                    <p className="label">Town / City</p>
                    <input
                      className="in"
                      type="text"
                      name="town"
                      value={town}
                      onChange={(e) => setTown(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                  <div className="input-container">
                    <p className="label">District</p>
                    <input
                      className="in"
                      type="text"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                  <div className="input-container">
                    <p className="label">State</p>
                    <input
                      className="in"
                      type="text"
                      name="statee"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                  <div className="input-container">
                    <p className="label">Pin code</p>
                    <input
                      className="in"
                      type="text"
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                  <div className="input-container">
                    <p className="label">Phone</p>
                    <input
                      className="in"
                      type="text"
                      name="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                  <div className="input-container">
                    <p className="label">Email</p>
                    <input
                      className="in"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr className="underline2" />

          <div className="btn-container">
            <div className="row">
              <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <button className="help-btn">Get Help</button>
              </div>
              <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <Link
                  to="/dashboard"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <button className="save-btn" onClick={addAdress}>
                    Save & Continue
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>{" "}
      </div>
      <Featur />
      <Footer />
    </div>
  );
}

export default Address;

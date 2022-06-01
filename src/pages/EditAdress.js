import React, { useState } from "react";
import Featur from "../components/Featur";
import "../style/css/editAdress.css";

function EditAddress() {
  const [name, setName] = useState("");
  const [house, setHouseNo] = useState("");
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [town, setTown] = useState("");
  const [district, setDistrict] = useState("");
  const [statee, setStatee] = useState("");
  const [pin, setPin] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className="container">
      <div className="body">
        <div className="container7">
          <div className="title-container7">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <p className="address-title">Edit Address</p>
                <hr className="underline1"></hr>
                <div className="input-container">
                  <p className="label">Full Name</p>
                  <input
                    className="in"
                    type="text"
                    name="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>

                <div className="input-container">
                  <p className="label">House / Office No</p>
                  <input
                    className="in"
                    type="text"
                    name="house"
                    value={house}
                    onChange={(event) => setHouseNo(event.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="form-container7">
            <div className="details">
              <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                  <div className="input-container">
                    <p className="label">Street Address</p>
                    <input
                      className="in"
                      type="text"
                      name="address"
                      value={address}
                      onChange={(event) => setAddress(event.target.value)}
                    />
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                  <div className="input-container">
                    <p className="label">Street Address 2</p>
                    <input
                      className="in"
                      type="text"
                      name="address2"
                      value={address2}
                      onChange={(event) => setAddress2(event.target.value)}
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
                      onChange={(event) => setTown(event.target.value)}
                    />
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                  <div className="input-container">
                    <p className="label">District</p>
                    <input
                      className="in"
                      type="text"
                      name="district"
                      value={district}
                      onChange={(event) => setDistrict(event.target.value)}
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
                      value={statee}
                      onChange={(event) => setStatee(event.target.value)}
                    />
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                  <div className="input-container">
                    <p className="label">Pin code</p>
                    <input
                      className="in"
                      type="text"
                      name="pin"
                      value={pin}
                      onChange={(event) => setPin(event.target.value)}
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
                      onChange={(event) => setPhone(event.target.value)}
                    />
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                  <div className="input-container">
                    <p className="label">Email</p>
                    <input
                      className="in"
                      type="email"
                      name="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
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
                <button className="cancel-btn">Cancel</button>
              </div>
              <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <button className="save-btn">Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Featur />
    </div>
  );
}

export default EditAddress;

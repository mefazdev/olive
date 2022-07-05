import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import "./bookOfMonth.css";
import "./orders.css";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  doc,
  serverTimestamp,
  updateDoc,
  where,
  getDoc,
} from "@firebase/firestore";
import Cookies from "universal-cookie";
import { Table } from "react-bootstrap";
import jsPDF from "jspdf";

import CancelIcon from "@material-ui/icons/Cancel";
import { stringify } from "@firebase/util";
import moment from "moment";
import { Link, useHistory } from "react-router-dom";
import Sidebar from "./Sidebar";
function Orders() {
  const [modalControl, setModalControl] = useState(false);
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [address, setAddress] = useState([]);
  const [allOreder, setAllOreder] = useState(true);
  const [notShipped, setNotShipped] = useState(false);
  const [shipped, setShipped] = useState(false);
  const [delivered, setDelivered] = useState(false);
  const [searchTerm,setSearchTerm] = useState('')

  const cookies = new Cookies();

  const admin = cookies.get("admin");

  const ADDRESS = address.length != 0 ? address[0] : "";
  const fetchData = async () => {
    const q = await query(
      collection(db, "order"),
      orderBy("timestamp", "desc")
    );
    onSnapshot(q, (snapshot) => {
      setOrders(snapshot.docs.map((doc) => doc));
    });
    setAllOreder(true);
    setNotShipped(false);
    setShipped(false);
    setDelivered(false);
  };
  const fetchNotShipped = async () => {
    const q = await query(
      collection(db, "order"),
      where("status", "==", "Not Shipped")
    );
    onSnapshot(q, (snapshot) => {
      setOrders(snapshot.docs.map((doc) => doc));
    });
    setAllOreder(false);
    setNotShipped(true);
    setShipped(false);
    setDelivered(false);
  };
  const fetchShipped = async () => {
    const q = await query(
      collection(db, "order"),
      where("status", "==", "Shipped")
    );
    onSnapshot(q, (snapshot) => {
      setOrders(snapshot.docs.map((doc) => doc));
    });
    setAllOreder(false);
    setNotShipped(false);
    setShipped(true);
    setDelivered(false);
  };
  const fetchDelivered = async () => {
    const q = await query(
      collection(db, "order"),
      where("status", "==", "Delivered")
    );
    onSnapshot(q, (snapshot) => {
      setOrders(snapshot.docs.map((doc) => doc));
    });
    setAllOreder(false);
    setNotShipped(false);
    setShipped(false);
    setDelivered(true);
  };
  const fetchAddress = async () => {
    // const userId =  orders[0].data().userId
    if (orders.length != 0) {
      const q = await query(
        collection(db, "address"),
        where("userID", "==", orders[0].data().userId)
      );
      onSnapshot(q, (snapshot) => {
        setAddress(snapshot.docs.map((doc) => doc.data()));
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    // fetchAdmin()
  }, [orders]);
  useEffect(() => {
    fetchAddress();
  }, [orders]);

  const generatePdf = (data) => {
    const total = stringify(data.data().total - 50);
    // const
    // parseInt( data.data().total)
    const doc = new jsPDF("landscape", "px", "a4", "false");
    // doc.addPage()
    doc.setFont("Helvertico", "bold");

    doc.text(60, 60, String(data.data().orderId));

    doc.setFont("Helvertico", "noraml");
    doc.text(60, 100, "Payment :");
    doc.text(60, 120, "Sub Total :");
    doc.text(60, 140, "Shipping Charge :");
    doc.text(60, 160, "Total :");
    doc.text(60, 180, "Paid : ");

    doc.setFont("Helvertico", "noraml");
    doc.text(170, 100, data.data().paymentType == "online" ? "Prepaid" : "COD");
    doc.text(170, 120, stringify(data.data().total - 50));
    doc.text(170, 140, "50");
    doc.text(170, 160, stringify(data.data().total));
    doc.text(
      170,
      180,
      data.data().paymentType == "online"
        ? stringify(data.data().total)
        : "0.00"
    );

    doc.setFont("Helvertico", "bold");

    doc.text(60, 220, "Adress");
    doc.text(60, 260, "Hose No");
    doc.text(60, 380, "Phone");
    doc.text(60, 400, "Email");
    doc.setFont("Helvertico", "noraml");
    doc.text(160, 240, ADDRESS.name);

    doc.text(160, 260, ADDRESS.houseNo);
    doc.text(160, 280, ADDRESS.streetAddress);
    doc.text(160, 300, ADDRESS.town);
    doc.text(160, 320, ADDRESS.district);
    doc.text(160, 340, ADDRESS.state);
    doc.text(160, 360, ADDRESS.pin);
    doc.text(160, 380, ADDRESS.phone);
    doc.text(160, 400, ADDRESS.email);

    doc.save(data.data().orderId);
  };

  const ControlDeliver = async (id, status) => {
    const docRef = doc(db, "order", id);

    if (status === "Not Shipped") {
      const updateRef = await updateDoc(docRef, {
        status: "Shipped",
        shippedDate: moment(new Date()).unix(),
      });
    } else if (status === "Shipped") {
      const updateRef = await updateDoc(docRef, {
        status: "Delivered",
        deliveredDate: moment(new Date()).unix(),
      });
    } else {
      return "";
    }
  };

  return (
    <div>
      {admin == "true" ? (
        <>
          {" "}
          <NavBar />
          <Sidebar/>
          <div className="order__cat">
            
            <div className="ad__act__head">
              <div className="ad__act__head__left" >
              <h4>
                {allOreder
                  ? "All Orders"
                  : notShipped
                  ? "Not Shipped Orders"
                  : shipped
                  ? "Shipped Orders"
                  : delivered
                  ? "Delivered Orders"
                  : ""}
              </h4>
            


          <input type='search' 
          id="order__search__input"
          placeholder='Search by ID'
          value={searchTerm}
          onChange={((e)=>setSearchTerm(e.target.value))}
          />
           
              </div>
              
              <div className="ad__act__head__right">
                <button onClick={fetchData}>All</button>
                <button onClick={fetchNotShipped}>Not shipped</button>
                <button onClick={fetchShipped}>Shipped</button>
                <button onClick={fetchDelivered}> Delivered</button>
              </div>
              {/* <button onClick={() => console.log(address)}>Add</button> */}
            </div>

            <div className="upload__content"></div>
            {modalControl ? (
              <div className="ad__book__box__modal">
                <div className="book__month__modal">
                  <CancelIcon
                    id="book__month__close"
                    onClick={() => setModalControl(false)}
                  />

                  <button
                    className="bookMonth__button"
                    // onClick={()=>console.log('cat',category)}
                  >
                    {uploading ? "Uploading" : "Upload"}
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}

            <Table striped bordered hover id="order__cat__table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Date</th>
                  <th>Order ID</th>
                  <th>Products</th>
                  <th>Image</th>

                  <th>Total</th>
                  <th>Payment</th>
                  <th>Status</th>
                  {/* <th>Address</th> */}
                  <th>Action</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>

  {orders.filter((val)=>{
    if(searchTerm == ''){
      return val
    } else if(  val.data().orderId.toLowerCase().includes(searchTerm.toLowerCase())){
      return val
    }
    
  }).map((data,index)=>{
    const no = orders.length - index;
    const d = data.data().recivedDate;
    const date = moment.unix(d).format("MMM DD, YY");
                  return (
                    <tr key={index}>
                      <td>{no}</td>
                      <td>{date}</td>
                      <td>{data.data().orderId}</td>
                      <td>
                        {data.data().order.map((order) => {
                          return (
                            <p>
                              {" "}
                              {order.name} ({order.quantity}) <br /> by{" "}
                              {order.author}
                            </p>
                          );
                        })}
                      </td>
                      
                      <td>
                        {data.data().order.map((order, index) => {
                          return (
                            <div key={index} style={{ marginTop: "5px" }}>
                              <img src={order.thumbnail} /> <br />
                            </div>
                          );
                        })}
                      </td>

                      <td>{data.data().total}</td>
                      <td>
                        {data.data().paymentType == "online"
                          ? "Prepaid"
                          : "COD"}
                      </td>
                      <td
                        id={
                          data.data().status == "Delivered"
                            ? "status__active"
                            : "status__non__active"
                        }
                      >
                        {data.data().status}
                      </td>
                      
                      <td>
                        <button
                          id="deliver__button"
                          onClick={() =>
                            ControlDeliver(data.id, data.data().status)
                          }
                        >
                          {data.data().status === "Not Shipped"
                            ? "Ship now"
                            : data.data().status === "Shipped"
                            ? "Deliver Now"
                            : "Deliverd"}
                        </button>
                      </td>
                      <td>
                        <button
                          id="order__download__btn"
                          onClick={() => generatePdf(data)}
                        >
                          Download
                        </button>
                      </td>
                      <td><Link to={`/admin/vieworder/${data.id}`}>View</Link></td>
                    </tr>
                  );
  })}
                {/* {orders.map((data, index) => {
                                   const d = data.data().recivedDate;
                  const date = moment.unix(d).format("MMM DD, YY");

                  const no = orders.length - index;
               
                  return (
                    <tr key={index}>
                      <td>{no}</td>
                      <td>{date}</td>
                      <td>{data.data().orderId}</td>
                      <td>
                        {data.data().order.map((order) => {
                          return (
                            <p>
                              {" "}
                              {order.name} ({order.quantity}) <br /> by{" "}
                              {order.author}
                            </p>
                          );
                        })}
                      </td>
                      
                      <td>
                        {data.data().order.map((order, index) => {
                          return (
                            <div key={index} style={{ marginTop: "5px" }}>
                              <img src={order.thumbnail} /> <br />
                            </div>
                          );
                        })}
                      </td>

                      <td>{data.data().total}</td>
                      <td>
                        {data.data().paymentType == "online"
                          ? "Prepaid"
                          : "COD"}
                      </td>
                      <td
                        id={
                          data.data().status == "Delivered"
                            ? "status__active"
                            : "status__non__active"
                        }
                      >
                        {data.data().status}
                      </td>
                      
                      <td>
                        <button
                          id="deliver__button"
                          onClick={() =>
                            ControlDeliver(data.id, data.data().status)
                          }
                        >
                          {data.data().status === "Not Shipped"
                            ? "Ship now"
                            : data.data().status === "Shipped"
                            ? "Deliver Now"
                            : "Deliverd"}
                        </button>
                      </td>
                      <td>
                        <button
                          id="order__download__btn"
                          onClick={() => generatePdf(data)}
                        >
                          Download
                        </button>
                      </td>
                      <td><Link to={`/admin/vieworder/${data.id}`}>View</Link></td>
                    </tr>
                  );
                })} */}
              </tbody>
            </Table>
          </div>{" "}
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default Orders;




{/* <td>
                        {ADDRESS.name} <br />
                        {ADDRESS.streetAddress}
                        <br /> */}
                        {/* {ADDRESS.town}
                    <br />
                    {ADDRESS.district}
                    <br />
                    {ADDRESS.state}
                    <br />
                    {ADDRESS.pin}
                    <br /> */}
                      {/* </td> */}
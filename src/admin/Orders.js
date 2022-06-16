import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
 
import "./bookOfMonth.css";
import "./orders.css";
import { db,  } from "../firebase";      
import {
  
  collection,
  onSnapshot,
  orderBy,
  query,
 doc,
 serverTimestamp,
  
 
  updateDoc,
  where,
getDoc
} from "@firebase/firestore";
import Cookies from 'universal-cookie';
import { Table } from "react-bootstrap";
import jsPDF from "jspdf";

import CancelIcon from "@material-ui/icons/Cancel";
import { stringify } from "@firebase/util";
import moment from "moment";
import { useHistory } from "react-router-dom";
function Orders() {
  const [user, setUser] = useState({});
  const [modalControl, setModalControl] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [bookMonths, setBookMonths] = useState([]);
  const [orders, setOrders] = useState([]); 
  const [address, setAddress] = useState([]);
 
  const history = useHistory()
  const cookies = new Cookies();

  const admin =cookies.get('admin') 
  // const userId =  orders[0].data().userId

  // onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser);
  //   });
  const ADDRESS = address.length != 0 ? address[0] : "";
  const fetchData = async () => {
    const q = await query(
      collection(db, "order"),
      orderBy("timestamp", "desc")
    );
    onSnapshot(q, (snapshot) => {
      setOrders(snapshot.docs.map((doc) => doc));
      // console.log(snapshot.docs.map((doc) => doc.data))
    });
    console.log(admin)
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
  //  const handleUpload = async ()=>{
  //     setUploading(true)

  //     const docRef = await addDoc(collection(db, "bookMonth"), {
  //        name:name,
  //        description:description,
  //        timestamp: serverTimestamp(),
  //     })
  //     const thumbRef = ref(storage, `bookMonth/${docRef.id}/image`);
  //     await uploadString(thumbRef, image, "data_url").then(async (snapshot) => {
  //       const downloadURL = await getDownloadURL(thumbRef);
  //     await updateDoc(doc(db, "bookMonth", docRef.id), {
  //       image: downloadURL,
  //       });
  //    });
  //    setUploading(false)
  //    setModalControl(false)
  // }

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
    const total = stringify(data.data().total - 50)
    // const 
    // parseInt( data.data().total)
    const doc = new jsPDF("landscape", "px", "a4", "false");
    // doc.addPage()
    doc.setFont("Helvertico", "bold");
    doc.text(60, 60, String( data.data().orderId));
    
    doc.setFont("Helvertico", "noraml");
    doc.text(60,100,'Payment :')
    doc.text(60,120,'Sub Total :')
    doc.text(60,140,'Shipping Charge :')
    doc.text(60,160,'Total :')
    doc.text(60,180,'Paid : ')

    doc.setFont("Helvertico", "noraml");
    doc.text(170,100,data.data().paymentType == 'online'? 'Prepaid' : 'COD')
    doc.text(170,120, stringify(data.data().total - 50) )
    doc.text(170,140,'50')
    doc.text(170,160, stringify(data.data().total) )
    doc.text(170,180,data.data().paymentType == 'online'? stringify(data.data().total)  : '0.00')

    doc.setFont("Helvertico", "bold");
    
    doc.text(60,220,'Adress')
    doc.text(60,260, "Hose No")
    doc.text(60,380, "Phone")
    doc.text(60,400, "Email")
    doc.setFont("Helvertico", "noraml");
    doc.text(160,240, ADDRESS.name)
    
    doc.text(160,260,  ADDRESS.houseNo)
    doc.text(160,280, ADDRESS.streetAddress)
    doc.text(160,300,ADDRESS.town)
    doc.text(160,320,ADDRESS.district)
    doc.text(160,340,ADDRESS.state)
    doc.text(160,360,  ADDRESS.pin)
    doc.text(160,380,  ADDRESS.phone)
    doc.text(160,400,  ADDRESS.email)
    
    


    doc.save(data.data().orderId);
  };

 
  
const ControlDeliver = async (id,status)=>{
  const docRef = doc(db, 'order', id);

   if(status === "Not Shipped"){
   
  const updateRef=  await updateDoc (docRef,  {
   status:'Shipped',
   shippedDate:serverTimestamp()
  })
   } else if(status === 'Shipped'){
    const updateRef=  await updateDoc (docRef,  {
      status:'Delivered',
      deliveredDate:serverTimestamp()
     })
   }else {
    return""
   }
}   
 
  return (


    <div> 
      {admin  == 'true'   ? <> <NavBar />
      <div className="order__cat">
        <div className="ad__act__head">
          <h4>ORDERS</h4>
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
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((data, index) => {
              const no = orders.length - index;
              //   setUser(data.data().userId)
              return (
                <tr key={index}>
                  <td>{no}</td>
                  <td>{moment(data.time).format(
                              "MMM DD YYYY"
                            )}</td>
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
                  {/* <td>{data.data().name}</td>   */}
                  <td>
                    {data.data().order.map((order,index) => {
                      return (
                        <div id={index} style={{ marginTop: "5px" }}>
                           
                          <img src={order.thumbnail} /> <br />
                        </div>
                      );
                    })}
                  </td>
                
                  <td>{data.data().total}</td>
                  <td>{data.data().paymentType == 'online'? 'Prepaid':'COD'}</td>
                  <td id={data.data().status == 'Delivered' ? 'status__active' : 'status__non__active'}>{data.data().status}</td>
                  <td>
                    {ADDRESS.name} <br />
                    {ADDRESS.streetAddress}
                    <br />
                    {ADDRESS.town}
                    <br />
                    {ADDRESS.district}
                    <br />
                    {ADDRESS.state}
                    <br />
                    {ADDRESS.pin}
                    <br />
                  </td>
                  <td>
                    <button
                    id=  "deliver__button"
                    onClick={
                      ()=> ControlDeliver(data.id,data.data().status)
                      
                    }
                    >

                    
                    
                    {
                    data.data().status === "Not Shipped" ? "Ship now" : data.data().status === "Shipped" ? "Deliver Now" :"Deliverd"
                    }
                    </button>
                  </td>
                  <td>
                    <button 
                    id='order__download__btn'
                    onClick={() => generatePdf(data)}>Download</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div> </>: ''}
      
    </div>
  );
}  
  


export default Orders;

// doc.text(60,60,'Item :')
//   doc.text(60,80,'Author :')
//   doc.text(60,100,'Quantity :')
//   doc.setFont('Helvertico','normal')
//   data.data().order.map((data)=>{
//     return(
//     doc.text(130,60,data.name)
//     )
//   })
//   data.data().order.map((data)=>{
//     return(
//     doc.text(130,80,data.author)
//     )
//   })
//   data.data().order.map((data)=>{
//     return(
//     doc.text(13,100,data.quantity.toString())
//     )
//   })

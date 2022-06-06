import React, { useEffect, useState } from "react";
import Featur from "../components/Featur";
import "../style/css/addAdress.css";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import {useStateValue} from '../stateProvider'
import {
 
  onAuthStateChanged
} from "firebase/auth";
import { db, storage } from "../firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  getDocs,
  doc,
  serverTimestamp,
  deleteDoc,
  updateDoc,
  where, getDoc
} from "@firebase/firestore";
import { auth } from "../firebase";
function AddAddress() {
  const [user, setUser] = useState({})
  const [quantity, setQuantity] = useState(false)
  const [address,setAdress] = useState([])



  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });


  const fetchData = async () => {
    const userId = await user?.uid
    if(user){
      const q = await query(
        collection(db, "address"),
        where("userID", "==", userId)
      );
      onSnapshot(q, (snapshot) => {
        setAdress(snapshot.docs.map((doc) => doc));
  
        
      });
      // const data = await getDocs(q);
      // setAdress(data.docs.map((doc) => doc));
    
    };
    }
      

  useEffect(()=>{
    fetchData()
  },[user])
 
  const deletAddress = async (id)=>{
    await deleteDoc(doc(db, "address", id));
  }
  return (
    <div className=" container">
      <div className="container1">
        <div className="path" style={{ marginLeft: "-10px" }}>
          <p>Home </p>
          <ArrowForwardIosIcon id="path__icon" />
          <p>Dashboard </p>
          <ArrowForwardIosIcon id="path__icon" />
          <p>Address</p>
          {/* <button onClick={()=>console.log(address)}>check</button> */}
        </div> 

        <div className="address__details">
          <Row>
            {address.length == 1 ?
             <Col md>
             {address.map((data,id)=>{
               return(

                 <>
                
  <div key={id}  className="data-container"
               style={{
                 background: `url('${process.env.PUBLIC_URL}/images/box1.jpg')`,
               }}
             >
               <div className="name-header">
                 <div className="name-container">
                   <p className="name">{data.data().name}</p>
                 </div>
                 <div className="icon-container">
                   {/* <Link
                     to="/editAddress"
                     style={{ textDecoration: "none", color: "inherit" }}
                   ><img
                       className="edit-icon"
                       src={process.env.PUBLIC_URL + "/images/edit_icon.png"}
                       alt="edit-icon"
                     />
                   </Link> */}

                    <img
                     onClick={()=>deletAddress(data.id)}
                       className="delete-icon"
                       src={process.env.PUBLIC_URL + "/images/delete_icon.png"}
                       alt="delete-icon"
                     />
                   {/* </a> */}
                 </div>
               </div>
               <div className="data-box">
                 <p className="data">House No: {data.data().houseNo}</p>
                 <p className="data">{data.data().streetAddress} </p>
                 {/* <p className="data">Road,</p> */}
                 <p className="data">{data.data().town}</p>
                 <p className="data">{data.data().district}</p>
                 <p className="data">{data.data().state}</p>
                 <p className="data">India, {data.data().pin}</p>
               </div>
              
             </div>
             <Link style={{textDecoration:"none"}} to='/confirm'><div className="address__back">
               <p>Back to parchase</p>
             </div>
             </Link>
             
             </>
               )
             })}
            
           </Col>
            : 
            <Col md>
            <Link style={{textDecoration:'none',color:'inherit'}} to="/addAddress">
            <div
              className="add-container"
              style={{
                background: `url('${process.env.PUBLIC_URL}/images/box1.jpg')`,
              }}
            >
              <a href="#">
                <img
                  className="add-image"
                  src={process.env.PUBLIC_URL + "/images/add.png"}
                  alt="add-icon"
                />
              </a>
              <p>ADD ADDRESS</p>
            </div>
            </Link>
          </Col>
            }
           
           
          </Row>
        </div>
      </div>

      <Featur />
    </div>
  );
}

export default AddAddress;

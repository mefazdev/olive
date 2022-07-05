// import { doc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../admin/navbar.css'
import { db } from '../firebase';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { Table } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import logo from '../images/logo.png'
import NotificationsIcon from '@material-ui/icons/Notifications';
// import { db } from "../firebase";
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
import Orders from './Orders';
function NavBar() {

  const [notiView,setNotiView] = useState(false)
  const [newOrders,setNewOrders] = useState([])
  const cookies = new Cookies();
const history  = useHistory()
  const adminControl = async () =>{
    history.push('/admin@olive')
   
    cookies.set('admin', false,{path:'/'});
     
 }


 const fetchData = async () => {
  const q = await query(
    collection(db, "order"),
    where("viewed", "==", false)
    // orderBy("timestamp", "desc") 
  );
  onSnapshot(q, (snapshot) => {
    setNewOrders(snapshot.docs.map((doc) => doc));
  });
  
 
};
useEffect(()=>{
  fetchData()
},[])
  return (
    <div className='ad__nav'>
          <div className='ad__nav__content'>
            {notiView ?  <div className='admin__not__view'>
           
           {newOrders.map((data,index)=>{
            return(
<Link to={`/admin/vieworder/${data.id}`} key={index} style={{textDecoration:'none',color:'inherit'}}><div className='admin__not__view__row'>
              <h6><span style={{color:'rgba(255, 255, 255, 0.788)'}}>Order received</span> {data.data().orderId}  </h6>
              <p>12:30 PM</p>
            </div></Link>
            )
           })}
            
            
             
          </div> : ''}
         
            <img alt ='' src={logo} />
         <div className='ad__nav__content__right'>
            <div className='ad__nav__content__noti__div'
          onClick={()=>setNotiView(!notiView)}
          >
          <NotificationsIcon id='admin__noti__icon'/>
          {newOrders.length ?   <span>{newOrders?.length}</span>:''}
        

         
          </div>  
        
          
          <button id='ad__nav__logOut' onClick={adminControl}>Logout</button>
          {/* <div className='admin__not__view'></div> */}
          
         </div>
         
          
          </div>
    </div>
  )
}

export default NavBar
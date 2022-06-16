import { doc, updateDoc } from 'firebase/firestore';
import React from 'react'
import { Link } from 'react-router-dom'
import '../admin/navbar.css'
import { db } from '../firebase';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { Table } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
function NavBar() {
  // const [cookies, setCookie] = useCookies(['admin']);
  const cookies = new Cookies();
const history  = useHistory()
  const adminControl = async () =>{
    history.push('/admin@olive')
    // const docRef = doc(db, 'admin','VCpm3OTuga0YidDTEIe4' );
    // const updateRef=  await updateDoc (docRef,  {
    //     admin:false
    //    }) 
      //  setCookie('Admin', false, { path: '/' });
    cookies.set('admin', false,{path:'/'});
     
 }
  return (
    <div className='ad__nav'>
          <div className='ad__nav__content'>
          <Link  to='/admin/orders'><button id='ad__nav__link'>Orders</button></Link>
            <Link   to='/admin/addbook' >
              <button id='ad__nav__link'>Add Book</button>
              </Link>

              <Link  to='/admin/authors'><button id='ad__nav__link'>Authors</button></Link>
    
              <Link   to='/admin/categories'><button id='ad__nav__link'>Categories</button></Link>
              <Link   to='/admin/authorofmonth'><button id='ad__nav__link'>Author of Month</button></Link>
              <Link   to='/admin/bookofmonth'><button id='ad__nav__link'>Book of Month</button></Link>
              <Link  to='/admin/bookTalk'><button id='ad__nav__link'>Book Talk</button></Link>
              <Link  to='/admin/offerzone'><button id='ad__nav__link'>Offer zone</button></Link>

          <button id='ad__nav__logOut' onClick={adminControl}>Logout</button>
          
          </div>
    </div>
  )
}

export default NavBar
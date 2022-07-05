import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Sidebar.css'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import MenuSharpIcon from "@material-ui/icons/MenuSharp";
import CancelIcon from '@material-ui/icons/Cancel';
function Sidebar() {

    const [sidebar,setSideBar] = useState(false)
  return (
     <>
     {sidebar ? <div
    className=  'sidebar' 
    >  
    
    {sidebar ? <CancelIcon
    onClick={()=>setSideBar(false)}
    id='arow__back__icon'/> : ''}
    {/* {!sidebar? <ArrowForwardIosIcon id='arrow__for__icon' onClick={()=>setSideBar(true)}/>
 :''} */}
      <div className='sb__content'>
             
           <Link to='/admin/orders' id='sidebar__link' ><div className='sb__rows'>
                 ORDERS 
            </div></Link>
            
            <Link to='/admin/addbook' id='sidebar__link' ><div className='sb__rows'>
                 ADD BOOK 
            </div></Link>
            <Link to='/admin/authors' id='sidebar__link' ><div className='sb__rows'>
                 AUTHORS 
            </div></Link>
            <Link to='/admin/categories' id='sidebar__link' ><div className='sb__rows'>
                CATEGORIES 
            </div></Link>
            <Link to='/admin/authorofmonth' id='sidebar__link' ><div className='sb__rows'>
                 AUTHOR OF THE MONTH 
            </div></Link>
            <Link to='/admin/bookofmonth' id='sidebar__link' ><div className='sb__rows'>
                 BOOK OF THE MONTH 
            </div></Link>
            <Link to='/admin/bookTalk' id='sidebar__link' ><div className='sb__rows'>
                 BOOK TALK 
            </div></Link>
            <Link to='/admin/offerzone' id='sidebar__link' ><div className='sb__rows'>
                 OFFERZONE 
            </div></Link>
            <Link to='/admin/prebook' id='sidebar__link' ><div className='sb__rows'>
            PRE-ORDER BOOKS
            </div></Link>
            <Link to='/admin/banners' id='sidebar__link' ><div className='sb__rows'>
                BANNERS
            </div></Link>
            <Link to='/admin/productdash' id='sidebar__link' ><div className='sb__rows'>
               PRODUCTS
            </div></Link>
            <a href='https://razorpay.com/' id='sidebar__link'>
               <div className='sb__rows'>
               SALES
            </div>
           </a>
          
            
        </div>  
      
    </div> : ''}
    
    <div className="sidebar__flot__div ">
        <MenuSharpIcon
          id="filter__icon"
          onClick={()=>setSideBar(!sidebar)}
          type="button"
        />
      </div>
    </>
  )
}

export default Sidebar
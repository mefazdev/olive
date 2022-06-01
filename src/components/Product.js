import React from 'react'
import { Image } from 'react-img-placeholder';
import placeImage from '../images/img-placeholder.png'
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
function Product({image,offer,name,author,price,cutPrice}) {
  
 
  return (

    <div className="book__item">
        {/* <img src={image} /> */}
        <Image
      src={image}
      alt="Picture of the author"
      width={100}
      height={150}
      placeholderSrc={placeImage} 
     
    />
        <div className="book__item__name">
                            <h6>{ name}</h6>
                            <p>{ author}</p>
                          </div>
                      
                        <div className="book__item__price__div">
                          <div className="book__item__price__left">
                            <p className="book__item__cut__price">
                              ₹{cutPrice}
                            </p>
                            <p className="book__item__price">₹{price}</p>
                          </div>

                          <AddShoppingCartIcon
                         
                            // onClick={() => setShow(true)}
                            id="book__item___cart__icon"
                          />
                        </div>
                      </div>
  )
}

export default Product
import React from 'react'
import { Link } from 'react-router-dom'
import placeImage from '../images/img-placeholder.png'
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
// import ImageLoader from 'react-imageloader';
import { Image } from 'react-img-placeholder';
function Product({image,offer,name,author,price,cutPrice,placeholder}) {
  return (
    
    <div className="arrived__item">
                   
                  <div className="arrived__item__off">
                    <span>
                      <p>
                        {offer}% <br />
                        off
                      </p>
                    </span>
                    {/* <img src={image} onLoad={benz} /> */}
                    <Image
      src={image}
      alt="Picture of the author"
      width={100}
      height={150}
      placeholderSrc={placeImage} 
     
    />
                  </div>

                  <div className="arrived__item__name">
                    <h6>{name}</h6>
                    <p>{author}</p>
                  </div>
               
                <div className="arrived__item__price">
                  <div className="arrived__item__price__left">
                    <p className="arrived__cut__price">₹{cutPrice}</p>
                    <p className="arrived__price">₹{price}</p>
                  </div>

                  <AddShoppingCartIcon
                    type="button"
                    // onClick={() => setShow(true)}
                    id="arrived___cart__icon"
                  />
                </div>
              </div>
               
  )
}

export default Product
import React, { useState } from "react";
import { Link } from "react-router-dom";
import placeImage from "../images/img-placeholder.png";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

import { Image } from "react-img-placeholder";
import { useStateValue } from "../stateProvider";
import { onAuthStateChanged } from "firebase/auth";
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
  where,
  getDoc,
} from "@firebase/firestore";
import { auth } from "../firebase";
function Product({
  id,
  image,
  offer,
  name,
  author,
  price,
  cutPrice,
  placeholder,
}) {
  const [{ basket }, dispatch] = useStateValue();
  const [user, setUser] = useState({});
  const [quantity, setQuantity] = useState(false);

  const addToCart = async () => {
    setQuantity(true);
    if (!quantity) {
      await addDoc(collection(db, "cart"), {
        quantity: 1,
        userId: user.uid,
        bookId: id,
        thumbnail: image,
        name: name,
        author: author,
        price: price,
        timestamp: serverTimestamp(),
        // data:data
      });
    }
  };

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
 
  const openLogin = () => {
    dispatch({
      type: "OPEN__LOGIN__MODAL",
      signinModal: true,
    });
  };
  return (
    <div className="arrived__item">
      <Link
        to={`/book/${id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div className="arrived__item__off">
          <span>
            <p>
              {offer}% <br />
              off
            </p>
          </span>

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
        </div>
      </Link>
      <div className="arrived__item__price">
        <div className="arrived__item__price__left">
          <p className="arrived__cut__price">₹{cutPrice}</p>
          <p className="arrived__price">₹{price}</p>
        </div>

        <AddShoppingCartIcon
          type="button"
          onClick={user ? addToCart : openLogin}
          id={
            !quantity ? "arrived___cart__icon" : "arrived___cart__icon__active"
          }

          // "arrived___cart__icon"
        />
      </div>
    </div>
  );
}

export default Product;

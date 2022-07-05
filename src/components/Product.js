import React, { useState } from "react";
import { Image } from "react-img-placeholder";
import placeImage from "../images/img-placeholder.png";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { Link } from "react-router-dom";
import { useStateValue } from "../stateProvider";
import { onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "@firebase/firestore";
import { auth } from "../firebase";

function Product({ id, image, name, author, price, cutPrice,offerZone,sale }) {
  const [user, setUser] = useState({});
  const [quantity, setQuantity] = useState(false);
  const [{ basket }, dispatch] = useStateValue();

  const addToCart = async () => {
    setQuantity(true);
    if (!quantity) {
      openToast();
      await addDoc(collection(db, "cart"), {
        quantity: 1,
        userId: user.uid,
        bookId: id,
        thumbnail: image,
        name: name,
        author: author,
        price: price,
        offerZone:offerZone,
        sale:sale,
        timestamp: serverTimestamp(),
      });
   
    }
  };
  const openToast = () => {
    dispatch({
      type: "SHOW__TOAST",
      toast: true,
    });
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
    <div className="book__item">
      {/* <img src={image} /> */}
      <Link
        to={`/book/${id}`}
        style={{
          textDecoration: "none",
          color: "inherit",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Image
          //  style={{margin:'auto'}}
          src={image}
          alt="Picture of the author"
          width={100}
          height={150}
          placeholderSrc={placeImage}
        />
        <div className="book__item__name">
          <h6>{name}</h6>
          <p>{author}</p>
        </div>
      </Link>
      <div className="book__item__price__div">
        <div className="book__item__price__left">
          <p className="book__item__cut__price">₹{cutPrice}</p>
          <p className="book__item__price">₹{price}</p>
        </div>

        <AddShoppingCartIcon
          // onClick={() => setShow(true)}
          type="button"
          onClick={user ? addToCart : openLogin}
          id={
            !quantity ? "arrived___cart__icon" : "arrived___cart__icon__active"
          }
        />
      </div>
    </div>
  );
}

export default Product;

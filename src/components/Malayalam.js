import { useEffect, useState } from "react";
import "./../style/css/malayalam.css";
import "./../style/css/justArrived.css";
import malayalam1 from "../images/malayalam/mal1.jpg";
import malayalam2 from "../images/malayalam/mal2.jpg";
import malayalam3 from "../images/malayalam/mal3.jpg";
import malayalam4 from "../images/malayalam/mal4.jpg";
import malayalam5 from "../images/malayalam/mal5.jpg";
import malayalam6 from "../images/malayalam/mal6.jpeg";
import malayalam7 from "../images/malayalam/mal7.jpg";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import sample from "../images/arrived/review.png";
import paulo from "../images/arrived/paulo.png";

import Alert from "react-bootstrap/Alert";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";
import InfoIcon from "@material-ui/icons/Info";
import ArrowBackIosSharpIcon from "@material-ui/icons/ArrowBackIosSharp";
import Product from "./Product";
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
  where
} from "@firebase/firestore";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
   
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
   
  },
  mobile: {
    breakpoint: { max: 500, min: 0 },
    items: 1,
  
  },
};
function Malayalam() {
  const [show, setShow] = useState(false);
  const [product,setProduct] = useState([])
  const [arrived, setArrived] = useState([
    {
      image: malayalam1,
      name: "കളക്ടർ ബ്രോ",
      author: "പ്രശാന്ത് നായർ",
      cutPrice: "666",
      price: "334",
    },
    {
      image: malayalam2,
      name: "ഒറിജിൻ",
      author: "ഡാൻ ബ്രൗൺ",
      cutPrice: "654",
      price: "678",
    },
    {
      image: malayalam3,
      name: "പച്ച മഞ്ഞ ചുവപ്പ്",
      author: "ഡി രാമകൃഷ്ണൻ",
      cutPrice: "332",
      price: "113",
    },
    {
      image: malayalam4,
      name: "ബാൽക്കൻ ഡയറി",
      author: "ബെജു എൻ നായർ",
      cutPrice: "884",
      price: "756",
    },
    {
      image: malayalam5,
      name: "കേരള ഭക്ഷണ ചരിതം",
      author: "സുമ ശിവദാസ്",
      cutPrice: "445",
      price: "300",
    },
    {
      image: malayalam6,
      name: "നമ്പാടന്റെ നമ്പറുകൾ",
      author: "ലോനപ്പൻ",
      cutPrice: "199",
      price: "115",
    },
    {
      image: malayalam7,
      name: "നമ്പാടന്റെ നമ്പറുകൾ",
      author: "ലോനപ്പൻ",
      cutPrice: "199",
      price: "115",
    },
  ]);

  const fetchData = async () => {
    const q = await query(
      collection(db, "products"),
       where("popMalayalam", "==", true)
     );
         const data =   await getDocs(q)
           setProduct(data.docs.map((doc) => doc));
  };
  

  useEffect(()=>{
    // fetchData()
  },[])
  return (
    <div className="malayalam">
      <div className="malayalam__head__row ">
        <h5>Popular Malayalam Books</h5>
      
      </div>
      

      <div className="malayalam__row">
        <Carousel
          swipeable={true}
          draggable={true}
          //   showDots={true}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          autoPlay={true}
          // autoPlaySpeed={1000}
          keyBoardControl={true}
          // customTransition="all .5"
          // transitionDuration={2000}
          customTransition={"ease 1000ms"}
          containerClass="carousel-container"
          removeArrowOnDeviceType={[ "mobile"]}
          centerMode={true}
          dotListClass="custom-dot-list-style"
          itemClass="popular__ani"
        >
          {product.map((data) => {
            return (
              <Link to={`/book/${data.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
              >
              <Product
                     style={{ textDecoration: "none", color: "inherit" }} 
              name={data.data().name}
              author={data.data().author}
              image={data.data().thumbnail}
              price={data.data().price}
              cutPrice={data.data().cutPrice}
              
              />
              </Link>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
}

export default Malayalam;

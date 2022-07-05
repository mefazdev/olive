import "../style/css/author.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import pualo from "../images/author/paulo.png";
import best1 from "../images/author/best1.png";
import best2 from "../images/author/best2.png";
import best3 from "../images/author/best3.png";
import best4 from "../images/author/best4.png";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Featur from "../components/Featur";
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import {
  collection,
  query,
  getDocs,
  doc,
  where,
  getDoc,
} from "@firebase/firestore";
import { db } from "../firebase";
import Product from "../components/Product";
import Header from "../components/Header";
function Author() {
  const [show, setShow] = useState(false);
  const [author, setAuthor] = useState({});
  const [books, setBooks] = useState([]);
  const id = useParams();
   

  const fetchData = async () => {
    const docRef = doc(db, "authors", id.id);
    const docSnap = await getDoc(docRef);

    setAuthor(docSnap.data());
  };
  const fetchBooks = async () => {
    const q = await query(
      collection(db, "products"),
      where("author", "==", author.name)
      // where( author.name , "==", "author",)
    );
    const data = await getDocs(q);
    setBooks(data.docs.map((doc) => doc));
    console.log("OKKKK", author.name.toString());
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [author]);
  return (
    <>
      <Header />
      <div className="author container">
        <div className="author__content">
          <Container>
            <Row>
              <Col sm="12" md="4" className="author__img__col">
                <img className="col-12" src={author.image} />
              </Col>
              <Col className="author__data__col" md="7">
                <div className="author__data">
                  <h2>{author.name}</h2>
                  <div className="author__data__row">
                    <h5 onClick={fetchBooks}>Born</h5>

                    <h6>{author.birth}</h6>
                  </div>
                  <div className="author__data__row">
                    <h5>Genre</h5>

                    <h6>{author.genre}</h6>
                  </div>
                  <div className="author__data__row">
                    <h5>Language</h5>
                    <h6>{author.language}</h6>
                  </div>
                  <div className="author__data__row">
                    <h5>Nationality</h5>
                    <h6>{author.nationality}</h6>
                  </div>
                  <div className="author__data__row">
                    <h5>Notable works</h5>
                    <h6>{author.work}</h6>
                  </div>
                  <div className="author__data__row">
                    <h5>First book</h5>
                    <h6>{author.firstBook}</h6>
                  </div>
                  <div className="author__data__row">
                    <h5>Latest Work</h5>
                    <h6>{author.latestWork}</h6>
                  </div>
                </div>
              </Col>
            </Row>

            <Row>
              <Col sm="12" md="4">
                <div className="author__text">
                  <p className="col-12">{author.description}</p>
                </div>
              </Col>

              <Col className="author__books" md="7">
                <h3>Books of Coelho</h3>
                <Row>
                  {books.map((data) => {
                    return (
                      <Product
                        style={{ textDecoration: "none", color: "inherit" }}
                        name={data.data().name}
                        author={data.data().author}
                        image={data.data().thumbnail}
                        price={data.data().price}
                        cutPrice={data.data().cutPrice}
                        id={data.id}
                        sale = {data.data().salse}
                      />
                    );
                  })}
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
        <Featur />
      </div>{" "}
      <Footer />{" "}
    </>
  );
}

export default Author;

import React, { useEffect, useState } from 'react'
import { db, storage } from "../firebase";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
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

function BoolOfMonth() {
const [book,setBook] = useState([])
const [author, setAuthor] = useState([])
    const fetchBook = async () => {
        const q = await query(
          collection(db, "bookMonth"), orderBy("timestamp", "desc"));
             const data =   await getDocs(q)
               setBook(data.docs.map((doc) => doc));
      };
      const fetchAuthor = async () => {
        const q = await query(
          collection(db, "authorMonth"), orderBy("timestamp", "desc"));
             const data =   await getDocs(q)
               setAuthor(data.docs.map((doc) => doc));
      };
      useEffect(()=>{
        // fetchBook()
        // fetchAuthor()
      },[])
      
  return (
    <div className="home__month__row">
    <Row>
      <Col md>
        <div className="home__month">
          <div className="home__month__content">
            <Row>
            {book.map((data,index)=>{
                 if(index <1){
                     return(
                       <>
<Col md="4" id="month__book__col">
                <img className="col-8 col-md-11" src={data.data().image} />
              </Col>
             
<Col md="8">
                <h6>Book of the month</h6>
                <h4>Ayurveda: medicine without side-effects</h4>
                <p>
                  This book is not a defence of Ayurveda. A sound,
                  scientific framework of healthcare that has saved
                  countless lives over 5000 years does not need defenders.
                  It needs champions, and to be given wings. In a world that
                  needs Ayurveda more than ever, Dr G.G. Gangadharan, who
                  has been researching both the theory and the practice for
                  the past thirty-five years, shows in his book the logic
                  behind the science.
                  <span style={{ color: "#46CE04" }}>Read More</span>
                </p>
              </Col>
                   
              </>
                     )
                 }
                })}
      
                
            </Row>
          </div>
        </div>
      </Col>
      <Col md>
        <Col md>
          <div className="home__month">
            <div className="home__month__content">
              <Row>
                {author.map((data,index)=>{
                  if(index < 1){
                    return(
                      <>
                      <Col md="4" id="month__book__col">
                  <img className="col-8 col-md-11" src={data.data().image} />
                </Col>
                <Col md="8">
                  <h6>Author of the month</h6>
                  <h4>{data.data().name}</h4>
                  <p>
                    {data.data().description}
                    <span style={{ color: "#46CE04" }}>Read More</span>
                  </p>
                </Col>
                </>
                    )
                  }
                })}
                
              </Row>
            </div>
          </div>
        </Col>
      </Col>
    </Row>
  </div>
  )
}

export default BoolOfMonth
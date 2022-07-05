import "../style/css/author.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
 
import { useEffect, useState } from "react";
import './authors.css'
import Cookies from 'universal-cookie';
import { useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
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
    where,getDoc
  } from "@firebase/firestore";
  import { deleteObject, getDownloadURL, ref, uploadString } from 'firebase/storage';
  
import { db,storage } from "../firebase";
import Product from "../components/Product";
import CancelIcon from '@material-ui/icons/Cancel';

import Sidebar from "./Sidebar";
import NavBar from "./NavBar";
function AuthorView() {
  const [show, setShow] = useState(false);
  const [author, setAuthor] = useState({});
  const [books, setBooks] = useState([]);
  const id = useParams();

  const [modalControl, setModalControl] = useState(false)
  const [name, setName] = useState('')
  const [description,setDescription] = useState('')
  const [image, setImage] = useState('')
 const [uploading, setUploading] = useState(false) 
 const [authors, setAuthors] = useState([])
 
 const [born,setBorn] = useState('')
 const [genre,setGenre] = useState('')
 const [language,setLanguage] = useState('')
 const [nationality,setNationality] = useState('')
 const [work,setWork] = useState('')
 const [firstBook,setFirstBook] = useState('')
 const [latestWork,setLatestWork] = useState('')
 const cookies = new Cookies();
 
 const admin = cookies.get('admin')
   

  const fetchData = async () => {
    const docRef = doc(db, "authors", id.id);
    const docSnap = await getDoc(docRef);

    setAuthor(docSnap.data());
    const data = docSnap.data()
    setName(data.name)
    setBorn(data.born)
    setGenre(data.genre)
    setLanguage(data.language)
    setNationality(data.nationality)
    setWork(data.work)
    setFirstBook(data.firstBook)
    setLatestWork(data.latestWork)
    setDescription(data.description)
    setImage(data.image)
  };
  const fetchBooks = async () => {
    const q = await query(
      collection(db, "products"),
      where("author", "==", author.name)
       
    );
    const data = await getDocs(q);
    setBooks(data.docs.map((doc) => doc));
    
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [author]);


  const handleEdit = async ()=>{
    setUploading(true)
    const docRef = doc(db, "authors", id.id);
    const updateRef = await updateDoc(docRef, {
        name:name,
        description:description,
        born:born,
        genre:genre,
        nationality:nationality,
        language:language,
        work:work,
        firstBook:firstBook,
        latestWork:latestWork,
        
        timestamp: serverTimestamp(),
         });
  
     
       
   setUploading(false)
   setModalControl(false)   
}
const handleImage = async (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = async (readerEvent) => {
      setImage(readerEvent.target.result);
      const thumbRef = ref(storage, `authors/${id.id}/image`);
    await uploadString(thumbRef, readerEvent.target.result, "data_url").then(
      async (snapshot) => {
        const downloadURL1 = await getDownloadURL(thumbRef);
        await updateDoc(doc(db, "authors", id.id), {
         image:downloadURL1,
        });
      }
    );
    };
    
    
  };
  return (
    <>
     <NavBar/>
        <Sidebar/>

        {/* <button onClick={()=>console.log(name)} >Chek</button> */}
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
                      />
                    );
                  })}
                </Row>
              </Col>
            </Row>
          </Container>

                  
        </div>
        <div className="edit__author__btn">
            <button onClick={()=>setModalControl(true)}>Edit Author</button>
          </div>
      </div>{" "}

      <Modal
        show={modalControl}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
  
            <div className='ad__book__box'>
                <CancelIcon id='book__month__close'
                onClick={()=>setModalControl(false)}
                />
  
                      
              <Row>
                <Col>  <div className='add__book__modal__row__item'>
              
                 <input
                 value={name}
                 onChange={((e)=>setName(e.target.value))}
                 placeholder='Name'
                 type='text'/>
  
               </div></Col>
                <Col><div className='add__book__modal__row__item'>
               
                 <input
                 value={born}
                 onChange={((e)=>setBorn(e.target.value))}
                  placeholder='Born'/>
  
               </div></Col>
              </Row>
              <Row>
                <Col  >  <div className='add__book__modal__row__item'>
               
                 <input
                 placeholder='Genre'
                 
                 onChange={((e)=>setGenre(e.target.value))} value={genre}
                 />
  
               </div></Col>
                <Col  ><div className='add__book__modal__row__item'>
               
                 <input
                 placeholder='Language'
                 value={language} onChange={((e)=>setLanguage(e.target.value))}
                  />
  
               </div></Col>
              </Row>
              <Row>
                <Col>  <div className='add__book__modal__row__item'>
              
                 <input 
                 placeholder='Nationality'
                 value={nationality} onChange={((e)=>setNationality(e.target.value))} 
                 />
  
               </div></Col>
                <Col><div className='add__book__modal__row__item'>
                
                 <input 
                 placeholder='Notable Work'
                 value={work} onChange={((e)=>setWork(e.target.value))}
                  />
  
               </div></Col>
              </Row>
              <Row>
                <Col>  <div className='add__book__modal__row__item'>
              
                 <input 
                 placeholder='First Book'
                 value={firstBook} onChange={((e)=>setFirstBook(e.target.value))} 
                 />
  
               </div></Col>
                <Col><div className='add__book__modal__row__item'>
                
                 <input 
                 placeholder='Latest Work'
                 value={latestWork} onChange={((e)=>setLatestWork(e.target.value))}
                  />
  
               </div></Col>
              </Row>
             
              <Row>
                <Col>  
                {/* <div className='add__book__modal__row__item'>
                <label style={{marginLeft:'10px'}}>Photo</label>
                 <input
               
                 type='file'
                 
                 onChange={handleImage}
                 />
  
               </div> */}

<img src={image} /> <br />
                <div className="file-input">
                  <input type="file" id="img2" onChange={handleImage} />
                  <label htmlFor="img2">Change Image 1</label>
                </div>
               </Col>
               
              </Row>
              <div className='ad__book__desc'>
                <textarea
                value={description}
                onChange={((e)=>setDescription(e.target.value))}
                placeholder='Description'
                rows='5' />
              </div>
               <button className='bookMonth__button'  
               onClick={handleEdit}
              // onClick={()=>console.log('cat',category)}
               >{uploading ? "Uploading" : "Upload"}</button>
                </div>
                
         </Modal>
      
    </>
  );
}

export default AuthorView;

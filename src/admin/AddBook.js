import React, { useEffect, useState } from 'react'
import '../admin/addBook.css'
import Navbar from '../admin/NavBar'
import CancelIcon from '@material-ui/icons/Cancel';
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import {db} from '../firebase'
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
import { deleteObject, getDownloadURL, ref, uploadString } from 'firebase/storage';
import { Table } from 'react-bootstrap';

function AddBook() {

    const [modalControl,setModalControl] = useState(false)
    const [uploading,setUploading] = useState (false)
    const [products, setProducts] = useState([]) 
    const [name,setName] = useState()
    const [author, setAuthor] =  useState('')
    const [publisher, setPublisher] = useState('')
    const [language, setLanguage] = useState('')
    const [price, setPrice] = useState('')
    const [cutPrice, setCutPrice] = useState('')
    const [discount, setDiscount] = useState('')
    const [category, setCategory] = useState('')
    const [edition, setEdition] = useState('')
    const [pages, setPages] = useState('')
    const [bookFormat, setBookFormat] = useState('')
    const [binding, setBinding] = useState('')
    const [multimedia, setMultimedia] = useState('')
    const [description, setDescription] = useState('')
    const [pubDate,setPubDate] = useState('')
    const [justArrived, setJustArrived] = useState(Boolean)
    const [bestSeller, setBestSeller] = useState(Boolean)
    const [popMalayalam,setPopMalayalam] = useState(Boolean )
    const [classic,setClassic] = useState(Boolean)
    const [thumbnail, setThumbnail] = useState('')
    const [image2,setImage2] = useState('')
    const [image3, setImage3] = useState('')
   const  [fethedCategory, setFethedCategory] = useState([])
   const [all, setAll] = useState(true)
   const [popMlm, setPopMlm] = useState(false)
   const [justArvd, setJustArvd] = useState(false)
 const [bSeller, setBSeler] = useState(false)
   const fetchData = async () => {
    const q = await query(collection(db, "products"), orderBy("timestamp", "desc"));
    onSnapshot(q, (snapshot) => {
      setProducts(snapshot.docs.map((doc) => doc));
      // console.log(snapshot.docs.map((doc) => doc.data))
    });
    setBSeler(false)
    setAll(true)
    setPopMlm(false)
      setJustArvd(false)
  }
const handleUpload = async ()=>{
  setUploading(true)

  const docRef = await addDoc(collection(db, "products"), {
   name:name,
   author:author,
   publisher:publisher,
   language:language,
   price:price,
   cutPrice:cutPrice,
   discount:discount,
   category:category,
   edition:edition,
   pages:pages,
   bookformat:bookFormat,
   binding:binding,
   multimedia:multimedia,
   description:description,
   pubDate:pubDate,
   justArrived:justArrived,
   bestSeller:bestSeller,
   classic:classic,
   popMalayalam:popMalayalam,
  timestamp: serverTimestamp(),     
 });

 const thumbRef = ref(storage, `upload/${docRef.id}/thumbnail`);
 await uploadString(thumbRef, thumbnail, "data_url").then(async (snapshot) => {
   const downloadURL1 = await getDownloadURL(thumbRef);
 await updateDoc(doc(db, "products", docRef.id), {
     thumbnail: downloadURL1,
   });
});

const image2Ref = ref(storage, `upload/${docRef.id}/image2`);
 
await uploadString(image2Ref, image2, "data_url").then(async (snapshot) => {
  const downloadURL = await getDownloadURL(image2Ref);

  await updateDoc(doc(db, "products", docRef.id), {
    image2: downloadURL,
  });
});
const image3Ref = ref(storage, `upload/${docRef.id}/image3`);
 
    await uploadString(image3Ref, image3, "data_url").then(async (snapshot) => {
      const downloadURL = await getDownloadURL(image3Ref);

      await updateDoc(doc(db, "products", docRef.id), {
        image3: downloadURL,
      
      });

      
    });

setUploading(false)
setModalControl(false)

}

   const fethCategory = async ()=>{
    const q = await query(collection(db, "categories"), orderBy("timestamp", "desc"));
    onSnapshot(q, (snapshot) => {
      setFethedCategory(snapshot.docs.map((doc) => doc));

    });
   }
const handleThumbnail = (e)=>{
  const reader = new FileReader();
  if (e.target.files[0]) {
    reader.readAsDataURL(e.target.files[0]);
  }

  reader.onload = (readerEvent) => {
    setThumbnail(readerEvent.target.result);
   
  };
}
const handleImageTwo = (e)=>{
  const reader = new FileReader();
  if (e.target.files[0]) {
    reader.readAsDataURL(e.target.files[0]);
  }

  reader.onload = (readerEvent) => {
    setImage2(readerEvent.target.result);
   
  };
}
const handleImageThree = (e)=>{
  const reader = new FileReader();
  if (e.target.files[0]) {
    reader.readAsDataURL(e.target.files[0]);
  }

  reader.onload = (readerEvent) => {
    setImage3(readerEvent.target.result);
   
  };
}


const deletItem = async (id) => {
  await deleteDoc(doc(db, "products", id));
  const imageRef = ref(storage, `upload/${id}/image`);
  deleteObject(imageRef).then(console.log("image deleted"));
};


const controlBestSeller = ()=>{
  fetchBestSeller()

  setBSeler(true)
  setAll(false)
  setPopMlm(false)
  setJustArvd(false)
  // fetchJustArrived()
}
const controlJustArrived = async ()=>{
  setBSeler(false)
  setAll(false)
  setPopMlm(false)
  setJustArvd(true)
  fetchJustArrived()
}
const controlPopularMalayalam = ()=>{
  setBSeler(false)
  setAll(false)
  setPopMlm(true)
  setJustArvd(false)
  fetchPopMalayalam()
  
}
const fetchBestSeller = async () => {
  const q = await query(
   collection(db, "products"),
    where("bestSeller", "==", true)
  );
      const data =   await getDocs(q)
        setProducts(data.docs.map((doc) => doc));
};

const fetchJustArrived = async () => {
  const q = await query(
   collection(db, "products"),
    where("justArrived", "==", true)
  );
      const data =   await getDocs(q)
        setProducts(data.docs.map((doc) => doc));
};

const fetchPopMalayalam = async () => {
  const q = await query(
   collection(db, "products"),
    where("popMalayalam", "==", true)
  );
      const data =   await getDocs(q)
        setProducts(data.docs.map((doc) => doc));
};
useEffect(()=>{
fethCategory()
fetchData()
},[])
    return (
      <>   
      <Navbar/>  
       <div className='ad__cat'>
    <div className='ad__act__head'>
    <h4>Uploads</h4>
   <button onClick={()=>setModalControl(true)} >Add</button>
    </div>  
 
    <div className='upload__content'>
        <div className='upload__content__head'>
        <p>
          {
             all ? 'All' : justArvd ? 'Just Arrived' : bSeller ? 'Best Seller' : popMlm ? 'Popular Malayalam': '' 
          }
        </p>
        <div>  
            <button onClick={fetchData}>All</button>
            <button onClick={controlJustArrived}>Just Arrived</button>
            <button onClick={controlBestSeller}>Best Seller</button>
            <button onClick={controlPopularMalayalam}>Popular Malayalam</button>
        </div>
        </div>

         <Table striped bordered hover id='ad__cat__table'>
  <thead>
    <tr>
      <th>#</th>
      <th>Name</th>
      <th>Author</th>
      <th>Price</th>
      <th>Category</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
      {products.map((data,index)=>{
          const no = products.length - index
          return(
<tr key={index}>
      <td>{no}</td>
      <td>{data.data().name}</td>  
      <td>{data.data().author} </td>
      <td>{data.data().price}</td>
      <td>{data.data().category}</td>
      <td><img src={data.data().thumbnail}/></td>
      <td><button value={data.id}
        onClick={(e) => deletItem(e.target.value)}
        >Delete</button></td>
    </tr>
          )
      })}
    
   
   
  </tbody>
</Table> 
    </div> 
    </div>

    {/* <Modal
        show={true}
        // size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      > */}
      {modalControl ? <div className='ad__book__box__modal'>
          <div className='ad__book__box'>
              <CancelIcon id='close__icon'
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
               value={author}
               onChange={((e)=>setAuthor(e.target.value))}
                placeholder='Author'/>

             </div></Col>
            </Row>
            <Row>
              <Col  >  <div className='add__book__modal__row__item'>
             
               <input
               placeholder='Publisher'
               
               onChange={((e)=>setPublisher(e.target.value))} value={publisher}/>

             </div></Col>
              <Col  ><div className='add__book__modal__row__item'>
             
               <input
               placeholder='Language'
               value={language} onChange={((e)=>setLanguage(e.target.value))} />

             </div></Col>
            </Row>
            <Row>
              <Col>  <div className='add__book__modal__row__item'>
            
               <input 
               placeholder='Price'
               value={price} onChange={((e)=>setPrice(e.target.value))} />

             </div></Col>
              <Col><div className='add__book__modal__row__item'>
              
               <input 
               placeholder='Cut-price'
               value={cutPrice} onChange={((e)=>setCutPrice(e.target.value))} />

             </div></Col>
            </Row>
            <Row>
              <Col>  <div className='add__book__modal__row__item'>
             
               <select 
               onChange={((e)=>setCategory(e.target.value))}
               >
                 <option>
                  Category
                 </option>
                 {fethedCategory.map((data,index)=>{
                   const option = data.data().title
                   return(
                    <option  id={index}>
                   {option}
                   </option>
                   )
                 })}
               
               </select>

             </div></Col>
              <Col><div className='add__book__modal__row__item'>
            
               <input
               placeholder='Discount'
               value={discount}
               onChange={((e)=>setDiscount(e.target.value))}
               />

             </div></Col>
            
           </Row>
            
  
            <Row>
              <Col>  <div className='add__book__modal__row__item'>
               <input
               placeholder='Edition'
               value={edition}
               onChange={((e)=>setEdition(e.target.value))}
               />

             </div></Col>
              <Col><div className='add__book__modal__row__item'>
              <input
               placeholder='Pages'
               value={pages}
               onChange={((e)=>setPages(e.target.value))}
               />
                            </div></Col>
            </Row>
            <Row>
              <Col>  <div className='add__book__modal__row__item'>
               <input
               placeholder='Book format'
               value={bookFormat}
               onChange={((e)=>setBookFormat(e.target.value))}
               />

             </div></Col>
              <Col><div className='add__book__modal__row__item'>
              <input
               placeholder='Binding'
               value={binding}
               onChange={((e)=>setBinding(e.target.value))}
               />
                            </div></Col>
            </Row>
            <Row>
              <Col>  <div className='add__book__modal__row__item'>
               <input
               placeholder='Multimedia'
               value={multimedia}
               onChange={((e)=>setMultimedia(e.target.value))}
               />

             </div></Col>
              <Col><div className='add__book__modal__row__item'>
              <label>Publishing Date</label>
              <input
              type='date'
               placeholder='Publishing Date'
               value={pubDate}
               onChange={((e)=>setPubDate (e.target.value))}
               />
                            </div></Col>
            </Row>
            <Row>
              <Col>  <div className='add__book__modal__row__item'>
              <label>Thumbnail</label>
               <input
             
               type='file'
               
               onChange={handleThumbnail}
               />

             </div></Col>
              <Col><div className='add__book__modal__row__item'>
              <label>Image(2)</label>
              <input
              type='file'
               
               
               onChange={handleImageTwo}
               />
                            </div></Col>
            </Row>
            <Row>
              <Col>  <div className='add__book__modal__row__item'>
               <label>Image(3)</label>
               <input
             
             type='file'
            
               onChange={handleImageThree}
               />

             </div></Col>
              <Col><div className='add__book__modal__row__item'>
              {/* <label>Publishing Date</label>
              <input
              type='date'
               placeholder='Publishing Date'
               value={pubDate}
               onChange={((e)=>setPubDate (e.target.value))}
               /> */}
                            </div></Col>
            </Row>
            <div className='ad__book__desc'>
              <textarea
              onChange={((e)=>setDescription(e.target.value))}
              placeholder='Description'
              rows='5' />
            </div>
            <Row>
              <Col>  <div className='add__book__modal__radio'>
              <label>Just Arrived ?</label>
               <input
               type='checkbox'
              //  value={justArrived}
               onChange={((e)=>setJustArrived(!justArrived))}
               />

             </div></Col>
              <Col><div className='add__book__modal__radio'>
              <label>Best Seller ?</label>
              <input
              type='checkbox'
              //  placeholder='Publishing Date'
               value={bestSeller}
               onChange={((e)=>setBestSeller (!bestSeller))}
               />
                            </div></Col>
            </Row>
            
            <Row>
              <Col>  <div className='add__book__modal__radio'>
              <label>Popular Malayalam ?</label>
               <input
               type='checkbox'
              //  value={multimedia}
               onChange={((e)=>setPopMalayalam(!popMalayalam))}
               />

             </div></Col>
              <Col><div className='add__book__modal__radio'>
              <label>Classic</label>
              <input
              type='checkbox'
             
               
               onChange={((e)=>setClassic (!classic))}
               />
                            </div></Col>
            </Row>
            
           
             
           
             
             <button 
            
            onClick={handleUpload}
            // onClick={()=>console.log('cat',category)}
             >{uploading ? "Uploading" : "Upload"}</button>

          </div></div> : ''}

          
      </>
   
  )
}

export default AddBook
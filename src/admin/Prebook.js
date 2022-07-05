import React, { useEffect, useState } from 'react'
import '../admin/addBook.css'
import Navbar from '../admin/NavBar'
import CancelIcon from '@material-ui/icons/Cancel';
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EditIcon from '@material-ui/icons/Edit';
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
  where,
  getDoc,

} from "@firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadString } from 'firebase/storage';
import { Table } from 'react-bootstrap';

import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import shortid from 'shortid';
function PreBook() {
//  const [admin,setAdmin] =useState ({})
    const [modalControl,setModalControl] = useState(false)
    const [uploading,setUploading] = useState (false)
    const [products, setProducts] = useState([]) 
    const [name,setName] = useState('')
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
    const [stock,setStock] = useState('')
   
   const  [fethedCategory, setFethedCategory] = useState([])
 
  const [authors,setAuthors] = useState([])

  const cookies = new Cookies();
  const admin = (cookies.get('admin'))

const [searchTerm,setSearchTerm] = useState('')
const [searchBy, setSearchBy] = useState()

   const fetchData = async () => {
    const q = await query(collection(db, "prebook"), orderBy("timestamp", "desc"));
    onSnapshot(q, (snapshot) => {
      setProducts(snapshot.docs.map((doc) => doc));
      // console.log(snapshot.docs.map((doc) => doc.data))
    });
    
  }

  const fetchAuthors = async () => {
    const q = await query(
      collection(db, "authors"),
      orderBy("name"),
      //  orderBy('timestamp', "desc")
       );
         const data =   await getDocs(q)
           setAuthors(data.docs.map((doc) => doc));
  };

  useEffect(()=>{
    fetchAuthors()
    
  },[])
  
const handleUpload = async ()=>{
  setUploading(true)
  const productId = shortid.generate();

  const docRef = await addDoc(collection(db, "prebook"), {
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
   offerZone:false,
  stock:stock,
  productId:productId,
  timestamp: serverTimestamp(),     
 });

 const thumbRef = ref(storage, `upload/${docRef.id}/thumbnail`);
 await uploadString(thumbRef, thumbnail, "data_url").then(async (snapshot) => {
   const downloadURL1 = await getDownloadURL(thumbRef);
 await updateDoc(doc(db, "prebook", docRef.id), {
     thumbnail: downloadURL1,
   });
});

const image2Ref = ref(storage, `upload/${docRef.id}/image2`);
 
await uploadString(image2Ref, image2, "data_url").then(async (snapshot) => {
  const downloadURL = await getDownloadURL(image2Ref);

  await updateDoc(doc(db, "prebook", docRef.id), {
    image2: downloadURL,
  });
});
const image3Ref = ref(storage, `upload/${docRef.id}/image3`);
 
    await uploadString(image3Ref, image3, "data_url").then(async (snapshot) => {
      const downloadURL = await getDownloadURL(image3Ref);

      await updateDoc(doc(db, "prebook", docRef.id), {
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
  await deleteDoc(doc(db, "prebook", id));
  const imageRef = ref(storage, `upload/${id}/image`);
  deleteObject(imageRef)
//   .then(console.log("image deleted"));
};
 

 
 

const editStock = async (id)=>{
  const docRef = doc(db, "prebook", id);
  const updateRef = await updateDoc(docRef, {
   stock:stock  
     
  });
setStock('')
}
useEffect(()=>{
fethCategory()
fetchData()
},[])
    return (
     
      <>  
      { admin == 'true' ? <> <Navbar/> 
      <Sidebar/> 
       <div className='ad__cat'>
    <div className='ad__act__head'>
    <h4  >Pre-order Books</h4>
   <button onClick={()=>setModalControl(true)} >Add</button>
    </div>  
 
    <div className='upload__content'>
        <div className='upload__content__head'>
          {/* <div className=' upload__content__head__left'> */}
            <p>
              
          {/* {
             all ? 'All' : justArvd ? 'Just Arrived' : bSeller ? 'Best Seller' : popMlm ? 'Popular Malayalam': '' 
          } */}
        </p>
        {/* <div className='flex upload__content__head__btn__div'>  
            <button onClick={fetchData}>All</button>
            <button onClick={fetchClassic}>Classic</button>
            <button onClick={controlJustArrived}>Just Arrived</button>
            <button onClick={controlBestSeller}>Best Seller</button>
            <button onClick={controlPopularMalayalam}>Popular Malayalam</button>
        </div> */}
        {/* </div> */}
        <div className='upload__content__head__right'>
          <input type='search' 
          placeholder='Search for...'
          value={searchTerm}
          onChange={((e)=>setSearchTerm(e.target.value))}
          />
          <select
          onChange={((e)=>setSearchBy(e.target.value))}
          >
            <option>Search by</option>
            <option value='name'>Name</option>
            <option value='productId'>Product Id</option>
            <option value='category'>Category</option>
            <option value='author' >Author</option>
          </select>
          {/* <button onClick={()=>console.log(searchBy)}>check</button> */}
        </div>
        
        </div>

         <Table striped bordered hover id='ad__cat__table'>
  <thead>
    <tr>
      <th>#</th>
      <th>ID</th>
      <th>Name</th>
      <th>Author</th>
      <th>Price</th>
      <th>Category</th>
      <th></th>
      <th>Stock</th>
      <th>Action</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
       
    
   {products.filter((val)=>{
   
    if(searchTerm == ''){
      return val
    }else if (
      searchBy == 'category' ? val.data().category.toLowerCase().includes(searchTerm.toLowerCase()) :
      searchBy == 'name' ? val.data().name.toLowerCase().includes(searchTerm.toLowerCase()) :
     
      searchBy == 'author' ? val.data().author.toLowerCase().includes(searchTerm.toLowerCase())
       :
       searchBy == 'productId' ? val.data().productId.toLowerCase().includes(searchTerm.toLowerCase()):
        val.data().name.toLowerCase().includes(searchTerm.toLowerCase())      
       
       ){
      return val
    }
   }).map((data, index)=>{
    const no = products.length - index
   
    return(
      <tr key={index}>
            <td>{no}</td>
            <td>{data.data().productId}</td>
            <td>{data.data().name}</td>  
            <td>{data.data().author} </td>
            <td>{data.data().price}</td>
            <td>{data.data().category}</td>
            <td><img src={data.data().thumbnail}/></td>
            <td>
            {data.data().stock} 
        
              <div className='edit__stock__div'>
                <input value={stock} placeholder='Update' type='number'
                onChange={((e)=>setStock(e.target.value))}
                />
                <button
                onClick={()=>editStock(data.id)}
                >Done</button></div>
             
            </td>
            <td><button value={data.id} id='ad__cat__table__button'
              onClick={(e) => deletItem(e.target.value)}
              >Delete</button></td>
               <td><Link to={`/admin/prebookview/${data.id}`}>View</Link></td>
          </tr> 

    )
   })}
   
  </tbody>
</Table> 
    </div> 
    </div></> : ""} 
     

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
             
           
              <select 
               onChange={((e)=>setAuthor(e.target.value))}
               >
                 <option>
                Author
                 </option>
                 {authors.map((data,index)=>{
                   const option = data.data().name
                   return(
                    <option  id={index}>
                   {option}
                   </option>
                   )
                 })}
               
               </select>
               {/* <select 
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
               
               </select> */}

             </div></Col>
            </Row>
            <p>Please make sure you have added the author in  authors page <span><Link to='/admin/authors'>Add now</Link> </span></p>
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
            
           <p>Please make sure you have added the category in  category page <span><Link to='/admin/categories'>Add now</Link> </span></p>
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
              <label>Stock</label>
              <input
              type='number'
               placeholder='Stock'
               value={stock}
               onChange={((e)=>setStock (e.target.value))}
               />
                            </div></Col>
            </Row>
            <div className='ad__book__desc'>
              <textarea
              onChange={((e)=>setDescription(e.target.value))}
              placeholder='Description'
              rows='5' />
            </div>
             
            
             
             
           
             
             <button 
            
            onClick={handleUpload}
            // onClick={()=>console.log('cat',category)}
             >{uploading ? "Uploading" : "Upload"}</button>

          </div></div> : ''}

          
      </>
   
  )
}

export default PreBook
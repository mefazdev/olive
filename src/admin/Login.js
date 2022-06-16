import React, { useEffect, useState } from 'react'
import './login.css'
import logo from '../images/logo.png'
import { db } from "../firebase";
import { collection,doc,getDoc, orderBy, query, getDocs, updateDoc } from "@firebase/firestore";
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';
 
// import { async } from '@firebase/util';
function Login() {
const [admin,setAdmin] = useState( {})
const [username, setUsername] = useState('')
const [password,setPassword] = useState('')

// const [cookies, setCookie] = useCookies(['admin']);
const history = useHistory()
const cookies = new Cookies();
// const admin  = cookies.get('admin')



    const fetchAdmin = async () => {
        const docRef = doc(db, "admin","VCpm3OTuga0YidDTEIe4");
        const docSnap = await getDoc(docRef);
    
        setAdmin(docSnap);

      };
 useEffect(()=>{
    fetchAdmin()
 },[])    

 const login = async () =>{
    if( username == admin.data().username && password == admin.data().password){
 await addAdmin()
        cookies.set('admin', true ,{ path: '/' });
         
        history.push('/admin/orders')

    }else{
        alert('Wrong username or password')
    }
 }
 const addAdmin = async () =>{
    const docRef = doc(db, 'admin','VCpm3OTuga0YidDTEIe4' );
    const updateRef=  await updateDoc (docRef,  {
        admin:true
       })
 }
  return (
    <div className='ad__login'>
        {/* <button onClick={()=>console.log(cookies.get('admin'))}  >Clickme </button> */}
        <div className='ad__log__div__main'>
            <img src={logo} />
            <div className='ad__log__div'>
       < input
       value={username}
       onChange = {((e)=>setUsername(e.target.value))}
       placeholder='USERNAME'/>
       <input
       type='password'
       value={password}
              onChange = {((e)=>setPassword(e.target.value))}
            
       
       placeholder='PASSWORD' />
       <button onClick={login}>LOGIN</button>
       {/* <h3>{admin.data().username ? admin.data().username : ''}</h3> */}
       </div></div>
        
    </div>
  )
}

export default Login
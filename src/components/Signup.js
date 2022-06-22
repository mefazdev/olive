import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useStateValue } from "../stateProvider";
import { auth, db } from "../firebase";
import { useHistory } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
function Signup() {
  const [{ signupModal }, dispatch] = useStateValue();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});
  const history = useHistory();
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const openLogin = () => {
    dispatch({
      type: "OPEN__LOGIN__MODAL",
      signinModal: true,
    });
    dispatch({
      type: "CLOSE__SIGNUP__MODAL",
      signupModal: false,
    });
  };
  const closeSignUp = () => {
    dispatch({
      type: "CLOSE__SIGNUP__MODAL",
      signupModal: false,
    });
  };
  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      // console.log("user >>>>>", user);
      history.push("/dashboard");
      addUser();
    } catch (error) {
      // console.log("error >>>>>", error);
    }
   
    closeSignUp();
    
 
  }; 
 const setOffer = async ()=>{
  if(user?.uid){
    await addDoc(collection(db,'offerCount'),{
      userId:user.uid,
      
    })
  }
  
  }
  const addUser = () => {
    dispatch({
      type: "SET_USER",
      user: user ? user.id : "",
    });
    // console.log(user);
  };
  useEffect(() => {
    addUser();
    setOffer()
  }, [user]);
  return (
    <div className="body">
      <div className="container2">
        <div className="left">
          <img
            className="signup-img"
            src={process.env.PUBLIC_URL + "/images/signup.png"}
            alt="edit-icon"
          />
        </div>
        <div className="right">
          <img
            className="logo-img2"
            src={process.env.PUBLIC_URL + "/images/signup03.png"}
            alt="edit-icon"
          />

          {/* <p>{user?.email}</p> */}
          <div className="form-container">
            {/* <input
              className="input"
              type="text"
              placeholder="  Name"
              name="name"
            />
            <br></br> */}
            <input
              className="input"
              type="email"
              placeholder="  Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br></br>
            <input
              className="input"
              type="password"
              placeholder="  Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="signup-btn" type="button" onClick={register}>
              SIGN UP
            </button>
          </div>

          <div className="link-container">
            <p className="have-account" type="button">
              Already have an account ?{" "}
              <span onClick={openLogin}>
                {" "}
                <a onClick={openLogin}>LOGIN NOW</a>
              </span>
            </p>
            <p className="or-with">Or Login With</p>
            <div className="social-container">
              <div className="icon-google">
                <a href="#">
                  <img
                    className="social-icon"
                    src={process.env.PUBLIC_URL + "/images/google.png"}
                    alt="edit-icon"
                  />
                </a>
              </div>
              <div className="icon-fb">
                <a href="#">
                  <img
                    className="social-icon"
                    src={process.env.PUBLIC_URL + "/images/fb.png"}
                    alt="edit-icon"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;

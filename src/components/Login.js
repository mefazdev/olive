import { Alert } from "bootstrap";
import { signInWithEmailAndPassword,onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { useStateValue } from "../stateProvider";

function Login() {
 
  const [{ signupModal }, dispatch] = useStateValue();
 const [email,setEmail] = useState('')
 const [password,setPassword] = useState('')
 const [user, setUser] = useState({})
 onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
  const openSignup = () => {
    dispatch({
      type: "OPEN__SIGNUP__MODAL",
      signupModal: true,
    });
    dispatch({
      type: "CLOSE__LOGIN__MODAL",
      loginModal: false,
    });
  };
  const closeLogin = () => {
    
    dispatch({
      type: "CLOSE__LOGIN__MODAL",
      loginModal: false,
    });
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      // console.log("user >>>>>", user);
      closeLogin();
    addUser()
    } catch (error) {
      // console.log("error >>>>>", error);
      Alert(error)
    }
    
  };
  const addUser = () => {
    dispatch({
      type: "SET_USER",
      user: user ? user.uid : '',
       
    });
    // console.log(user);
  };
  useEffect(() => {
    addUser();
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
            src={process.env.PUBLIC_URL + "/images/signup04.png"}
            alt="edit-icon"
          />
          <div className="text-containere">
            <p className="login__text">
              To review and adjust your security settings and get
              recommendations to help you keep your
            </p>
          </div>

          <div className="form-container2">
            <input
              className="log-input"
              type="email"
              placeholder="  Email ID"
              onChange={((e)=>setEmail(e.target.value))}
            />
            <br></br>   
            <input
              className="log-input"
              type="password"
              placeholder="  Password"
              onChange={((e)=>setPassword(e.target.value))}
            />
            <div className="btn-container">
              <p>
                <a href="#">Forgot Password?</a>
              </p>

              <Link to="/address">
                <button
                onClick={login}
                className="signin-btn" type="button">
                  LOGIN
                </button> 
              </Link>
            </div>
          </div>

          <div className="link-container2">
            <p className="have-account">
              Don't have an account ?{" "}
              <span onClick={openSignup}>
                {" "}
                <a type="button" onClick={openSignup}>
                  SIGNUP NOW
                </a>
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

export default Login;

import React, { useEffect, useState } from "react";
import axios from "axios";
import cookie from 'react-cookies'
import { Redirect, useHistory } from "react-router-dom";
import Home from './Home';
 function Login({check, setCheck,cook, setCook}) {

  let history= useHistory();
    const [loginD, setLoginD]=useState({email:"",
password:""}

   )
   const [dash,setDash]=useState(0)
    
      useEffect(() => {
        console.log("this is user", loginD);
        console.log(dash);
      });
     function submitForm(e) {
        e.preventDefault();
             axios
        .post("http://localhost:4000/login", loginD)
        .then(res => {
            setLoginD({
              ...loginD,
              
              email: '',
              password1: '',
            
            })
            console.log("ressss",res.data)
            cookie.save('Auth',res.data.token)
          console.log("logged");
          setDash(1);
          setCheck(!check)
        
        })
               .catch((err) => {
          alert(err.response.data)
            console.log(err);
        })
     
    } 

    function forgot(){
      history.push("/forgot")
    }
    return (
        <div>
            <form onSubmit={submitForm}>
      
        <label>Email</label>
        <br />
        <input
          type="text"
          name="email"
          id="email"
          required
          onChange={(e) => {
            setLoginD({ ...loginD, email: e.target.value });
          }}
        />
        <br />
        <label>Password</label>
        <br />
        <input
          type="text"
          name="password"
          id="password"
          required
          onChange={(e) => {
            setLoginD({ ...loginD, password: e.target.value });
          }}
        />
        <br />
        <span>Forgot Password?<a onClick={forgot} href="">Reset Here</a></span><br />
        <button type="submit" className="btn btn-secondary m-2">submit</button>
        </form>
        {dash==1?(<Home />):null}
        </div>
    )
}
export default Login;
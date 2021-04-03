import React, { useEffect, useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
export default function SignUp() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [count, setCount]=useState(0)
  useEffect(() => {
    console.log("this is user", data);
    console.log(count,"countttttt");
  });
 function submitForm(e) {
    e.preventDefault();
         axios
    .post("http://localhost:4000/signup", data)
    .then(res => {
        setData({
          ...data,
          name: '',
          email: '',
          password1: '',
        
        })
      setCount(1);
    })
    .catch((err)=>{
      console.log(err);
      
    })
 
} 
  
  return (
    <div>
      <form onSubmit={submitForm} className="form">
        <label>Name</label>
        <br />
        <input
          type="text"
          name="name"
          id="name"
          required
          onChange={(e) => {
            setData({ ...data, name: e.target.value });
          }}
        />{" "}
        <br />
        <label>Email</label>
        <br />
        <input
          type="text"
          name="email"
          id="email"
          required
          onChange={(e) => {
            setData({ ...data, email: e.target.value });
          }}
        />{" "}
        <br />
        <label>Password</label>
        <br />
        <input
          type="text"
          name="password"
          id="password"
          required
          onChange={(e) => {
            setData({ ...data, password: e.target.value });
          }}
        />{" "}
        <br />
        <button type="submit" className="btn btn-secondary m-2">submit</button>
      </form>
      {count==1 ?(<Redirect to="/login" />): null}
    </div>
  );
}

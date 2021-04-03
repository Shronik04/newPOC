import React, { useEffect, useState } from "react";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";

export default function Home( ) {
  const [tokenn, setTokenn] = useState("");
  const [role, setRole] = useState("");

  
  var invalid;
  // useEffect(() => {
  //  cook&& setCook(document.cookie)
  //   if (document.cookie)
  //   {
  //     check && setCheck(!check)
  //   } 
  // }, [check, cook])
  
  useEffect(() => {
    const token = cookie.load("Auth");

    setTokenn(token,  console.log(tokenn));
  
   tokenn && axios
      .get(
        `http://localhost:4000/data/show`,
         {
          headers: {
            "Auth": tokenn,
          },
        }
      )
      .then((res) => {
        console.log("dataaaaaaa", res.data);
        setRole(res.data);
       
        console.log("hello", role);
      })
      .catch((err) => {
        console.log("errorrrrrr", err);
        invalid=err;
      });
  }, [tokenn]);


  return (
    <div>
      {role == "1" ? (
        <Redirect to="/admin" />
      ) : role == "0" ? (
        <Redirect to="user" />
      ) :  role &&(
        <Redirect to="/login" />
      )}
    </div>
  );
}

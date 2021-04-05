import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Reset() {

const [email,setEmail]=useState()

const resetMailer =(e)=>{
    e.preventDefault();
    axios .post(`http://localhost:4000/reset`, {email: email})
    .then((res)=>{
        if(res.status==200){
            alert("Check mail")
        }
    })
    .catch(err=>{
        console.log(err)
        alert(err);
    })
}
    return (
        <div>
            <form >
                <label>RESET PASSWORD</label><br />
                <input type="email" placeholder="Enter Email" onChange={(e)=>{setEmail(e.target.value)}} /> <br />
                <button onClick={(e)=>resetMailer(e)}>Send</button>
                
            </form>
        </div>
    )
}

export default Reset




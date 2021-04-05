import React,{useState} from 'react'
import { useHistory, useParams } from 'react-router';
import axios from 'axios'


export default function ResetPage() {
    
    const  ntok  = useParams();
    const [npass,setNpass]=useState();
    let history =useHistory();

 const tokk= ntok.tok
    const newpassword =()=>{
       
        console.log("TOKENNN",ntok.tok);
      
       tokk && axios.put(`http://localhost:4000/shronik` , {tokk,npass})
        .then((res)=>{
            console.log(res)
            history.push('/')
        })
        .catch(err=>{console.log(err)})
    }

    return (
        <div>
            <input type="text" onChange={(e)=>{setNpass(e.target.value)}} placeholder="Enter New Password" /><br />
            <button onClick={()=>newpassword()}>Done</button>
        </div>
    )
}

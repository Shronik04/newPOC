import React, { useState, useEffect } from 'react'
import axios from 'axios'
import cookie from 'react-cookies'
import Login from './Login';

export default function UserP() {
    const [webT, setWebT] = useState('');
    const [userDat, setUserDat] = useState({});
    const [edit, setEdit] = useState(false);
    const [pass, setPass] = useState(false);
    const [verify, setVerify]= useState({
        old: "",
        passw: "",
        passw2:""
    })



    useEffect(() => {
        const token = cookie.load("Auth");
        setWebT(token)
        axios.get(`http://localhost:4000/userData`, webT && {
            headers: {
                "Auth": webT
            }
        }).then((res) => {
            console.log("userdataaa", res.data);
            setUserDat(res.data)
        }).catch((err) => {
            console.log("user get", err);
        })

    }, [webT])


    const editPass = (e) => {
        e.preventDefault();
       
        const pId = userDat._id
        verify && axios.put(`http://localhost:4000/pass/${pId}`, verify)
            .then((res) => {
                console.log(res.data);
                alert('password updated');
                setPass(false)
            }).catch((err) => {
            alert("Enter correct passwords", err);
        })
}

    const handleEdit = (e) => {
        e.preventDefault();
        
        const curr = userDat._id
        userDat && axios.put(`http://localhost:4000/edit/${curr}`, userDat)
            .then((res) => {
                console.log(res);
                alert("updated")
setEdit(false);
            }).catch((err) => {
                console.log("post err", err.response);
                alert(err.response.data)
                
            })
        console.log("this is update", userDat);
    }

    return (
        <div>
            {userDat.status == "disabled" ? <Login /> :
                <div><h3>Welcome {userDat.name}</h3>

                    <h5>Name: <span>{userDat.name}</span></h5>
                    <h5>Email: <span>{userDat.email}</span></h5>
                    <h5>ID: <span>{userDat._id}</span></h5>
                    <h5>Role: <span>{userDat.role == 0 ? "User" : null}</span></h5>

                    {edit ? <form onSubmit={(e) => handleEdit(e)}>
                        <label>Name:</label> <input type='text' value={userDat.name} placeholder={userDat.name} required onChange={(e) => setUserDat({ ...userDat, name: e.target.value })} /> <br />
                        <label>Email:</label> <input type='email' value={userDat.email} placeholder={userDat.email} required onChange={(e) => setUserDat({ ...userDat, email: e.target.value })} /> <br />

                        <button className="btn btn-secondary m-2" type="submit" >Done</button>
                        <button className="btn btn-secondary m-2" onClick={()=>setEdit(false)} >Cancel</button>

                    </form> : null}
                    {pass ? <div className="mform"><form className="myform" onSubmit={(e) => editPass(e)}> <label>Current Password:</label><br /><input type="text" placeholder="current password" required onChange={(e) => { setVerify({ ...verify, old: e.target.value }) }} /> <br />
                        <label>New Password:</label><br /><input type="text" placeholder="new password" required onChange={(e) => { setVerify({ ...verify, passw: e.target.value }) }} /> <br />
                        <label>Confirm Password:</label><br /><input type="text" placeholder="confirm password" required onChange={(e)=>{setVerify({...verify, passw2: e.target.value})}} /> <br />
                    
                        <button className="btn btn-success m-2" type="submit">Done</button>
                        <button className="btn btn-success m-2" onClick={()=>{setPass(false)}}>Cancel</button>

                        </form></div> : null}

                    {pass ||edit?null: <><button className="btn btn-warning m-1" onClick={() => setEdit(true)}>Edit</button>
                    <button className="btn btn-warning m-1" onClick={() => setPass(true)}>Change Password</button> </>}

                </div>}


        </div>
    )
}

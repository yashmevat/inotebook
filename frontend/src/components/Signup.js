import React from 'react'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
const host = "http://localhost:5000";

const Signup = (props) => {
    let navigate=useNavigate();
    const [credentials, setcredentials] = useState({ name:"" ,email: "", password: "" })
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: credentials.name,email: credentials.email, password: credentials.password }), // body data type must match "Content-Type" header
        });
        const json = await response.json();
        if(json.success)
        {
          console.log(json)
          localStorage.setItem("token",json.authtoken)
          props.showAlert("Signed Up Successfully Please Login In To Continue","success")
          navigate("/login")
        }
    }
    const onChange = (e) => {
        //jo bhi change ho raha hbai uska name uske value ke equal ho jaaye
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className='container'>
            <h1 className='my-3'>SignUp Here Here</h1>
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Enter Name</label>
                    <input type="text" className="form-control my-3" id="name" name="name" aria-describedby="emailHelp" placeholder="Enter Name" onChange={onChange} value={credentials.name} minLength={5} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control my-3" id="email" name="email" aria-describedby="emailHelp" placeholder="Enter Email" onChange={onChange} value={credentials.email} required/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control my-3" name="password" id="password" placeholder="Password" onChange={onChange} value={credentials.password} minLength={5} required/>
                </div>
                <button type="submit" className="btn btn-primary my-3">Submit</button>
            </form>

        </div>
    )
}

export default Signup

import React from 'react'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
const host = "https://inotebook-zz0w.onrender.com";

const Login = (props) => {
    let navigate=useNavigate();
    const [credentials, setcredentials] = useState({ email: "", password: "" })
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }), // body data type must match "Content-Type" header
        });
        const json = await response.json();
        if(json.success)
        {
          localStorage.setItem("token",json.authtoken)
          navigate("/")
          props.showAlert("Logged in Successfully","success")
        }
        else{
          props.showAlert("Invalid Credentials","danger")
        }
    }
    const onChange = (e) => {
        //jo bhi change ho raha hbai uska name uske value ke equal ho jaaye
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <h1 className='my-3'>Login Here</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control my-3" id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange} value={credentials.email} />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control my-3" name="password" id="password" placeholder="Password" onChange={onChange} value={credentials.password} />
                </div>
                <button type="submit" className="btn btn-primary my-3">Submit</button>
            </form>

        </div>
    )
}

export default Login

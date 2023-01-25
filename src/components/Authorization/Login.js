import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

export default function Login() {

    let history = useNavigate();
    const [loginData, setloginData] = useState({ email: "", password: "" })

    const handleSubmit = async (e) => {

        e.preventDefault();
        try {
            const response = await fetch('https://pmhealthcare.vercel.app/api/auth/authuser', {
                method: 'POST',
                body: JSON.stringify({ email: loginData.email, password: loginData.password }),
                headers: { 'Content-Type': 'application/json', }
            });
            const data = await response.json();
            if (data.success) {
                localStorage.setItem('authtoken', data.authtoken);
                // redirect to protected page 
                history('/Hhome')
                console.log("Hello")

            } else {
                // display error message
            }
        } catch (err) {
            console.error(err);
        }
    }
    const onChange = (e) => {
        setloginData({ ...loginData, [e.target.name]: e.target.value })
    }

    return (
        <div className="container Main ">
            <div className="row mainIN">
                <div className="col">

                    <div className="text-center">
                        <img className="main-img" src="/Design/favicon.webp" alt="" />

                        <h1 id="MainH">HealthCare Monitor</h1>
                    </div>
                </div>
                <div className="col mt-4">
                    <div className="container formC">

                        <form action="" onSubmit={handleSubmit} method="POST">
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                <input required name="email" type="email" value={loginData.email} onChange={onChange} className="form-control" id="exampleInputEmail1"
                                    aria-describedby="emailHelp" />
                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input type="password" required name="password" value={loginData.password} onChange={onChange} className="form-control"
                                    id="exampleInputPassword1" />
                            </div>
                            <div className="text-center formBtn">
                                <button type="submit" className="btn btn-primary">Submit</button>
                                <Link type="button" className="mt-3" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                    Forgotten password?
                                </Link>
                                <hr />

                            </div>
                        </form>
                        <div className="text-center formBtn">
                            <Link to="/patientlogin" className=" btn btn-success">
                                Patient Login</Link>

                        </div>
                        <div className="text-center formBtn mt-3">
                            <Link to="/signup" className=" btn btn-success">Create
                                New Account</Link>

                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Modal --> */}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1"
                aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Forgot Password</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Please Enter Your Email Address to
                                        Search For Your Account</label>
                                    <input type="email" className="form-control" required id="exampleInputEmail1"
                                        aria-describedby="emailHelp" />

                                </div>
                                <div className="modal-footer">

                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div >
    )
}

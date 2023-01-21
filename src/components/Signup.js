import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
export default function Signup() {
    let history = useNavigate();

    const [loginData, setloginData] = useState({ contact: "", password: "", name: "", type: "" })



    const handleSubmit = async (e) => {

        e.preventDefault();
        let mobile = '';
        let email = '';
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const mobileRegex = /^(?:\+\d{1,3}|\d{1,4})[\s-]?\d{3}[\s-]?\d{4}$/;
        if (emailRegex.test(loginData.contact)) {
            console.log("valid email");
            mobile = "NAN";
            email = loginData.contact;
        } else if (mobileRegex.test(loginData.contact)) {
            console.log("valid mobile number");
            email = "NAN";
            mobile = loginData.contact;

        } else {
            console.log("invalid contact");
        }
        try {
            const response = await fetch('http://localhost:4000/api/auth/createuser', {
                method: 'POST',
                body: JSON.stringify({ email: email, password: loginData.password, name: loginData.name, mobile: mobile, type: loginData.type }),
                headers: { 'Content-Type': 'application/json', }
            });
            const data = await response.json();
            console.log(data)
            // if (data.success) {
            //     localStorage.setItem('authtoken', data.authtoken);
            //     // redirect to protected page 
            //     history('/Hhome')
            //     console.log("Hello")

            // } else {
            //     // display error message
            // }
        } catch (err) {
            console.error(err);
        }
    }
    const onChange = (e) => {
        setloginData({ ...loginData, [e.target.name]: e.target.value })
    }

    let Type = ["Patient", "Doctor", "Hospital", "Pharmacy"]
    return (
        <div className="container Main">
            <div className="row mainIN">
                <div className="col">

                    <div className="text-center">
                        <img className="main-img" src="Design/favicon.webp" alt="" />

                        <h1 id="MainH">HealthCare Monitor</h1>
                    </div>
                </div>
                <div className="col">
                    <div className="container formC">
                        <form className="row" method="POST" onSubmit={handleSubmit}>
                            <div className="col-md-12 mb-2">
                                {/* <label htmlFor="exampleInputPassword1" className="form-label">Mobile Number/Email address</label> */}
                                <input required onChange={onChange} placeholder="Mobile Number/Email address" type="text" name="contact" className="form-control " id="exampleInputPassword1" />
                            </div>
                            <div className=" col-md-12 my-2">
                                {/* <label htmlFor="exampleInputEmail1" className="form-label">Full Name</label> */}
                                <input placeholder=" Full Name" required onChange={onChange} type="text" name="name" className="form-control " id="exampleInputtext"
                                    aria-describedby="emailHelp" />

                            </div>

                            <div className="col-md-6 my-2">
                                {/* <label htmlFor="exampleInputPassword1" className="form-label">Password</label> */}
                                <input required placeholder='Password' onChange={onChange} type="password" name="password" className="form-control"
                                    id="exampleInputPassword1" />
                            </div>
                            <div className="col-md-6 my-2">
                                {/* <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label> */}
                                <input required placeholder='Confirm Password' onChange={onChange} type="text" name="cpassword" className="form-control"
                                    id="exampleInputPassword1" />
                            </div>
                            <div className=" ">
                                {/* <label className="form-label" htmlFor="type">Type</label> */}
                                <select placeholder='Type' required id="country" onChange={onChange} name="type" className="form-control mb-2">
                                    <option value="" defaultValue={Type} hidden >Type</option>
                                    <option value="Doctor">Doctor</option>
                                    <option value="Hospital">Hospital</option>

                                </select>
                            </div>
                            <div className="text-center formBtn">
                                <button type="submit" className="btn btn-primary   ">Create Account</button>
                                <hr />
                            </div>
                        </form>
                        <div className="text-center formBtn">
                            <Link to="/login" className=" btn btn-success"><button onChange={onChange} type=""
                                className=" btn btn-success">LogIn</button></Link>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

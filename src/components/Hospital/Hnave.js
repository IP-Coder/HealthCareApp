import React from 'react'
// import Hhome from './Hhome';
import {
    // BrowserRouter as Router,
    // Routes,
    // Route,
    Link
} from "react-router-dom";
const mystyle = {

    marginTop: "4rem",
    fontSize: "1.5rem",
};
export default function Hnave() {
    return (

        <>

            <div className="container text-center text-bg-primary " style={mystyle}>
                <div className="row">
                    <div className="col">
                        <Link className="text-bg-primary text-decoration-none" to="/Hospital/Home">Home

                        </Link>
                    </div>
                    <div className="col">
                        <Link className="text-bg-primary text-decoration-none" to="/Hospital/Member">New Member

                        </Link>
                    </div>
                    <div className="col">
                        <Link className="text-bg-primary text-decoration-none" to="/Hospital/Patient">Patient

                        </Link>
                    </div>


                </div>
            </div>


        </>

    )
}

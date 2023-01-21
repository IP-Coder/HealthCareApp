import React from 'react'
import { Link } from 'react-router-dom'

export default function Navebar() {
    return (
        <nav className="navbar navbar-dark fixed-top navbar-expand-lg bg-primary">
            <div className="container ">
                <div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <Link className="navbar-brand" to="/">HealthCare Monitor </Link>
                </div>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {/* <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li> */}

                    </ul>
                </div>
                <div className="c-white">
                    <h5 className="c-white" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"
                        aria-controls="offcanvasRight">Welcome</h5>
                </div>
            </div>
        </nav>
    )
}

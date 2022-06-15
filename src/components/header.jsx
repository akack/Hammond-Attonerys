import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from './state/authContext';

function Header(props) {
    const [user, setUser] = useContext(AuthContext);

    useEffect(() => {

    }, []);

    const logout = () => [
        setUser({
            name: '',
            surname: '',
            email: '',
            _id: '',
            isLoggedIn: false
        })
    ]


    return (<div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            {user.isLoggedIn === true ? (
                <div className="container-fluid container">
                    <a className="navbar-brand" href="#">Hammond Pole Attorneys</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                {/* <a className="nav-link active" aria-current="page" href="#">Home</a> */}
                            </li>
                        </ul>
                        <form className="d-flex">
                            {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"> */}
                            <button className="btn btn-outline-success" type="submit" onClick={logout}>Logout</button>
                        </form>
                    </div>
                </div>
            ) : (
                <div className="container-fluid container">
                    <a className="navbar-brand" href="#">Hammond Pole Attorneys</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {/* <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li> */}
                        </ul>
                        <form className="d-flex">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="#">FAQ's</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="#">Contact Us</a>
                                </li>
                            </ul>
                        </form>
                    </div>
                </div>
            )}
        </nav>
    </div>)

}

export default Header;

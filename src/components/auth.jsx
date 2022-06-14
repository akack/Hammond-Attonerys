import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {AuthContext} from './state/authContext';

function Auth() {
    const [user, setUser] = useContext(AuthContext);
    const navigate = useNavigate();

    const login = () => {
        setUser({name: 'Akha', surname: 'Magaqana', email: 'akham20@gmail.com', _id: '123', isLoggedIn: true})
        navigate("/dashboard");
    };
    return (
        <div className="Auth-form-container">
            <div className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign In</h3>
                    <div className="form-group mt-3">
                        <label>Email address</label>
                        <input
                            type="email"
                            className="form-control mt-1"
                            placeholder="Enter email"
                            value={'example@person.co.za'}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Enter password"
                            value={'123456789'}
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3" onClick={login}>
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                    {/* <p className="forgot-password text-right mt-2">
                        Forgot <a href="#">password?</a>
                    </p> */}
                </div>
            </div>
        </div>
    );

}

export default Auth;

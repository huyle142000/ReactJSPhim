import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import { OPEN_LOGIN, OPEN_REGISTER } from "../../redux/type/FormType";
import "./header.css";

export default function Header() {
    const { uLogin } = useSelector(state => state.FormReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        renderAccount();
    }, [uLogin])

    const openModalLogin = () => dispatch({ type: OPEN_LOGIN, modalLogin: <Login /> });
    const openModalRegister = () => dispatch({ type: OPEN_REGISTER, modalRegister: <Register /> });
    let renderAccount = () => {
        if (uLogin != null) {
            // đã đăng nhập
            return <span className="px-3" onClick={() => {
                openModalLogin()
            }}>{uLogin.hoTen}</span>
        } else {
            return <span className="px-3" onClick={() => {
                openModalLogin()
            }}>Login</span>
        }
    }

    return (
        <header className="nav__bg">
            <div className="container">
                <nav className="navbar navbar-expand-sm">
                    <NavLink className="navbar-brand" to="/home">
                        <img
                            className="img-fluid"
                            src="../../logo3.png"
                            alt=""
                        />
                    </NavLink>
                    <button
                        className="navbar-toggler d-lg-none"
                        type="button"
                        data-toggle="collapse"
                        data-target="#collapsibleNavId"
                        aria-controls="collapsibleNavId"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div
                        className="collapse navbar-collapse ml-5"
                        id="collapsibleNavId"
                    >
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li className="nav-item active">
                                <NavLink className="nav-link" to="/home">
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/movie">
                                    Movie
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/cinema">
                                    Cinema
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/blog">
                                    Blog
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/about">
                                    About
                                </NavLink>
                            </li>
                        </ul>
                        <div>
                            {renderAccount()}
                            {/* {uLogin ? <span className="px-3" onClick={() => {
                                openModalLogin()
                            }}>{uLogin.hoTen}</span> : <span className="px-3" onClick={() => {
                                openModalLogin()
                            }}>Login</span>} */}
                            <span className="px-3" onClick={() => {
                                openModalRegister()
                            }}>Register</span>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
}

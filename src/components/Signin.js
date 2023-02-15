import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import cookie from "cookiejs";
import "../styles/registerStyle.css";

import { UserContext } from "../App";

const Signin = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const form = {
      email: data.get("email"),
      password: data.get("password"),
    };

    await axios
      .post("http://localhost:4000/api/aya/users/login", form)
      .then((res) => {
        if (res.status === 200) {
          const token = res.data.token;

          cookie.set("token", token);
          dispatch({ type: "USER", payload: true });
          navigate("/");
          toast.success("Login Successfully");
        }
      })
      .catch((err) => {
        toast.error("invalid Credentials");
        console.log(err.message);
      });
  };

  return (
    <>
      <header className="header">
        <div id="menu-btn" className="fas fa-bars"></div>

        <NavLink className="logo" to="/">
          <span>Bike</span>Technology
        </NavLink>

        <nav className="navbar">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/exploreRentBikes">eVTOL Showcase</NavLink>
        </nav>

        <div id="login-btn">
          <button className="btn">
            <NavLink className="nav-link" to="/signin">
              login
            </NavLink>
          </button>
        </div>
      </header>

      <div className="maincontainer">
        <div className="firstcontainer">
          <div className="titled"></div>
          <div id="usersignin" style={{ display: "block" }} className="content">
            <h2>Signin As User</h2>
            <form onSubmit={handleSubmit}>
              <div className="user-details">
                <div className="input-box">
                  <span className="details">Email</span>
                  <input
                    type="text"
                    placeholder="Enter your email"
                    required
                    name="email"
                  />
                </div>

                <div className="input-box">
                  <span className="details">Password</span>
                  <input
                    type="password"
                    placeholder="Password Must be atleast six(6)"
                    required
                    name="password"
                  />
                </div>
              </div>

              <div className="button">
                <input type="submit" />
              </div>
            </form>

            <h3>
              don't have an account
              <NavLink style={{ color: "#ff6a00" }} to="/signup">
                create one
              </NavLink>
            </h3>
            <button className="btn">
              <NavLink style={{ color: "#ffffff" }} to="/adminsignin">
                Signin As Admin
              </NavLink>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;

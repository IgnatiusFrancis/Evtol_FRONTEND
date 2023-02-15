import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import cookie from "cookiejs";

import { AdminContext } from "../App";

const AdminSignin = () => {
  const navigate = useNavigate();
  const { adminstate, dispatchadmin } = useContext(AdminContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const form = {
      email: data.get("email"),
      adminPassword: data.get("adminPassword"),
    };

    await axios
      .post("http://localhost:4000/evtol/admin/signinAdmin", form)
      .then((res) => {
        if (res.status === 200) {
          const token = res.data.token;

          cookie.set("token", token);
          dispatchadmin({ type: "ADMIN", payload: true });
          navigate("/dashboard");
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

        <a href="#" className="logo">
          {" "}
          <span>evtol</span>Technology
        </a>

        <nav className="navbar">
          <NavLink className="nav-link" to="/">
            Home
          </NavLink>
          <a href="/#contact">Contact</a>
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

          <div id="adminsignin" className="content">
            <h2>Signin As Admin</h2>
            <form onSubmit={handleSubmit}>
              <div className="user-details">
                <div className="input-box">
                  <span className="details">Admin Email</span>
                  <input
                    name="email"
                    type="text"
                    placeholder="Enter your Email"
                  />
                </div>

                <div className="input-box">
                  <span className="details">Password</span>
                  <input
                    type="password"
                    name="adminPassword"
                    placeholder="Password Must be atleast six(6)"
                  />
                </div>
              </div>

              <div className="button">
                <input type="submit" />
              </div>
            </form>
            <h3>
              don't have an account
              <NavLink style={{ color: "#ff6a00" }} to="/signUpAdmin">
                create one
              </NavLink>
            </h3>
            <button className="btn">
              <NavLink className="nav-link" to="/signin">
                Signin As User
              </NavLink>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSignin;

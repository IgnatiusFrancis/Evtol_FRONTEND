import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

const AdminSignUp = () => {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const form = {
      adminName: data.get("adminName"),
      email: data.get("email"),
      adminPassword: data.get("adminPassword"),
      confirmPassword: data.get("confirmPassword"),
    };
    console.log(form);

    await axios
      .post("http://localhost:4000/evtol/admin/signUpAdmin", form)
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          navigate("/adminsignin");

          toast.success("Successfully registered");
        }
      })
      .catch((err) => {
        toast.error("invalid Credentials");
      });
  };

  return (
    <>
      <header className="header">
        <div id="menu-btn" className="fas fa-bars"></div>

        <NavLink className="logo" to="/">
          <span>evtol</span>Technology
        </NavLink>

        <nav className="navbar">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/exploreRentBikes">evtol Technology</NavLink>
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
          <div className="titled">Registration</div>
          <div className="content">
            <form onSubmit={handleSubmit}>
              <div className="user-details">
                <div className="input-box">
                  <span className="details">Admin Name</span>
                  <input
                    type="text"
                    name="adminName"
                    id="name"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="input-box">
                  <span className="details">Email</span>
                  <input
                    type="text"
                    required
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="input-box">
                  <span className="details">Admin Password</span>
                  <input
                    type="password"
                    required
                    name="adminPassword"
                    id="password"
                    // value={user.password}
                    // onChange={handleInputs}
                    placeholder="Password Must be atleast six(6)"
                  />
                </div>
                <div className="input-box">
                  <span className="details">Confirm Password</span>
                  <input
                    type="password"
                    required
                    name="confirmPassword"
                    id="cPassword"
                    placeholder="Password Must be atleast six(6)"
                  />
                </div>
              </div>
              <div className="button">
                <input type="submit" name="AdminSignUp" id="AdminSignUp" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSignUp;

import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const form = {
      username: data.get("username"),
      email: data.get("email"),
      password: data.get("password"),
      confirmPassword: data.get("confirmPassword"),
      model: data.get("model"),
      payment: data.get("payment"),
      shipping: data.get("shipping"),
    };

    await axios
      .post("https://evtol-task-api.onrender.com/api/aya/users/signup", form)
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          navigate("/signin");
          // window.alert("Successfully registered");
          toast.success("Successfully registered");
        }
      })
      .catch((err) => {
        // console.log(err.message);
        toast.error("invalid Credentials");
        // window.alert(err.message);
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
                  <span className="details">Full Name</span>
                  <input
                    type="text"
                    name="username"
                    id="name"
                    // value={user.username}
                    // onChange={handleInputs}
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
                    // value={user.email}
                    // onChange={handleInputs}
                    placeholder="Enter your email"
                  />
                </div>

                <div className="input-box">
                  <span className="details">Password</span>
                  <input
                    type="password"
                    required
                    name="password"
                    id="password"
                    // value={user.password}
                    // onChange={handleInputs}
                    placeholder="Enter your password"
                  />
                </div>
                <div className="input-box">
                  <span className="details">Confirm Password</span>
                  <input
                    type="password"
                    required
                    name="confirmPassword"
                    id="cPassword"
                    // value={user.confirmPassword}
                    // onChange={handleInputs}
                    placeholder="Confirm your password"
                  />
                </div>
                <div className="input-box">
                  <span className="details">Preferred Model</span>
                  <select
                    className="selectBtn"
                    name="model"
                    // onChange={handleInputs}
                    // value={user.model}
                    required
                  >
                    <option>Select Model</option>
                    <option>LightWeight</option>
                    <option>Middleweight</option>
                    <option>Cruiserweight</option>
                    <option>Heavyweight</option>
                  </select>
                </div>
                <div className="input-box">
                  <span className="details">Preferred Shipping</span>

                  <select
                    className="selectBtn"
                    name="shipping"
                    // onChange={handleInputs}
                    // value={user.shipping}
                    required
                  >
                    <option>Select Shipping</option>
                    <option>Ground</option>
                    <option>Air</option>
                  </select>
                </div>
                <div className="input-box">
                  <span className="details">Payment Option</span>

                  <select
                    className="selectBtn"
                    name="payment"
                    // onChange={handleInputs}
                    // value={user.payment}
                    required
                  >
                    <option>Select Payment</option>
                    <option>Credit Card</option>
                    <option>Wallet</option>
                    <option>PayStack</option>
                  </select>
                </div>
              </div>
              <div className="button">
                <input
                  type="submit"
                  name="signup"
                  id="signup"
                  // value="register"
                  // onClick={postData}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;

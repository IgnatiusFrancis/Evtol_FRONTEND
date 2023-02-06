import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import "../styles/register.css";

const Register = () => {
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const form = {
      username: data.get("username"),
      email: data.get("email"),
      password: data.get("password"),
      confirmPassword: data.get("confirmPassword"),
    };

    await axios
      .post("http://localhost:4000/api/aya/users/signup", form)
      .then((res) => {
        if (res.status === 201) {
          navigate("/login");
          toast.success("Success");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>userName </label>
          <input type="text" name="username" required />
        </div>
        <div className="input-container">
          <label>Email Address </label>
          <input type="text" name="email" required />
        </div>

        <div className="input-container">
          <label>Password </label>
          <input type="password" name="password" required />
        </div>
        <div className="input-container">
          <label>Confirm Password </label>
          <input type="password" name="confirmPassword" required />
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
      <div>
        <p style={{ fontSize: "15px" }}>
          Already have an account?
          <Link to={"/login"}>
            <span style={{ color: "orangered" }}>Sign in </span>
          </Link>
        </p>
      </div>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Register</div>
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
      </div>
    </div>
  );
};

export default Register;

import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import cookie from "cookiejs";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

const Login = () => {
  const navigate = useNavigate();

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    //Prevent page reload
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
          navigate("/");
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
          <label>Email Address </label>
          <input type="text" name="email" required />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="password" required />
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
        <div>
          <p style={{ fontSize: "15px" }}>
            Dont have an account?{" "}
            <Link to={"/register"}>
              <span style={{ color: "orangered" }}>Register</span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
      </div>
    </div>
  );
};

export default Login;

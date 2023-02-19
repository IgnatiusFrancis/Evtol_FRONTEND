import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { BsFillEyeFill } from "react-icons/bs";
import { UserContext } from "../App";

const DisplayAddEvtol = () => {
  const { state, dispatch } = useContext(UserContext);

  const Loginbutton = () => {
    if (state) {
      return (
        <div>
          <button className="btn">
            <NavLink className="nav-link" to="/signout">
              logout
            </NavLink>
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <button className="btn">
            <NavLink className="nav-link" to="/signin">
              login
            </NavLink>
          </button>
        </div>
      );
    }
  };

  const [rentEvtolData, setrentEvtolData] = useState([]);

  const exploreRentBike = async () => {
    try {
      await axios
        .get("https://evtol-task-api.onrender.com/evtol/displayAllEvtol")
        .then((res) => {
          if (res.status === 200) {
            setrentEvtolData(res.data.addEvtol);
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    exploreRentBike();
  }, []);

  const alertDiv = document.getElementById("alertDiv");
  const handleClick = () => {
    if (alertDiv.style.display === "none") {
      alertDiv.style.display = "flex";
      window.alert("Please signin to rent the bike!");
    } else {
      alertDiv.style.display = "flex";
    }
  };

  const hideAlert = () => {
    if (alertDiv.style.display === "flex") {
      alertDiv.style.display = "none";
    } else {
      alertDiv.style.display = "none";
    }
  };
  return (
    <>
      <header className="header">
        <div id="menu-btn" className="fas fa-bars"></div>
        <NavLink className="logo" to="/">
          <span>Evtol</span>Technology
        </NavLink>

        <nav className="navbar">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/rentevtol">Rent Evtol</NavLink>
        </nav>
        <div id="login-btn">
          <Loginbutton />
        </div>
      </header>

      <div id="alertDiv">
        <p>Have you liked it?</p>
        <button className="btn" onClick={hideAlert}>
          <NavLink to="/rentevtol" className="nav-link">
            Rent Now
          </NavLink>
        </button>
      </div>

      <div className="exploreBikesDiv">
        {rentEvtolData.map((rentEvtolData, index) => (
          <div
            className="exploreBikesImg"
            key={rentEvtolData._id}
            style={{ position: "relative" }}
          >
            <span className="eye" onClick={handleClick}>
              <BsFillEyeFill className="icon" />
            </span>
            <img
              src={`https://evtol-task-api.onrender.com/${rentEvtolData.filePath}`}
              alt="Something is wrong"
              style={{ width: "80%", height: "70%" }}
            />
            <h4>
              <b>{rentEvtolData.brand}</b>
            </h4>
            <p>{rentEvtolData.model}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default DisplayAddEvtol;

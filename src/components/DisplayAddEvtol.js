import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
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
    // try {
    //   const res = await fetch("http://localhost:4000/evtol/displayAllEvtol", {
    //     method: "GET",
    //   });

    //   const data = await res.json();

    //   // console.log(data);
    //   setrentEvtolData(data);
    //   console.log({ rentEvtolData });

    //   if (!res.status === 200) {
    //     const error = new Error(res.error);
    //     throw error;
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
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
          <span>Bike</span>Book
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
          <div className="exploreBikesImg" key={rentEvtolData._id}>
            <img
              src={`https://evtol-task-api.onrender.com/${rentEvtolData.filePath}`}
              alt="Something is wrong"
              style={{ width: "80%", height: "70%" }}
              onClick={handleClick}
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

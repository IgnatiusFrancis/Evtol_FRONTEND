import React, { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { UserContext } from "../App";

import cookie from "cookiejs";

const RentEvtol = () => {
  const { state, dispatch } = useContext(UserContext);
  console.log(`user: ${state}`);

  //   const history = useHistory();
  const navigate = useNavigate();

  const [rentEvtolData, setRentEvtolData] = useState([]);

  const allRentBikes = async () => {
    try {
      if (!state) {
        toast.error("Please signin to see all available Evtol for rent!");
        navigate("/signin");
      }

      const token = cookie.get("token");
      const res = await fetch("http://localhost:4000/evtol/getRentEvtolData", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      setRentEvtolData(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    allRentBikes();
  }, []);

  const specsDiv = document.getElementsByClassName("specsDivRentbike");
  const bikeDiv = document.getElementsByClassName("bikedivRentbike");
  const formDiv = document.getElementsByClassName("formDivRentbike");

  const showDetails = (e) => {
    let currentBike = e.target.id;
    if (
      specsDiv[currentBike].style.display === "none" &&
      bikeDiv[currentBike].style.display === "block"
    ) {
      bikeDiv[currentBike].style.display = "none";
      specsDiv[currentBike].style.display = "block";
    } else {
      bikeDiv[currentBike].style.display = "block";
      specsDiv[currentBike].style.display = "none";
    }
  };

  const showBike = (e) => {
    let currentBike = e.target.id;
    if (
      specsDiv[currentBike].style.display === "block" &&
      bikeDiv[currentBike].style.display === "none"
    ) {
      specsDiv[currentBike].style.display = "none";
      bikeDiv[currentBike].style.display = "block";
    } else {
      specsDiv[currentBike].style.display = "block";
      bikeDiv[currentBike].style.display = "none";
    }
  };

  const [rentHours, setRentHours] = useState("");
  const handleInputs = (e) => {
    let value = e.target.value;
    setRentHours(value);
  };

  const addToCart = (e) => {
    let currentBike = e.target.id;
    if (
      formDiv[currentBike].style.display === "none" &&
      specsDiv[currentBike].style.display === "none" &&
      bikeDiv[currentBike].style.display === "block"
    ) {
      bikeDiv[currentBike].style.display = "none";
      specsDiv[currentBike].style.display = "none";
      formDiv[currentBike].style.display = "block";
    } else {
      formDiv[currentBike].style.display = "none";
      specsDiv[currentBike].style.display = "none";
      bikeDiv[currentBike].style.display = "block";
    }
  };

  const showBikeAgain = (e) => {
    let currentBike = e.target.id;
    if (
      formDiv[currentBike].style.display === "block" &&
      specsDiv[currentBike].style.display === "none" &&
      bikeDiv[currentBike].style.display === "none"
    ) {
      bikeDiv[currentBike].style.display = "block";
      specsDiv[currentBike].style.display = "none";
      formDiv[currentBike].style.display = "none";
    } else {
      formDiv[currentBike].style.display = "block";
      specsDiv[currentBike].style.display = "none";
      bikeDiv[currentBike].style.display = "none";
    }
  };

  const proceedToCart = async (e) => {
    e.preventDefault();
    let itemId = e.target.id;

    const res = await fetch("/addrentcartocart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        itemId,
        rentHours,
      }),
    });

    const data = await res.json();

    if (res.status === 500 || !data) {
      window.alert("Something went wrong");
    } else {
      window.alert(
        "Item added. Please click on Go To cart to complete the purchase"
      );
    }
  };

  function logout() {
    cookie.remove("token");
    localStorage.removeItem("User");
    window.location.reload();
    toast.success("successfully SignOut");
    navigate("/signin");
  }

  const Loginbutton = () => {
    if (state) {
      return (
        <div>
          <button onClick={logout}>
            <NavLink className="btn" to="/signin">
              logout
            </NavLink>
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <button>
            <NavLink className="btn" to="/signin">
              login
            </NavLink>
          </button>
        </div>
      );
    }
  };

  const [searchText, setSearchText] = useState("");

  const searchTextBtn = async () => {
    const res = await fetch("/searchRentEvtol", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        searchText,
      }),
    });

    getSearchData();
  };

  const getSearchData = async () => {
    try {
      const res = await fetch("/rentbikesearchCategory", {
        method: "GET",
      });

      const data = await res.json();

      setRentEvtolData(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <header className="header">
        <div id="menu-btn" className="fas fa-bars"></div>
        <NavLink className="logo" to="/">
          {" "}
          <span>Evtol</span>Book
        </NavLink>
        <nav className="navbar">
          <NavLink className="nav-link" to="/">
            Home
          </NavLink>

          <NavLink className="nav-link" to="/rentbikecart">
            Load Evtol
          </NavLink>

          <input
            type="text"
            name="name"
            placeholder="Search Evtol"
            style={{ width: "30%", height: "8%" }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="btn"
          />
          <button type="submit" onClick={searchTextBtn} className="btn">
            <i className="fa fa-search"></i>
          </button>
        </nav>
        <div id="login-btn">
          <Loginbutton />
        </div>
      </header>

      <div className="rentbikebiked">
        {rentEvtolData.rentData?.map((rentEvtolData, index) => [
          <div className="bikedivRentbike" key={rentEvtolData._id}>
            <img
              src={`http://localhost:4000/${rentEvtolData.filePath}`}
              alt=""
              style={{ width: "80%", height: "70%" }}
            />
            <h4>{rentEvtolData.brand}</h4>
            <p>{rentEvtolData.model}</p>

            <div style={{ display: "flex", gap: "15px" }}>
              <button className="bikedbtn" id={index} onClick={showDetails}>
                Details
              </button>
              <br />
              <button className="bikedbtn" id={index} onClick={addToCart}>
                Load Evtol
              </button>
              <br />
            </div>
          </div>,

          <div className="specsDivRentbike" key={new Date()}>
            <p>Brand : {rentEvtolData.brand}</p>
            <p>Model : {rentEvtolData.model}</p>
            <p>Year : {rentEvtolData.year}</p>
            <p>Color : {rentEvtolData.color}</p>
            {/* <p>State : {rentEvtolData.state}</p> */}
            <p>Battery Percentage : {rentEvtolData.rent}</p>
            <p style={{ color: "red" }}>State : {rentEvtolData.state}</p>

            <div style={{ display: "flex", gap: "15px" }}>
              <button className="bikedbtn" id={index} onClick={showBike}>
                show bike
              </button>
            </div>
          </div>,

          <div className="formDivRentbike" key={index}>
            <form method="POST">
              <h3>LOAD MEDICATION</h3>
              <br />
              <label htmlFor="lname">Name: </label>
              <input
                type="text"
                className="bikedbtn"
                name="name"
                placeholder="Enter Medication Name"
              />
              <br />
              <label htmlFor="lname">Weight: </label>
              <input
                type="submit"
                className="bikedbtn"
                name="weight"
                id={rentEvtolData._id}
                // onClick={proceedToCart}
              />
              <br />
              <label htmlFor="lname">Code: </label>
              <input
                type="text"
                className="bikedbtn"
                name="code"
                placeholder="Enter Code hours"
              />
              <br />
              <label htmlFor="lname">Image: </label>
              <input
                type="file"
                className="bikedbtn"
                name="image"
                placeholder="Image Upload"
              />
            </form>
            <button className="bikedbtn" id={index} onClick={showBikeAgain}>
              show bike
            </button>
          </div>,
        ])}
      </div>
    </>
  );
};

export default RentEvtol;

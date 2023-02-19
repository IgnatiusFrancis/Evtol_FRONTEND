import React, { useState, useContext } from "react";
import { toast } from "react-hot-toast";
import { NavLink } from "react-router-dom";

import { AdminContext } from "../../App";

const AddEvtol = () => {
  const { adminState, dispatchadmin } = useContext(AdminContext);

  const [rentFile, setRentFile] = useState();
  const [rentEvtol, setRentEvtol] = useState({
    brand: "",
    model: "",
    year: "",
    color: "",
    weightLimit: "",
    batteryLevel: "",
  });

  let rentName, rentValue;

  const handleRentInputs = (e) => {
    rentName = e.target.name;
    rentValue = e.target.value;

    setRentEvtol({ ...rentEvtol, [rentName]: rentValue });
  };

  const handleRentFile = (e) => {
    const myrentfile = e.target.files[0];

    setRentFile({ ...rentEvtol, myrentfile });
  };

  const postRentData = async (e) => {
    e.preventDefault();
    let rentData = new FormData();
    rentData.append("brand", rentFile.brand);
    rentData.append("model", rentFile.model);
    rentData.append("year", rentFile.year);
    rentData.append("color", rentFile.color);
    rentData.append("weightLimit", rentFile.weightLimit);
    rentData.append("batteryLevel", rentFile.batteryLevel);
    rentData.append("myrentfile", rentFile.myrentfile);

    await fetch("http://localhost:4000/evtol/addrentevtols", {
      method: "POST",
      body: rentData,
    }).then(toast.success("Evtol Registered"));
  };

  const Loginbutton = () => {
    if (adminState) {
      return (
        <div>
          <button className="logoutbtnDash">
            <NavLink className="nav-link" to="/adminsignout">
              logout
            </NavLink>
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <button className="logoutbtnDash">
            <NavLink className="nav-link" to="/signin">
              login
            </NavLink>
          </button>
        </div>
      );
    }
  };

  return (
    <>
      <div className="sidebar">
        <div className="logo-details">
          <i className=""></i>
          <span className="logo_name1">Evtol</span>
          <span className="logo_name">Technology</span>
        </div>
        <ul className="nav-links">
          <li>
            <NavLink className="dashlinks" to="/dashboard">
              <i className="bx bx-grid-alt"></i>
              <span className="allLinks_name">Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink className="dashlinks" to="/addEvtol">
              <i class="fa-sharp fa-solid fa-square-plus"></i>
              <span className="allLinks_name">Add Evtol</span>
            </NavLink>
          </li>
          <li>
            <NavLink className="dashlinks" to="/getrentbikesforadmin">
              <i class="fa-sharp fa-solid fa-motorcycle"></i>
              <span className="allLinks_name">Available Rent Evtol</span>
            </NavLink>
          </li>
          {/* <li>
            <NavLink className="dashlinks" to="/rentbikesreports">
              <i class="fa-solid fa-sack-dollar"></i>
              <span className="allLinks_name">Rent Evtol Income</span>
            </NavLink>
          </li> */}
          <li>
            <NavLink className="dashlinks" to="/availableusers">
              <i class="fa-solid fa-users"></i>
              <span className="allLinks_name">Available Users</span>
            </NavLink>
          </li>
        </ul>

        <div className="logoutbtnDashDiv">
          <Loginbutton />
        </div>
      </div>

      <section className="home-section">
        <nav>
          <div className="sidebar-button">
            <span className="dashboard">Dashboard</span>
          </div>

          <div className="profile-details">
            <span className="admin_name">Admin</span>
          </div>
        </nav>

        <div className="home-content">
          <div className="sales-boxes">
            <div className="recent-sales box">
              <h1 className="heading">
                <span>Add Evtol For Rent</span>
              </h1>
              <form
                method="POST"
                className="addbikeform"
                name="rentform"
                id="myrentform"
                enctype="multipart/form-data"
              >
                <label htmlFor="fname">Brand: </label>

                <select
                  className="selectBtn"
                  name="brand"
                  value={rentEvtol.brand}
                  onChange={handleRentInputs}
                >
                  <option placeholder="select Brand">select Brand</option>

                  <option>Suzuki SkyDrive</option>
                  <option>Lilium Jet</option>
                  <option>Manta ANN</option>
                  <option>Supernal</option>
                </select>
                <br />
                <label htmlFor="lname">Model: </label>

                <select
                  className="selectBtn"
                  name="model"
                  value={rentEvtol.model}
                  onChange={handleRentInputs}
                >
                  <option>select Model</option>
                  <option>Lightweight</option>
                  <option>Middleweight</option>
                  <option>Cruiserweight</option>
                  <option>Heavyweight</option>
                </select>
                <br />
                <label htmlFor="fname">Year: </label>
                <input
                  className="selectBtn"
                  style={{ width: "-webkit-fill-available" }}
                  type="text"
                  name="year"
                  id="year"
                  value={rentEvtol.year}
                  onChange={handleRentInputs}
                  placeholder="Manufacturing Year"
                />
                <br />
                <label htmlFor="fname">Color: </label>
                <input
                  className="selectBtn"
                  style={{ width: "-webkit-fill-available" }}
                  type="text"
                  name="color"
                  id="color"
                  value={rentEvtol.color}
                  onChange={handleRentInputs}
                  placeholder="Enter Bike Color"
                />
                <br />

                <br />
                <label htmlFor="lname"> Weight: </label>
                <input
                  className="selectBtn"
                  style={{ width: "-webkit-fill-available" }}
                  type="text"
                  name="weightLimit"
                  id="price"
                  value={rentEvtol.weightLimit}
                  onChange={handleRentInputs}
                  placeholder="Enter Evtol Weight"
                />
                <br />
                <label htmlFor="lname"> batteryLevel: </label>
                <input
                  className="selectBtn"
                  style={{ width: "-webkit-fill-available" }}
                  type="text"
                  name="batteryLevel"
                  id="rent"
                  value={rentEvtol.batteryLevel}
                  onChange={handleRentInputs}
                  placeholder="Enter batteryLevel"
                />
                <br />
                <label htmlFor="fname">Image: </label>
                <input
                  type="file"
                  name="myrentfile"
                  id="image"
                  onChange={handleRentFile}
                />
                <div className="button">
                  <input type="submit" name="submit" onClick={postRentData} />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddEvtol;

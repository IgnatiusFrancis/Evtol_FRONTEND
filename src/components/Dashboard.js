import React, { useEffect, useContext } from "react";
import "../styles/dashboard.css";
import { NavLink, useHistory, useNavigate } from "react-router-dom";

import { AdminContext } from "../App";
import { toast } from "react-hot-toast";

const Dashboard = () => {
  const navigate = useNavigate();

  const { adminState, dispatchadmin } = useContext(AdminContext);
  console.log(`user: ${adminState}`);

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
            <NavLink to="/signin">login</NavLink>
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
          <span className="logo_name1">eVTOL</span>
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
              <span className="allLinks_name">Add eVTOL</span>
            </NavLink>
          </li>

          <li>
            <NavLink className="dashlinks" to="/getrentbikesforadmin">
              <i class="fa-sharp fa-solid fa-motorcycle"></i>
              <span className="allLinks_name">Available Rent eVTOL</span>
            </NavLink>
          </li>

          <li>
            <NavLink className="dashlinks" to="/rentbikesreports">
              <i class="fa-solid fa-sack-dollar"></i>
              <span className="allLinks_name">Rent eVTOL Income</span>
            </NavLink>
          </li>
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

        <div className="home-content" style={{ textAlign: "center" }}>
          <h1>WELCOME TO DASHBOARD</h1>
          <br />
          <h3>Go To Add Evtol Tab In Side Menu To Add Evtol In Database</h3>
          <br />
          <h3>
            Go To Rent Evtol Tab In Side Menu To Generate Income Reports of
            Rented Evtol In Database
          </h3>
          <br />
          <h3>
            Go To Available Users Tab In Side Menu To See All Available Users
            Regestered In Database
          </h3>
          <br />
        </div>
      </section>
    </>
  );
};

export default Dashboard;

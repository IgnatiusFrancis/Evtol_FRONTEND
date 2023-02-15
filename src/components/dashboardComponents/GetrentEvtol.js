import cookie from "cookiejs";
import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";

import { AdminContext } from "../../App";

const GetrentEvtol = () => {
  const { adminState, dispatchadmin } = useContext(AdminContext);

  const [getEvtol, setGetEvtol] = useState([]);

  const getallrenttbikes = async () => {
    try {
      const token = cookie.get("token");
      const res = await fetch(
        "http://localhost:4000/evtol/getAvailableRentEvtol",
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();
      setGetEvtol(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getallrenttbikes();
  }, []);

  let bikeIdFromDashBoard;
  const deleteUser = (e) => {
    bikeIdFromDashBoard = e.target.id;

    return fetch("http://localhost:4000/deleteRentBikeFromDashboard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bikeIdFromDashBoard,
      }),
    });
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
          <li>
            <NavLink className="dashlinks" to="/rentbikesreports">
              <i class="fa-solid fa-sack-dollar"></i>
              <span className="allLinks_name">Rent Evtol Income</span>
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

        <div className="salecartableDiv">
          <h1 className="heading">
            <span>Available Rent Evtol</span>
          </h1>

          <table className="salecartable">
            <thead>
              <tr>
                <th>BRAND </th>
                <th>MODEL </th>
                <th>state </th>
                <th>weightLimit </th>
                <th>batteryCapacity </th>
                <th>DELETE </th>
              </tr>
            </thead>

            {getEvtol.allRentEvtol?.map((getEvtol) => (
              <tbody key={getEvtol._id}>
                <tr>
                  <td>{getEvtol.brand}</td>
                  <td>{getEvtol.model}</td>
                  <td>{getEvtol.state}</td>
                  <td>{getEvtol.weightLimit}</td>
                  <td>{getEvtol.batteryCapacity}</td>
                  <td>
                    <button
                      id={getEvtol._id}
                      onClick={deleteUser}
                      className="btn"
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </section>
    </>
  );
};

export default GetrentEvtol;

import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-hot-toast";
import { NavLink } from "react-router-dom";

import { AdminContext } from "../../App";
const Availableusers = () => {
  const { adminState, dispatchadmin } = useContext(AdminContext);

  const [getUsers, setGetUsers] = useState([]);

  const getallusers = async () => {
    try {
      const res = await fetch(
        "https://evtol-task-api.onrender.com/api/aya/users/getallusers",
        {
          method: "GET",
        }
      );

      const data = await res.json();
      setGetUsers(data);
      // console.log(data.allUser);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getallusers();
  }, []);

  const deleteUser = async (_id) => {
    await axios
      .delete(
        `https://evtol-task-api.onrender.com/api/aya/users/deleteuser/${_id}`
      )
      .then((res) => {
        // fetchData();
        toast.success("Deleted Successfully");
      })
      .catch((err) => {
        console.log(err.message);
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
            <span>Available Users</span>
          </h1>

          <table className="salecartable">
            <thead>
              <tr>
                <th>NAME </th>
                <th>EMAIL </th>
                <th>MODEL </th>
                <th>SHIPPING </th>
                <th>PAYMENT </th>
              </tr>
            </thead>

            {getUsers.allUser?.map((getUsers) => (
              <tbody key={getUsers._id}>
                <tr>
                  <td>{getUsers.username}</td>
                  <td>{getUsers.email}</td>
                  <td>{getUsers.model}</td>
                  <td>{getUsers.shipping}</td>
                  <td>{getUsers.payment}</td>
                  <td>
                    <button
                      id={getUsers._id}
                      onClick={() => deleteUser(getUsers._id)}
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

export default Availableusers;

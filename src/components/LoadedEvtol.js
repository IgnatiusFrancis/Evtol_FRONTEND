import React, { useContext, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
// import "bootstrap/dist/css/bootstrap.min.css";
import { BsFillArchiveFill, BsFillPencilFill } from "react-icons/bs";
import axios from "axios";
import cookie from "cookiejs";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const LoadedEvtol = () => {
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    getLoadedEvtol();
  }, []);

  const [evtol, setEvtol] = useState([]);
  const [evtolMed, setEvtolMed] = useState([]);

  const editHandler = (event) => {
    console.log("Edited");
  };

  const deleteHandler = () => {
    console.log("Deleted");
  };

  const getLoadedEvtol = async () => {
    const token = cookie.get("token");
    await axios
      .get(
        "https://evtol-task-api.onrender.com/evtol/getRentEvtolData?loaded=true",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setEvtol(res.data.rentData);
          setEvtolMed(res.data.rentData.medications);
          console.log(
            res.data.rentData.map((medications) => medications.medications)
          );

          dispatch({ type: "USER", payload: true });
        } else if (res.status === 400) {
          console.log(res.message);
        } else {
          console.log(res);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <>
      <section className="">
        <div className="salecartableDiv">
          <h1 className="heading">
            <span>Loaded Evtol Medications</span>
          </h1>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>IMAGE </th>
                <th>BRAND </th>
                <th>MODEL </th>
                <th>MEDICATION </th>
                <th>DESTINATION </th>
                <th>WEIGHT </th>
                <th>CODE </th>
                <th>ACTIONS </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>
                  <span
                    style={{ marginRight: "15px" }}
                    onClick={() => editHandler}
                  >
                    <BsFillPencilFill />
                  </span>
                  <span onClick={() => deleteHandler}>
                    <BsFillArchiveFill />
                  </span>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </section>
    </>
  );
};

export default LoadedEvtol;

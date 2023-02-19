import { createContext, useReducer } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import AdminSignin from "./components/AdminSignin";
import AdminSignout from "./components/AdminSignout";
import AdminSignUp from "./components/AdminSignUp";
import Home from "./components/Home";
import DisplayAddEvtol from "./components/DisplayAddEvtol";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import AddEvtol from "./components/dashboardComponents/AddEvtol";
import Availableusers from "./components/dashboardComponents/Availableusers";
import Getrentbikes from "./components/dashboardComponents/GetrentEvtol";
import RentEvtol from "./components/RentEvtol";

import "./styles/GlobalStyles.css";
import "./styles/home.css";

import { initialState, reducer } from "../src/reducer/UseReducer";
import {
  adminInitialState,
  adminreducer,
} from "../src/reducer/UseReducerAdmin";
import { Toaster } from "react-hot-toast";
import LoadedEvtol from "./components/LoadedEvtol";

export const UserContext = createContext();
export const AdminContext = createContext();

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [adminState, dispatchadmin] = useReducer(
    adminreducer,
    adminInitialState
  );
  return (
    <Router>
      <Toaster
        position="top-right"
        toastOptions={{ style: { fontSize: "1.5rem", marginTop: "70px" } }}
      />
      <UserContext.Provider value={{ state, dispatch }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/displayallevtol" element={<DisplayAddEvtol />} />
          <Route path="/rentevtol" element={<RentEvtol />} />
          <Route path="/loadedevtol" element={<LoadedEvtol />} />
        </Routes>
      </UserContext.Provider>

      <AdminContext.Provider value={{ adminState, dispatchadmin }}>
        <Routes>
          <Route path="/adminsignin" element={<AdminSignin />} />
          <Route path="/adminsignout" element={<AdminSignout />} />
          <Route path="/signUpAdmin" element={<AdminSignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/addEvtol" element={<AddEvtol />} />
          <Route path="/availableusers" element={<Availableusers />} />
          <Route path="/getrentbikesforadmin" element={<Getrentbikes />} />
        </Routes>
      </AdminContext.Provider>
    </Router>
  );
};

export default App;

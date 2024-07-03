import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { logoutRoute } from "../utils/APIRoutes";
import "./Logout.css";

export default function Logout() {
  const navigate = useNavigate();

  const handleClick = async () => {
    let id;
    if (localStorage.getItem("secret-key") != null) {
      id = await JSON.parse(localStorage.getItem("secret-key"))._id;
    } else if (localStorage.getItem("secret-key-admin") != null) {
      id = await JSON.parse(localStorage.getItem("secret-key-admin"))._id;
    }

    const data = await axios.get(`${logoutRoute}/${id}`);

    if (data.status === 200) {
      localStorage.clear();
      navigate("/login");
    }
  };

  return <button className="styled-logout-button" onClick={handleClick}>Logout</button>;
}



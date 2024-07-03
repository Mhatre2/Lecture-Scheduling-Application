import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Welcome from "./Welcome";
import "./Admin.css"; 

export default function Admin() {
  const [user, setUser] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!localStorage.getItem("secret-key-admin")) {
          navigate("/login");
        } else {
          const storedUser = JSON.parse(localStorage.getItem("secret-key-admin"));
          setUser(storedUser);
        }
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };
    fetchData();
  }, [navigate]);
  return (
    <>
      <div className="admin-container-admin">
      <div className="admin-inner-container-admin">
        <Welcome user={user} />
      </div>
    </div>
    </>
  );
}


import React, { useState, useEffect } from "react";
import { allInstructors } from "../../utils/APIRoutes";
import axios from "axios";
import './Instructors.css';
import { Link } from "react-router-dom";

export default function Instructors({ user }) {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        if (user) {
          const response = await axios.get(`${allInstructors}/${user._id}`);
          setInstructors(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchInstructors();
  }, [user]);

  return (
    <div className="container-instructors">
      <h1 className="heading-instructors"> Our Instructors</h1>
      <div className="card-list-instructors">
        {instructors.map((instructor) => (
          <div key={instructor._id} className="card-instructors">
            <Link to={{pathname: `/individualinstructor/${instructor.username}`, state: { instructorUsername: instructor.username },}} className="card-link-instructors">
              <div className="card-content-instructors">
                <h3 className="instructor-name-instructors">{instructor.username}</h3>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

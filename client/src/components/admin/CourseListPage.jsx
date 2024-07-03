import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCourse } from "../../utils/APIRoutes";
import axios from "axios";
import "./CoursesAdmin.css";

const CourseListPage = ({user}) => {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(getCourse);
      setCourses(response.data.courses);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="container">
      <div className="card-list">
        {courses.map((course) => (
          <div className="card" key={course._id}>
            <Link
              className="card-link"
              to={{
                pathname: `/individualcourse/${course._id}`, 
              }}
            >
              <img src={course.image} alt={course.name} />
              <div className="card-content">
                <h2>{course.name}</h2>
                <p>Level: {course.level}</p>
                <p>{course.description}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseListPage;

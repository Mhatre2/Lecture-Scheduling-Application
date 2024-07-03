import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addCourse} from "../../utils/APIRoutes";
import axios from "axios";
import "./CoursesAdmin.css"; 

const CoursesAdmin = ({}) => {
  const [courseData, setCourseData] = useState({
    name: "",
    level: "",
    description: "",
    image: "",
  });

  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post(addCourse, { ...courseData });
      setCourseData({
        name: "",
        level: "",
        description: "",
        image: "",
      });
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  return (
    <div className="container-coursesAdmin">
      <form className="form-coursesAdmin" onSubmit={handleSubmit}>
        <h1>Add Course</h1>
        <input
          type="text"
          name="name"
          placeholder="Course Name"
          value={courseData.name}
          onChange={handleInput}
          required
        />
        <select
          name="level"
          value={courseData.level}
          onChange={handleInput}
          required
        >
          <option value="" disabled>
            Select Level
          </option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={courseData.description}
          onChange={handleInput}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={courseData.image}
          onChange={handleInput}
        />
        <button type="submit">Add Course</button>
      </form>
      <button className="view-courses-btn" onClick={() => navigate("/course-list")}>View Courses</button>      
    </div>
  );
};

export default CoursesAdmin;

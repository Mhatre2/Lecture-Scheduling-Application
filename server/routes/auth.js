const {register,login,allInstructors,logOut} = require("../controllers/userController");
const {addCourse,getCourse,getCourseName} = require("../controllers/courseController");
const {addSchedule,getSchedule,getUserSchedule,availablity} = require("../controllers/scheduleController");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.get("/allinstructors/:id", allInstructors);
router.get("/logout/:id", logOut);
router.post("/addschedule", addSchedule);
router.get("/getschedule",getSchedule);
router.get("/getuserschedule", getUserSchedule);
router.post("/checkInstructorAvailability", availablity);
router.post("/addcourse", addCourse);
router.get("/getcourse", getCourse);
router.get("/getcoursename/:courseId", getCourseName);

module.exports = router;

const Course = require("../models/courseModel");

module.exports.addCourse = async (req, res,) => {
    const { name, level, description, image } = req.body;
    try {
        const savedCourse = await Course.create({
            name,
            level,
            description,
            image,
        });

        res.status(201).json({ status: true, savedCourse });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports.getCourse = async (req, res,) => {
    try {
        const courses = await Course.find();
        return res.json({ status: true, courses });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports.getCourseName = async (req, res) => {
    const { courseId } = req.params;
    try {
        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        res.status(200).json({ courseName: course.name });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

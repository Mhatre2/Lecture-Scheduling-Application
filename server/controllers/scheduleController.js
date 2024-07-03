const CourseSchedule = require("../models/scheduleModel");

module.exports.addSchedule = async (req, res) => {
    try {
        const { course, lecture, date, instructor, location } = req.body;
        const newSchedule = new CourseSchedule({
            course,
            lecture,
            date: new Date(date),
            instructor,
            location,
        });
        const savedSchedule = await CourseSchedule.create(newSchedule);
        res.status(201).json(savedSchedule);
    } catch (error) {
        console.error(error);
        res.status(500).json({error});
    }
};

module.exports.getSchedule = async (req, res) => {
    const { courseName } = req.query;
    try {
        if (!courseName) {
            return res.status(400).json({error});
        }
        const schedules = await CourseSchedule.find({ course: courseName });
        res.status(200).json({ schedules });
    } catch (error) {
        console.error(error);
        res.status(500).json({error});
    }
};

module.exports.getUserSchedule = async (req, res, next) => {
    const { currUser } = req.query;
    try {
        if (!currUser) {
            return res.status(400).json({error});
        }
        const schedules = await CourseSchedule.find({ instructor: currUser });
        res.status(200).json({ schedules });
    } catch (error) {
        console.error(error);
        res.status(500).json({error});
    }
};

module.exports.availablity = async (req, res) => {
    const { username, date } = req.body;
    try {
        const query = { instructor: username, date: new Date(date) };
        const existingSchedule = await CourseSchedule.findOne(query);

        if (existingSchedule) {
            return res.status(409).json({ error: "Instructor is booked on this date." });
        }
        return res.status(200).json({message: "Instructor is free on this date." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
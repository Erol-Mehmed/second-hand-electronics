const Electronics = require('../models/Electronics');

exports.create = (itemData) => Electronics.create(itemData);

exports.getAll = () => Electronics.find().lean();

// exports.getLastThreeCourses = () => Courses.find().sort({ _id: -1 }).limit(3).lean();

// exports.getOne = (courseId) => Courses.findById(courseId);

// exports.delete = (courseId) => Courses.findByIdAndDelete(courseId);

// exports.updateOne = (courseId, coursesData) => Courses.findByIdAndUpdate(courseId, coursesData);

// exports.enroll = (courseId, userId, username) => Courses.findByIdAndUpdate(courseId, { $addToSet: { signUpList: { userId, username } } });

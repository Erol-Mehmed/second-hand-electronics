const Electronics = require('../models/Electronics');

exports.create = (electronicData) => Electronics.create(electronicData);

exports.getAll = () => Electronics.find().lean();

exports.getOne = (electronicId) => Electronics.findById(electronicId).lean();

exports.addToBuyingList = (electronicId, userId) => Electronics.findByIdAndUpdate(electronicId, { $addToSet: { buyingList: userId } });

exports.delete = (electronicId) => Electronics.findByIdAndDelete(electronicId);

exports.updateOne = (electronicId, electronicData) => Electronics.findByIdAndUpdate(electronicId, electronicData);

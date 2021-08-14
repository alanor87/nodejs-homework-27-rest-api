const { User } = require('../model/users');

const getOne = async (filter) => {
    console.log(User);
    return await User.findOne(filter);
}

const addOne = ({ email, password, subscription, verifyToken }) => {
    const newUser = new User({ email, password, subscription, verifyToken });
    newUser.setPassword(password);
    newUser.generateAvatar(email);
    return newUser.save();
}

const getById = (id) => {
    return User.findById(id);
}

const updateById = async (id, updateInfo) => {
    return await User.findByIdAndUpdate(id, updateInfo)
}

module.exports = { getOne, addOne, getById, updateById };
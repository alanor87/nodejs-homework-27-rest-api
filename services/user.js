const { User } = require('../model/users');

const getOne = async (filter) => {
    console.log(User);
    return await User.findOne(filter);
}

const addOne = ({ email, password }) => {
    const newUser = new User({ email, password });
    newUser.setPassword(password);
    return newUser.save();
}

const getById = (id) => {
    return User.findById(id);
}

const updateById = (id, updateInfo) => {
    return User.findByIdAndUpdate(id, updateInfo)
}

module.exports = { getOne, addOne, getById, updateById };
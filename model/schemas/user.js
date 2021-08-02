const { Schema } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = Schema({
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: {
        type: String,
        default: null,
    },
});

userSchema.methods.setPassword = function (password) {
    console.log(password);
    this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}


module.exports = { userSchema };
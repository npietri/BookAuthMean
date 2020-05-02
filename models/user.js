const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const config = require("../config/database")

const UserSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model("User", UserSchema);

//enable to call it by outside
module.exports.getUserById = function (id, callbacks) {
    User.findById(id, callbacks);
}
module.exports.getUserByUsername = function (username, callbacks) {
    const query = { username: username };
    User.findOne(query, callbacks);
}

module.exports.addUser = function (newUser, callbacks) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
                throw err;
            }
            newUser.password = hash;
            newUser.save(callbacks);
        });
    });
}

module.exports.comparePassword = function (candidatePassword, hash, callbacks) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) {
            throw err;
        }
        callbacks(null, isMatch);
    });
}

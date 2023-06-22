const mongoose = require("mongoose")
const {modal, Schema} = mongoose

const User = new Schema({
    name: {type: String,default: "Người dùng mới"},
    bio: {type: String},
    email: {type: String, required: true, unique: true},
    avatar: {type: String},
    password: {type: String, required: true},
    role: {type: String, enum: ["Creator","Brand","Agency","admin"], default: "Creator"},
    handle: {type: String, required: true, unique: true},
    links: [
        {
            url: {type: String},
            title: {type: String},
            icon: {type: String},
        }
    ],
    socialMedia: {
        facebook: {type: String},
        twitter: {type: String},
        instagram: {type: String},
        youtube: {type: String},
        linkedin: {type: String},
        github: {type: String}
    }
},{collection: "user-data-linktree"});

const userModal = mongoose.model("userData",User);

module.exports = userModal
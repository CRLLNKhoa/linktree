const User = require("../models/user")

const getUserData = async (req,res) => {
    const handle = req.params.handle
    try {
        const user = await User.findOne({handle: handle})
        const data = {
            name: user.name,
            links: user.links,
            avatar: user.avatar,
            bio: user.bio
        }
        return res.json({
            status: 200,
            data: data,
            message: "Lấy thông tin thành công!"
        })
    } catch (error) {
        return res.json({
            status: 400,
            message: "Lấy thông tin không thành công!"
        })
    }
}

const getSocial = async (req,res) => {
    const handle = req.params.handle
    try {
        const user = await User.findOne({handle: handle})
        const social = user.socialMedia
        return res.json({
            status: 200,
            data: social,
            message: "Lấy thông tin thành công!"
        })
    } catch (error) {
        return res.json({
            status: 400,
            message: "Lấy thông tin không thành công!"
        })
    }
}

module.exports = {getUserData,getSocial}
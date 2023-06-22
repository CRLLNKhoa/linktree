const User = require("../models/user")
const jwt_decode = require("jwt-decode")

const loaddSocials = async (req,res) => {
    const {tokenMail} = req.body
    try {
        const decoded = jwt_decode(tokenMail,process.env.KEY_TOKEN)
        const email = decoded.email
        const user = await User.findOne({email: email})
        const socials = user.socialMedia
        return res.json({
            status: 200,
            message: "Thành công!",
            data: socials
        })
    } catch (error) {
        return res.json({
            status: 400,
            message: "Không thành công!",
        })
    }
}

const loadLinks = async (req,res) => {
    const {tokenMail} = req.body
    try {
        const decoded = jwt_decode(tokenMail,process.env.KEY_TOKEN)
        const email = decoded.email
        const user = await User.findOne({email: email})
        const links = user.links
        return res.json({
            status: 200,
            message: "Thành công!",
            data: links
        })
    } catch (error) {
        return res.json({
            status: 400,
            message: "Không thành công!",
        })
    }
}

module.exports = {
    loaddSocials,loadLinks
}
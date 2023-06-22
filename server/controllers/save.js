const jwt_decode = require("jwt-decode")
const User = require("../models/user")

const saveSocials = async (req,res) =>{
    const {tokenMail, socials} = req.body
    try {
        const decoded = jwt_decode(tokenMail,process.env.KEY_TOKEN)
        const email = decoded.email
        const user = await User.findOne({email: email})
        user.socialMedia = socials
        user.save()
        return res.json({
            status: 200,
            message: "Cập nhật thành công!"
        })
    } catch (error) {
        return res.json({
            status: 400,
            message: error.message
        })
    }
}

const saveProfile = async (req,res) =>{
    const {tokenMail, profile} = req.body
    try {
        const decoded = jwt_decode(tokenMail,process.env.KEY_TOKEN)
        const email = decoded.email
        const user = await User.findOne({email: email})
        user.name = profile.name
        user.bio =  profile.bio
        user.avatar = profile.avatar
        user.save()
        return res.json({
            status: 200,
            message: "Cập nhật thành công!"
        })
    } catch (error) {
        return res.json({
            status: 400,
            message: error.message
        })
    }
}

const saveLinks = async (req,res) =>{
    const {tokenMail, links} = req.body
    try {
        const decoded = jwt_decode(tokenMail,process.env.KEY_TOKEN)
        const email = decoded.email
        const user = await User.findOne({email: email})
        const newLinks = links.map((link) => ({
            url: link.link.url,
            title: link.link.title,
            icon: link.link.icon
        }))
        user.links = newLinks
        await user.save()
        return res.json({
            status: 200,
            message: "Cập nhật thành công!"
        })
    } catch (error) {
        return res.json({
            status: 400,
            message: error.message
        })
    }
}

module.exports = {
    saveSocials,saveProfile,saveLinks
}
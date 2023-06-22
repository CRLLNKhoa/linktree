const User = require("../models/user")
const jwt_decode = require(("jwt-decode"))

const dashBoardData = async (req,res) => {
    const {tokenMail} = req.body
    try {
        const decodedTokenMail = jwt_decode(tokenMail, process.env.KEY_TOKEN)
        const email = decodedTokenMail.email
        const user = await User.findOne({email: email})
        const userData = {
            name: user.name,
            role: user.role,
            avatar: user.avatar,
            handle: user.handle,
            links: user.links.length,
            bio: user.bio,
            list:  user.links,
        }
        return res.json({
            status: 200,
            message: "Lấy thông tin thành công!",
            data: userData
        })
    } catch (error) {
        return res.json({
            status: 400,
            message: error.message,
        })
    }
}

module.exports = {dashBoardData}
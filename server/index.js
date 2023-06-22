const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose");
const { register, login } = require("./controllers/auth");
const dotenv = require("dotenv");
const { dashBoardData } = require("./controllers/dashboard");
const { getUserData, getSocial } = require("./controllers/getUserData");
const { saveSocials, saveProfile, saveLinks } = require("./controllers/save");
const { loaddSocials, loadLinks } = require("./controllers/load");

mongoose.set("strictQuery",false);

dotenv.config()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGDB_URL).then(()=>{
    console.log("Connected MongoDB!")
}).catch(err => console.error(err.message))

app.get("/", (req,res) => {
    res.send("Hello!")
})

app.post("/api/register",register)
app.post("/api/login",login)
app.post("/api/data/dashboard",dashBoardData)
app.get("/api/get/:handle",getUserData)
app.get("/api/get/social/:handle",getSocial)
app.post("/api/save/socials",saveSocials)
app.post("/api/load/socials",loaddSocials)
app.post("/api/save/profile",saveProfile)
app.post("/api/load/links",loadLinks)
app.post("/api/save/links",saveLinks)

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
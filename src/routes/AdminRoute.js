const { LoginPOST } = require("../controllers/AdminCont")

const router = require("express").Router()

router.post("/", LoginPOST)

module.exports = {
    path: "/admin",
    router,
}    
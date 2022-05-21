const { DoctorPOST, DoctorGET, DoctorsGET, DoctorPATCH, DoctorDELETE, NewsPOST, NewsGET, NewsDELETE, NewsPATCH, NewGET } = require("../controllers/AdminCont")
// const AdminMiddlewares = require("../middlewares/AdminMiddlewares")

const router = require("express").Router()

router.post("/doctors", DoctorPOST)
router.get("/doctors", DoctorGET)
router.get("/doctors/all", DoctorsGET)
router.patch("/doctors", DoctorPATCH)
router.delete("/doctors", DoctorDELETE)


router.post("/news", NewsPOST)
router.get("/news", NewGET)
router.get("/news/allnews", NewsGET)
router.delete("/news", NewsDELETE)
router.patch("/news", NewsPATCH)

module.exports = {
    path: "/",
    router,
}
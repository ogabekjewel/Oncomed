const { DoctorPOST, DoctorGET, DoctorsGET, DoctorPATCH, DoctorDELETE, NewsPOST, NewsGET, NewsDELETE, NewsPATCH, NewGET } = require("../controllers/AdminCont")
const AdminMiddlewares = require("../middlewares/AdminMiddlewares")

const router = require("express").Router()

router.post("/doctors", AdminMiddlewares, DoctorPOST)
router.get("/doctors", AdminMiddlewares, DoctorGET)
router.get("/doctors/all", AdminMiddlewares, DoctorsGET)
router.patch("/doctors", AdminMiddlewares, DoctorPATCH)
router.delete("/doctors", AdminMiddlewares, DoctorDELETE)


router.post("/news",AdminMiddlewares, NewsPOST)
router.get("/news",AdminMiddlewares, NewGET)
router.get("/news/allnews",AdminMiddlewares, NewsGET)
router.delete("/news",AdminMiddlewares, NewsDELETE)
router.patch("/news",AdminMiddlewares, NewsPATCH)

module.exports = {
    path: "/",
    router,
}
const admins = require("../model/AdminsModel")
const { v4 } = require("uuid")
const doctors = require("../model/DoctorsModel")
const path = require("path")
const news = require("../model/NewsModel")
const { compareHash } = require("../modules/bcrypt")
const { generateToken, checkToken } = require("../modules/jwt")

module.exports = class AdminController {
    static async LoginPOST(req, res) {
        try {
            const { email, password } = req.body

            let admin = await admins.findOne({
                email,
            })

            if(!admin) throw new Error("You do not have admin rights")

            if(password != admin.password) throw new Error("password incorrect")

            let token = await generateToken({
                email,
                role: "admin",
            })

            res.cookie("token", token).status(200).json({
                ok: true,
                token,
            })
        } catch(e) {
            console.log(e)
            res.status(400).json({
                ok: false,
                message: e + "",
            })
        }
    }

    static async DoctorPOST(req, res) {
        try {
            const { full_name, specialization, place_of_study, experience } = req.body
            
            let doctor = await doctors.create({
                id: v4(),
                full_name,
                specialization,
                place_of_study,
                experience,
            })

            if(req.files?.img) {
                let { img } = req.files
                
                let imageType = img.mimetype.split("/")[0]
                if(imageType === "image" || imageType === "vector") {
                    let imageName = img.md5
                    let imageFormat = img.mimetype.split("/")[1]
                    let imagePath = path.join(__dirname, "..", "public", `${imageName}.${imageFormat}`)

                    await img.mv(imagePath)

                    await doctors.findOneAndUpdate({
                        id: doctor.id,
                    }, {
                        img: `${imageName}.${imageFormat}`,
                    })
                }else {
                    throw new Error("Image type image or vector")
                }
            } 

            res.status(201).json({
                ok: true,
                message: "Doctor created"
            })
        } catch(e) {
            console.log(e)
            res.status(400).json({
                ok: false,
                message: e,   
            })   
        }    
    }

    static async DoctorsGET(req, res) {
        try {
            let doctorList = await doctors.find()

            res.status(200).json({
                ok: true,
                doctors: doctorList,
            })
        } catch(e) {
            console.log(e)
            res.status(400).json({
                ok: false,
                message: e + "",
            })
        }
    }

    static async DoctorGET(req, res) {
        try {
            const { id } = req.body

            let doctor = await doctors.findOne({
                id,
            })

            if(!doctor) throw new Error("Not found")

            res.status(200).json({
                ok: true,
                doctor,
            })
        } catch(e) {
            console.log(e)
            res.status(400).json({
                ok: false,
                message: e + "",
            })
        }
    }

    static async DoctorPATCH(req, res) {
        try {
            let { id, full_name, specialization, place_of_study, experience } = req.body

            const doctor = await doctors.findOne({
                id,
            })

            if(!doctor) throw new Error("Not found")

            full_name = full_name || doctor.full_name
            specialization = specialization || doctor.specialization
            place_of_study = place_of_study || doctor.place_of_study
            experience = experience || doctor.experience

            if(req.files?.img) {
                let { img } = req.files
                
                let imageType = img.mimetype.split("/")[0]
                if(imageType === "image" || imageType === "vector") {
                    let imageName = img.md5
                    let imageFormat = img.mimetype.split("/")[1]
                    let imagePath = path.join(__dirname, "..", "public", `${imageName}.${imageFormat}`)

                    await img.mv(imagePath)

                    await doctors.findOneAndUpdate({
                        id: doctor.id,
                    }, {
                        img: `${imageName}.${imageFormat}`,
                    })
                }else {
                    throw new Error("Image type image or vector")
                }
            } 

            await doctors.findOneAndUpdate({
                id,
            }, {
                full_name,
                specialization, 
                place_of_study, 
                experience 
            })
                
            res.status(200).json({
                ok: true,
                message: "Update succesfully"
            })
        } catch(e) {
            console.log(e)
            res.status(400).json({
                ok: false,
                message: e + "",
            })
        }
    }

    static async DoctorDELETE(req, res) {
        try {
            const { id } = req.body

            const doctor = await doctors.findOne({
                id,
            })

            if(!doctor) throw new Error("Not found")

            await doctors.deleteOne({
                id,
            })

            res.status(200).json({
                ok: true,
                message: "Delete succesfully"
            })
        } catch(e) {
            console.log(e)
            res.status(400).json({
                ok: false,
                message: e + "",
            })
        }
    }

    static async NewsPOST(req, res) {
        try {
            const { title, body, date } = req.body
            let newElement = await news.create({
                id: v4(),
                title,
                body,
                date,
            })    

            if(req.files?.img) {
                let { img } = req.files
                
                let imageType = img.mimetype.split("/")[0]
                if(imageType === "image" || imageType === "vector") {
                    let imageName = img.md5
                    let imageFormat = img.mimetype.split("/")[1]
                    let imagePath = path.join(__dirname, "..", "public", `${imageName}.${imageFormat}`)

                    await img.mv(imagePath)

                    await news.findOneAndUpdate({
                        id: newElement.id,
                    }, {
                        img: `${imageName}.${imageFormat}`,
                    })
                } else {
                    throw new Error("Image type image or vector")
                }
            }

            res.status(201).json({
                ok: true,
                message: "News created"
            })
        } catch(e) {
            console.log(e)
            res.status(400).json({
                ok: false,
                message: e + "",
            })
        }
    }

    static async NewGET(req, res) {
        try {
            const { id } = req.body

            let newElement = await news.findOne({
                id,
            })

            if(!newElement) throw new Error("not found")

            res.status(200).json({
                ok: true,
                news: newElement,
            })
        } catch(e) {
            console.log(e)
            res.status(400).json({
                ok: false,
                message: e + "",
            })
        }
    }

    static async NewsGET(req, res) {
        try {
            let newsList = await news.find()

            res.status(200).json({
                ok: true,
                news: newsList,
            })
        } catch(e) {
            console.log(e)
            res.status(400).json({
                ok: false,
                message: e + "",
            })
        }
    }

    static async NewsDELETE(req, res) {
        try {
            const { id } = req.body

            let newElement = await news.findOne({
                id,
            })

            if(!newElement) throw new Error("not found")

            await news.findOneAndDelete({
                id,
            })

            res.status(200).json({
                ok: true,
                message: "delete succesfully",
            })
        } catch(e) {
            console.log(e)
            res.status(400).json({
                ok: false,
                message: e + "",
            })
        }
    }

    static async NewsPATCH(req, res) {
        try {
            let { id, title, body, date } = req.body

            let newsElement = await news.findOne({
                id,
            })

            if(!newsElement) throw new Error("not found")

            title = title || newsElement.title
            body = body || newsElement.body
            date = date || newsElement.date

            await news.findOneAndUpdate({
                id,
            }, {
                title, 
                body, 
                date
            })

            if(req.files?.img) {
                let { img } = req.files
                
                let imageType = img.mimetype.split("/")[0]
                if(imageType === "image" || imageType === "vector") {
                    let imageName = img.md5
                    let imageFormat = img.mimetype.split("/")[1]
                    let imagePath = path.join(__dirname, "..", "public", `${imageName}.${imageFormat}`)

                    await img.mv(imagePath)

                    await news.findOneAndUpdate({
                        id: newsElement.id,
                    }, {
                        img: `${imageName}.${imageFormat}`,
                    })
                } else {
                    throw new Error("Image type image or vector")
                }
            }

            res.status(200).json({
                ok: true,
                message: "Update succesfully",
            })
        } catch(e) {
            console.log(e)
            res.status(400).json({
                ok: false,
                message: e + "",
            })
        }
    }
}
const Express = require("express")
const Path = require("path")
const Fs = require("fs")
const Morgan = require("morgan")
const CookieParser = require("cookie-parser")
const FileUpload = require("express-fileupload")

const { PORT } = require("../config")
const mongo = require("./modules/mongo")

const app = Express()
     
mongo()

app.use(CookieParser())
app.use(Morgan("tiny"))
app.use(FileUpload())
app.use(Express.json())
app.use(Express.urlencoded({ extended: true }))

Fs.readdir(Path.join(__dirname, "routes"), (err, files) => {
    if(!err) {
        files.forEach((file) => {
            let RoutePath = Path.join(__dirname, "routes", file)
            let Route = require(RoutePath) 
            if(Route.path && Route.router) app.use(Route.path, Route.router)
        })
    }  
})

app.listen(PORT, _ => console.log(`SERVER READY AT PORT ${PORT}`))
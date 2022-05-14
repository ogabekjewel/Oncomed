const { checkToken } = require("../modules/jwt")

module.exports = async function(req, res, next) {
    let { token } = req.cookies

    if(!token) {
        res.status(400).json({
            ok: false,
        })
        return
    } 

    token = await checkToken(token)
    
    if(token.role != "admin") {
        res.status(400).json({
            ok: false,
        })
        return
    }
    
    req.admin = token
    next()
}
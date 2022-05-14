const { sign, verify } = require("jsonwebtoken")
const { SECRET_WORD } = require("../../../rizqimuz/config")

module.exports.generateToken = async (data) =>  {
    return await sign(data, SECRET_WORD)
}

module.exports.checkToken = async (token) => {
    try {
        return await verify(token, SECRET_WORD)
    } catch(e) {
        return false
    }
}   
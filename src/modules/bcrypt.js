const bcrypt = require("bcrypt")

module.exports.generateHash = async (password) => {
    let salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt)
}

module.exports.compareHash = async (password, hash) => {
    try {
        return await bcrypt.compare(password, hash)
    } catch(e) {
        return false
    }
} 
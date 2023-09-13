const { createUser } = require("../dbConnection/repository/user-repo")

module.exports.signup = (req, res) => {
    try {
        let { username, email, password, accountType } = req.body
        if (username === undefined || email === undefined || password === undefined || accountType === undefined){
            return res.status(400)
        }
        
        createUser()

    } catch (error) {
        return res.status(500).json("Something went wrong with error code 500")
    }
}
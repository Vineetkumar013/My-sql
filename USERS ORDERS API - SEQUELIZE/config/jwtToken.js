const jwt = require("jsonwebtoken");

const genrateToken = (id) => { 
    return jwt.sign({ id }, "sequelizetoken", {expiresIn: "1h"})
}

module.exports = {genrateToken};
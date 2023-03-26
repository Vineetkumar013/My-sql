const jwt = require("jsonwebtoken");

const genrateRefreshToken = (id) => {
    return jwt.sign({ id }, "sequelizerefreshtoken", { expiresIn: "7d" });
}


module.exports = {genrateRefreshToken};
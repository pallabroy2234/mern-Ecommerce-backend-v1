const createError = require('http-errors');


class authControllers {
    admin_login = async (req, res, next) => {
        try {
            const {email, password} = req.body;
            
        } catch (e) {
            next(e)
        }
    }
}


module.exports = new authControllers();
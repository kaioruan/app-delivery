const LoginService = require('../services/LoginService');

const LoginController = {

  Login: async (req, res) => {
    const { body } = req;
    const result = await LoginService.Login(body);
    return res.status(200).json(result);
  },

  loginValidate: async (req, res) => {
    const { email } = req.user;
    await LoginService.loginValidate(email);
    return res.status(200).json(true);
  },

  validateAdmin: async (req, res) => {
    const { email } = req.user;
    const result = await LoginService.validateAdmin(email);
    return res.status(200).json(result);
  },

};

module.exports = LoginController;

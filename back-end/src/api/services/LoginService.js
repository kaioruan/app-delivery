const md5 = require('md5');
const { user } = require('../../database/models');
const joiLogin = require('../middleware/JoiValidade');
const token = require('../middleware/Token');

const NOT_FOUND = '404|Pessoa não cadastrada';
const LoginServices = {

  Login: async (body) => {
    const checkBody = joiLogin.validateLogin(body);
    const { email, password } = checkBody;

    const verifyEmail = await user.findOne({
      where: { email, password: md5(password) },
    });
    if (!verifyEmail) throw new Error(NOT_FOUND);
    const generateToken = token.generateToken(email);
    return { 
      id: verifyEmail.id,
      token: generateToken,
      role: verifyEmail.role,
      name: verifyEmail.name,
      email: verifyEmail.email,
    };
  },
  
  loginValidate: async (email) => {
    const verifyEmail = await user.findOne({
      where: { email },
    });
    if (!verifyEmail) throw new Error(NOT_FOUND);
    return { verifyEmail };
  },

  validateAdmin: async (email) => {
    const verifyAdmin = await user.findOne({
      where: { email },
    });
    if (!verifyAdmin) throw new Error(NOT_FOUND);
    if (verifyAdmin.role !== 'administrator') throw new Error('401|Acesso negado');
    return { verifyAdmin };
  },
};

module.exports = LoginServices;

const Register = require('../services/RegisterService');

const RegisterController = {

  Register: async (req, res) => {
    const { body } = req;
    const result = await Register.Register(body);
    if (result === null) { // se retornar nulo (se usuario ja existir)
      throw new Error('409|Usuario ja cadastrado');
    }
    const userName = result.name;
    const userEmail = result.email;
    const userPass = result.password;
    return res.status(201).json({ name: userName, email: userEmail, password: userPass });
  },
};

module.exports = RegisterController;

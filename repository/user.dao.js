const User = require('../models/User.model');
const bcrypt = require('bcryptjs');

class UserRepository {
    constructor(UserModel) {
        this.user = UserModel
    }

    register = async (user) => {
        const { username, email, password } = user;
        try {
            const existsUser = await this.user.findOne({ username });
            const existsEmail = await this.user.findOne({ email });
            const regexPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,20}$/;
            if (existsUser) {
                throw new Error('Este usuário já está cadastrado');
            }
            if (existsEmail) {
                throw new Error('Este email já está cadastrado');
            } else if (!username || !email || !password) {
                throw new Error('Todos os campos são obrigatórios');
            } else if (!password.match(regexPass)) {
                throw new Error(`Para sua segurança a senha deve conter no mínimo: 6 caracteres, 1 letra maiúscula, 1 letra minúscula, 1 símbolo e 1 número`)
            }
            else {
                const salt = bcrypt.genSaltSync(10);
                const passwordHash = bcrypt.hashSync(password, salt);
                // const newUser = new this.user({username, email, passwordHash});
                // newUser.save();
                 const newUser = await this.user.create({
                    username,
                    email,
                    passwordHash
                });
                return newUser;
            }

        } catch (error) {
            throw new Error();
        }
    }

    update = async (id, user) => {
        try {
            const updatedUser = await this.user.findByIdAndUpdate(id, user, { new: true });
            return updatedUser;
        } catch (error) {
            throw new Error();
        }
    }

    logout = async (id) => {
        try {
            
        } catch (error) {
            
        }
    }

    delete = async (id) => {
        try {
            await this.user.findByIdAndDelete(id)
        } catch (error) {
            throw new Error();
        }
    }
}

module.exports = new UserRepository(User);
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
                throw new Error('This user is already registered');
            }
            if (existsEmail) {
                throw new Error('This email is already registered');
            } else if (!username || !email || !password) {
                throw new Error('All fields are required');
            } else if (!password.match(regexPass)) {
                throw new Error(`For security reasons, your password must contain at least 6 characters, 1 uppercase letter, 1 lowercase letter, 1 symbol and 1 number`)
            }
            else {
                const salt = bcrypt.genSaltSync(10);
                const passwordHash = bcrypt.hashSync(password, salt);
                const newUser = await this.user.create({username, email, passwordHash});
                return ({
                    username: newUser.username,
                    email: newUser.email,
                    id: newUser.id,
                });
            }

        } catch (error) {
            throw new Error(error);
        }
    }

    findUser = async (email) => {
        try {
            const user = await this.user.findOne({ email });
            return user;
        } catch (error) {
            throw new Error('User and email does not match with a registered user and email');
        }
    }

    updateUser = async (id, user) => {
        try {
            const updatedUser = await this.user.findByIdAndUpdate(id, user, { new: true });
            return updatedUser;
        } catch (error) {
            throw new Error();
        }
    }


    deleteUser = async (id) => {
        try {
         const deletedUser = await this.user.findByIdAndDelete(id)
         return deletedUser;
        } catch (error) {
            throw new Error();
        }
    }
}

module.exports = new UserRepository(User);
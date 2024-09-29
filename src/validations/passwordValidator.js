import bcrypt from "bcrypt"

export const passwordValidator = (password, password_hash) => {
    return bcrypt.compare(password, password_hash)
}


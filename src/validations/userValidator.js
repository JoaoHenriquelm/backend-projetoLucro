import * as yup from "yup"

export const userValidator = yup.object({
    name: yup.string(),
    email: yup.string().required().email(),
    password: yup.string().required().min(8)
})
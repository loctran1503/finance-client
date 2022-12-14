import * as yup from 'yup'

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
// min 6 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.
export const authSchema = yup.object().shape({
    name:yup.string().min(3,"At least 3 characters").max(20,"Maxium 20 characters").required("Required"),
    email: yup.string().email("Please enter a valid email").required("Required"),
    password: yup
    .string()
    .min(6)
    .matches(passwordRules, { message: "Please create a stronger password" })
    .required("Required"),
})

export const loginSchema = yup.object().shape({

    email: yup.string().email("Please enter a valid email").required("Required"),
    password: yup
    .string()
    .min(6)
    .matches(passwordRules, { message: "Please create a stronger password" })
    .required("Required"),
})
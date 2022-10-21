import * as yup from "yup";

const required_message = "bu alanı doldurunuz...";

export const customerValidations = yup.object().shape({
    fullName: yup.string().min(5, "En az 5 karakter olmalıdır.").required(required_message),
    email: yup.string().email("Lütfen geçerli bir email giriniz.").required(required_message),
    address: yup.string().min(10, "En az 10 karakter girmelisiniz...").required(required_message),
    phone: yup.number().min(10, "En az 10 karakter girmelisiniz...").required(required_message)
});

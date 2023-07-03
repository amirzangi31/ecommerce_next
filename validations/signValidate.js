
function signValidate(data, type) {
    const error = {}
    const { email, password } = data

    if (!email.trim()) {
        error.email = "ایمیل الزامی میباشد"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        error.email = "لطفا ایمیل معتبر وارد کنید"
    } else {
        delete error.email;
    }

    if (!password.trim()) {
        error.password = "رمز عبور الزامی میباشد"
    } else if (password.length < 8) {
        error.password = "رمز عبور باید هشت رقم یا بیشتر باشد"
    } else {
        delete error.password
    }

    if (type === "signup") {

        if (!data.confirmpassword.trim()) {
            error.confirmpassword = "تایید رمز عبور الزامی میباشد"
        } else if (password !== data.confirmpassword) {
            error.confirmpassword = "تایید رمز عبور با رمز عبور مشابه نمیباشد"
        } else {
            delete error.confirmpassword
        }
    }

    return { error, errorLength: Object.keys(error).length }

}

export default signValidate
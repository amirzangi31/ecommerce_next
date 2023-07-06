
function validateComment(data) {
    const { name, email, comment } = data
    const error = {}

    if (!email.trim()) {
        error.email = "ایمیل الزامی میباشد"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        error.email = "لطفا ایمیل معتبر وارد کنید"
    } else {
        delete error.email;
    }
    if (!name.trim()) {
        error.name = "نام الزامی میباشد"
    } else {
        delete error.name;
    }
    if (!comment.trim()) {
        error.comment = "نوشتن نطر الزامی میباشد"
    } else {
        delete error.comment;
    }


    return { error, errorLength: Object.keys(error).length }

}

export default validateComment
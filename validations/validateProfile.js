
import { phoneNumberValidator, verifyCardNumber } from "@persian-tools/persian-tools"

function validateProfile(data) {


    const error = {}

    const { phone, card, name, postalcode, address, password } = data

    if (!name.trim()) {
        error.name = "نام ونام خانوادگی الزامی میباشد"
    } else {
        delete error.name;
    }

    if (!postalcode.trim()) {
        error.postalcode = "کدپستی الزامی میباشد"
    } else {
        delete error.postalcode;
    }


    if (!address.trim()) {
        error.address = "آدرس الزامی میباشد"
    } else {
        delete error.address;
    }


    if (!password.trim()) {
        error.password = "رمز عبور الزامی میباشد"
    } else if (password.length < 8) {
        error.password = "رمز عبور باید هشت رقم یا بیشتر باشد"
    }
    else {
        delete error.password;
    }


    if (!phone.trim()) {
        error.phone = "شماره همراه الزامی میباشد"
    }
    else if (!phoneNumberValidator(phone)) {
        error.phone = "شماره تماس  معتبر وارد کنید"
    } else {
        delete error.phone
    }



    if (!card.trim()) {
        error.card = " شماره کارت بانکی الزامی میباشد"
    }
    else if (!verifyCardNumber(card)) {
        error.card = "شماره کارت معتبر وارد کنید"
    } else if (card.length !== 16) {
        error.card = "شماره کارت معتبر وارد کنید"
    }

    else {
        delete error.card
    }




    return { error, errorLength: Object.keys(error).length }

}

export default validateProfile
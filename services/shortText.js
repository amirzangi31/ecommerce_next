const shortText = (text, count) => {
    const one = text.split("");


    const two = one.slice(0, count)

    const three = two.join("")

    return three

}

export default shortText
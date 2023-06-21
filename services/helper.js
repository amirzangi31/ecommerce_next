const isInCart = (data, id) => {
    const result = data.items.find(item => item.product._id === id)
    return result
}



export { isInCart }
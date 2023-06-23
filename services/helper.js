const isInCart = (data, id) => {
    const result = data.items.find(item => item.product._id === id)
    return result
}

const productCount = (data, id) => {
    const count = data.items.findIndex((item) => item.product._id === id);
    if (count === -1) {
        return false;
    } else {
        const result = data.items[count].quantity;
        return result;
    }
};

export { isInCart, productCount }


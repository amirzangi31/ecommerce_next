const uploadImageHandler = async (image, url) => {
    const body = new FormData();
    body.append("file", image);
    const response = await fetch(`${url}`, {
        method: "POST",
        body,
    });
    return response;
};

export default uploadImageHandler;
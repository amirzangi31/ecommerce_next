import { toast } from "react-toastify"

const Toastify = (type, text) => {
    if (type === "success") {
        toast.success(text, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            
        });
    } else if (type === "error") {
        toast.error(text, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            
        });
    }

}

export default Toastify
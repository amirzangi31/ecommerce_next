import React from "react";
import Button from "../Button";


import { withSwal } from "react-sweetalert2";
import axios from "axios";
import { useRouter } from "next/router";

function TableCategoryAdmin({ categories, swal, editedCategory }) {


    const router = useRouter()

    const deleteHandler = (category) => {
        swal.fire({
            title: 'آیا مطمعن هستید ؟ ',
            text: `شما میخواهید دسته بندی  ${category.name} راحذف کنید ؟؟ `,
            showCancelButton: true,
            cancelButtonText: "خیر ",
            confirmButtonText: "بله  , حذف کنید!",
            confirmButtonColor: "#e74c3c",
            cancelButtonColor: "#3498db",
            reverseButtons: true,
        }).then(result => {
            if (result.isConfirmed) {
                axios.delete(`/api/categories/${category._id}`).then(res => router.reload())
            }
        })
    }



    return (
        <table>
            <thead>
                <tr className="text-bg-admin dark:text-dark-bg-admin">
                    <th></th>
                    <th>نام دسته بندی</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {categories.map((item, index) => (
                    <tr key={item._id}>
                        <td className=" border-secondary-admin dark:border-secondary-admin">{index + 1}</td>
                        <td className="border-secondary-admin dark:border-secondary-admin">{item.name}</td>
                        <td className=" border-secondary-admin dark:border-secondary-admin">
                            <div className="flex justify-center items-center gap-2">
                                <Button className="btn-primary-admin" handler={() => editedCategory(item)}>ویرایش</Button>
                                <Button className="btn-error-admin" handler={() => deleteHandler(item)}>حذف</Button>
                            </div>
                        </td>
                    </tr>
                ))}

            </tbody>
        </table>
    )
}



export default withSwal(({ swal, categories, editedCategory }, ref) => (
    <TableCategoryAdmin swal={swal} categories={categories} editedCategory={editedCategory} />
));


import shortText from "@/services/shortText";
import React from "react";
import Button from "../Button";
import Link from "next/link";


import { withSwal } from "react-sweetalert2";
import axios from "axios";
import { useRouter } from "next/router";

function TableProductAdmin({ products, swal }) {

  const router = useRouter()

  const deleteHandler = (product) => {
    swal.fire({
      title: 'آیا مطمعن هستید ؟ ',
      text: `شما میخواهید محصول  ${product.name} راحذف کنید ؟؟ `,
      showCancelButton: true,
      cancelButtonText: "خیر ",
      confirmButtonText: "بله  , حذف کنید!",
      confirmButtonColor: "#e74c3c",
      cancelButtonColor: "#3498db",
      reverseButtons: true,
    }).then(result => {
      if (result.isConfirmed) {
        axios.delete(`/api/products/${product._id}`).then(res => router.reload())
      }
    })
  }



  return (
    <table>
      <thead>
        <tr className="text-bg-admin dark:text-dark-bg-admin">
          <th></th>
          <th>نام محصول</th>
          <th>قیمت</th>
          <th>توضیحات کوتاه</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {products.map((item, index) => (
          <tr key={item._id}>
            <td className=" border-secondary-admin dark:border-dark-secondary-admin">{index + 1}</td>
            <td className="border-secondary-admin dark:border-dark-secondary-admin">{item.name}</td>
            <td className=" border-secondary-admin dark:border-dark-secondary-admin">{item.price.toLocaleString()}</td>
            <td className="border-secondary-admin dark:border-dark-secondary-admin">{item.shortDes.length > 50 && "..."}{shortText(item.shortDes, 50)}</td>
            <td className=" border-secondary-admin dark:border-dark-secondary-admin">
              <div className="flex justify-center items-center gap-2">
                <Link href={`/admin/products/${item._id}`}><Button className="btn-primary-admin">ویرایش</Button></Link>
                <Button className="btn-error-admin" handler={() => deleteHandler(item)}>حذف</Button>
                <Link href={`/admin/comments/products/${item._id}`}><Button className="btn-primary-admin">کامنت</Button></Link>
              </div>
            </td>
          </tr>
        ))}

      </tbody>
    </table>
  );
}




export default withSwal(({ swal, products }, ref) => (
  <TableProductAdmin swal={swal} products={products} />
));


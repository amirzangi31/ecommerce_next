import React, { useState } from "react";
import LayoutAdmin from "./LayoutAdmin";
import Button from "@/components/modules/Button";
import Link from "next/link";
import shortText from "@/services/shortText";
import { withSwal } from "react-sweetalert2";
import axios from "axios";
import { useRouter } from "next/router";
import ReactPaginate from "react-paginate";

function ArticlesPageAdmin({ articles, swal, pageCount, page }) {

  const router = useRouter()



  const deleteHandler = (article) => {
    swal.fire({
      title: 'آیا مطمعن هستید ؟ ',
      text: `شما میخواهید مقاله  ${shortText(article.title, 10)} راحذف کنید ؟؟ `,
      showCancelButton: true,
      cancelButtonText: "خیر ",
      confirmButtonText: "بله  , حذف کنید!",
      confirmButtonColor: "#e74c3c",
      cancelButtonColor: "#3498db",
      reverseButtons: true,
    }).then(result => {
      if (result.isConfirmed) {
        axios.delete(`/api/article/${article._id}`).then(res => router.reload())
      }
    })
  }
  const changePage = ({ selected }) => {
    const pageNum = selected + 1;
    
    router.push(`/admin/articles?page=${pageNum}&limit=8`)
  }


  return (
    <LayoutAdmin title="مقالات">
      <table>
        <thead>
          <tr className="text-bg-admin dark:text-dark-bg-admin">
            <th ></th>
            <th >مقاله </th>
            <th >توضیحات </th>
            <th > </th>
          </tr>
        </thead>
        <tbody>
          {articles.map((item, index) => (

            <tr key={item._id} className="border-secondary-admin dark:border-dark-secondary-admin">
              <td >{index + 1}</td>
              <td >{shortText(item.title, 20)}{item.title.length > 20 && "..."}</td>
              <td >{shortText(item.shortdes, 60)}{item.shortdes.length > 60 && "..."}</td>

              <td className="flex justify-center items-center gap-4">
                <Link href={`/admin/articles/${item._id}`}><Button className="btn-primary-admin">ویرایش</Button></Link>
                <Button className="btn-error-admin" handler={() => deleteHandler(item)}>حذف</Button>
                <Link href={`/admin/comments/articles/${item._id}`}><Button className="btn-primary-admin">کامنت</Button></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link href={'/admin/articles/addarticle'}>

        <Button className="btn-circle-admin">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </Button>
      </Link>
      <ReactPaginate
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={changePage}
        
        initialPage={page}
        className='pagination my-2'
        previousLabel="قبلی"
        nextLabel="بعدی"
      />
    </LayoutAdmin>
  );
}




export default withSwal(({ swal, articles, pageCount, page }, ref) => (
  <ArticlesPageAdmin swal={swal} articles={articles} pageCount={pageCount} page={page} />
));


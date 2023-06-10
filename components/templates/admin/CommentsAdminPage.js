import React from "react";
import LayoutAdmin from "./LayoutAdmin";
import Link from "next/link";
import shortText from "@/services/shortText";


const test = (comments) => {
  const filter = comments.filter(item => item.accepted === false && item.answer.length === 0)
  console.log(filter.length)
}


function CommentsAdminPage({ products, articles }) {

  return (
    <LayoutAdmin title="کامنت ها">
      <label className="block py-2 border border-bg-admin bg-bg-admin my-2 text-center text-xl">محصولات</label>
      <div className="comments-content-admin">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>نام محصول </th>
              <th>تعداد کامنت ها</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>

                <td>
                  {" "}
                  <Link
                    href={`/admin/comments/products/${item._id}`}
                    key={item._id}
                  >
                    {item.name}{" "}
                  </Link>
                </td>


                <td>{item.comments.length}{test(item.comments)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <label className="block py-2 border border-bg-admin bg-bg-admin my-2 text-center text-xl">مقالات</label>
      <div className="comments-content-admin">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>نام محصول </th>
              <th>تعداد کامنت ها</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>

                <td>
                  {" "}
                  <Link
                    href={`/admin/comments/articles/${item._id}`}
                    key={item._id}
                  >
                    {shortText(item.title, 50)}
                  </Link>
                </td>


                <td>{item.comments.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </LayoutAdmin>
  );
}

export default CommentsAdminPage;

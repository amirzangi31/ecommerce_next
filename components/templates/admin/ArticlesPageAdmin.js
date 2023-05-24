import React from "react";
import LayoutAdmin from "./LayoutAdmin";
import Button from "@/components/modules/Button";

function ArticlesPageAdmin() {
  return (
    <LayoutAdmin title="مقالات">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>مقاله </th>
            <th>توضیحات </th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>kharha</td>
            <td>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam,
              incidunt.
            </td>
            <td className="flex justify-center items-center gap-4">
              <Button className="btn-primary">edit</Button>
              <Button className="btn-error">delete</Button>
            </td>
          </tr>
        </tbody>
      </table>

      <Button className="btn-circle">
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
    </LayoutAdmin>
  );
}

export default ArticlesPageAdmin;

import React from "react";
import { convertToPersain } from "@/services/jalalimoment";


function CardTicket({ text, answer, createdAt, updatedAt, _id , status }) {



   
  return (
    <div className="card-comment ticket">
      <div className="card-comment__header">
        <div className="card-comment__date flex justify-between items-center w-full ">
          <p>ارسال شده در : {convertToPersain(createdAt)}</p>
          <p>پاسخ شده در : {convertToPersain(updatedAt)}</p>
        </div>
      </div>
      <div className="card-comment__body">
        <div className="flex-1">
          <label>کاربر</label>
          <div className="card-comment__user">{text}</div>
          {status && (
            <>
              <label> ادمین</label>
              <div className="card-comment__admin">{answer}</div>
            </>
          )}
        </div>
       
      </div>
    </div>
  );
}

export default CardTicket;

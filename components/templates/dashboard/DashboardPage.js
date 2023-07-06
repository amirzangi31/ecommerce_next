import Loader from "@/components/modules/Loader";
import Modal from "@/components/modules/modal/Modal";
import Toastify from "@/services/Toast";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useSelector } from "react-redux";

function DashboardPage() {
  const session = useSession();

  const [ticket, setTicket] = useState("");

  const [ticketLoading, setTicketLoading] = useState(false)


  const { laoding, user } = useSelector(state => state.user)
  console.log(user)


  const [modal, setModal] = useState(false);

  const signoutHandler = async () => {
    signOut({
      redirect: "/signin",
    });
  };

  const ticketHandler = async () => {
    setTicketLoading(true)
    try {
      const res = await axios.post("/api/ticket", {
        text: ticket
      })
      setTicketLoading(false)
      if (res.data.status === "success") {
        Toastify("success", "تیکت با موفقیت ثبت شد")
        setModal(false)
        setTicket("")
      }
    } catch (error) {
      setTicketLoading(false)
      console.log(error)
    }
  };

  return (
    <div className="container mx-auto px-2 py-16">
      <Modal show={modal} setShow={setModal}>
        <form className="bg-bg-three border border-secondary rounded-lg p-4 w-full">
          <textarea
            className="w-full bg-transparent"
            id=""
            cols="30"
            placeholder="تیکت خود را اینجا بنویسید"
            rows="10"
            value={ticket}
            onChange={(e) => setTicket(e.target.value)}
          ></textarea>
          <div className="flex justify-center items-center ">
            <button
              type="button"
              className="btn-sm btn-primary"
              onClick={ticketHandler}
              disabled={ticketLoading}
            >
              {ticketLoading ? <Loader width="25" height="25" color="#fff" /> : "ارسال تیکت"}
            </button>
          </div>
        </form>
      </Modal>

      {/* {!laoding && user.user?.profileimage && (

        <div className="flex justify-center items-center">
          {session.status === "authenticated" && (
            <Image
              src={user.user.profileimage}
              width={200}
              height={200}
              alt="profile"
              className="rounded-lg w-48"
            />
          )}
        </div>
      )} */}

      <div className="grid grid-cols-2 gap-2 mt-4">
        <Link href={"/dashboard/profile"} className="w-full ">
          <button type="button" className="btn-sm btn-primary w-full">
            پروفایل
          </button>
        </Link>
        <Link href={"/dashboard/ordertracking"} className="w-full ">
          <button type="button" className="btn-sm btn-primary w-full">
            پیگیری سفارش
          </button>
        </Link>
        <Link href={"/dashboard/requestfallowup"} className="w-full ">
          <button type="button" className="btn-sm btn-primary w-full">
            پیگیری درخواست
          </button>
        </Link>
        <Link href={"/dashboard/tickets"} className="w-full ">
          <button type="button" className="btn-sm btn-primary w-full">
            همه تیکت ها
          </button>
        </Link>

        <button type="button" className="btn-sm btn-primary w-full" onClick={() => setModal(true)}>
          ارسال تیکت
        </button>

      </div>
      <button
        type="button"
        className="btn-sm btn-error w-full mt-2"
        onClick={signoutHandler}
      >
        خروج
      </button>
    </div>
  );
}

export default DashboardPage;

import Modal from "@/components/modules/modal/Modal";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

function DashboardPage() {
  const session = useSession();

  const [ticket, setTicket] = useState("");

  const [modal, setModal] = useState(false);

  const signoutHandler = async () => {
    signOut({
      redirect: "/signin",
    });
  };

  const ticketHandler = async () => {
    console.log(ticket);
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
            >
              ارسال تیکت
            </button>
          </div>
        </form>
      </Modal>

      <div className="flex justify-center items-center">
        {session.status === "authenticated" && (
          <Image
            src={session.data?.user?.image}
            width={200}
            height={200}
            alt="profile"
            className="rounded-lg w-48"
          />
        )}
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4">
        <Link href={"/dashbord/profile"} className="w-full ">
          <button type="button" className="btn-sm btn-primary w-full">
            پروفایل
          </button>
        </Link>
        <Link href={"/dashbord/profile"} className="w-full ">
          <button type="button" className="btn-sm btn-primary w-full">
            پیگیری سفارش
          </button>
        </Link>
        <Link href={"/dashbord/profile"} className="w-full ">
          <button type="button" className="btn-sm btn-primary w-full">
            همه تیکت ها
          </button>
        </Link>

        <button type="button" className="btn-sm btn-primary w-full">
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

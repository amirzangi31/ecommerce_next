import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Zoom, Fade } from "react-reveal";

import Typewriter from 'typewriter-effect';



function InstagramHomePage() {
  return (
    <section className="instagram-content mt-24  ">
      <div className="instagram-content__right">
        <Fade top>

          <Image
            src="https://res.cloudinary.com/dglh3bbsp/image/upload/v1689406219/xz2tgarod4ifk2lsst3j.png"
            alt="bg-instagram"
            priority={true}
            width={700}
            height={500}
          />
        </Fade>
      </div>
      <div className="instagram-content__left">
        <div className="instagram-content__left-inner">

          <Typewriter
            options={{
              autoStart: true,
              strings: [" اینستاگرام ما"],
              loop: true,
              deleteSpeed: 10,
              wrapperClassName: "text-2xl text-text-primary font-bold ",
              cursorClassName: "text-text-secondary font-bold text-3xl"
            }}
          />
          <Zoom>
            <p>
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
              استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
              ستون و سطرآنچنان که{" "}
            </p>
          </Zoom>
          <div>
            <Link href="/">
              <button type="button" className="btn-md btn-secondary hover:border hover:border-text-secondary">رفتن به اینستاگرام ما</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InstagramHomePage;

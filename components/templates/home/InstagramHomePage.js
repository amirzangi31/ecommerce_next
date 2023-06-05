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
            src="/images/landing/mobile_instagram.png"
            alt="bg-instagram"
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

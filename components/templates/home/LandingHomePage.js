import Image from "next/image";
import React from "react";
import Typewriter from 'typewriter-effect';
import { Flip } from 'react-reveal'
import Link from "next/link";
function LandingHomePage() {
  return (
    <section className="landing-home">
      <div className="container mx-auto landing-page__content px-2">
        <div className="landing-home__right">
          <Flip top>
            <h1>
            به فروشگاه آنلاین <span>ماتریکس</span> خوش آمدید
            </h1>
          </Flip>

          <Typewriter
            options={{
              strings: [' مقصدی که به دنبال آن بودید تا تمامی نیازهای خود در زمینه قطعات کامپیوتری را در یک مکان مطمئن و مطابق با استانداردهای بالا برآورده کنید'],
              autoStart: true,
              loop: true,
              deleteSpeed: 10,
              wrapperClassName: "text-text-primary text-center lg:text-right text-sm lg:text-lg ",
              cursorClassName: "text-bg-primary font-bold text-3xl"
            }}
          />

          <div className="landing-home__buttons">
            <Link href={"#start"}>
              <button type="button" className="btn-md btn-primary">
                شروع کار
              </button>
              </Link>
            <Link href={"/products"}>
              <button type="button" className="btn-md btn-secondary">
                محصولات
              </button>
            </Link>
          </div>
        </div>
        <div className="landing-home__left">
          <Image
            src="/images/landing/landing_image.png"
            className="w-10/12 landing_image"
            alt="landing-image"
            width={500}
            height={300}
          />
          <Image
            src="/images/landing/shape_1.png"
            alt="landing-image"
            className="shape shape_1"
            width={500}
            height={300}
          />
          <Image
            src="/images/landing/shape_2.png"
            alt="landing-image"
            className="shape shape_2"
            width={500}
            height={300}
          />
          <Image
            src="/images/landing/shape_3.png"
            alt="landing-image"
            className="shape shape_3"
            width={500}
            height={300}
          />
          <Image
            src="/images/landing/shape_4.png"
            alt="landing-image"
            className="shape shape_4"
            width={500}
            height={300}
          />
        </div>
      </div>
    </section>
  );
}

export default LandingHomePage;

import Image from "next/image";
import React from "react";

function LandingHomePage() {
  return (
    <section className="landing-home ">
      <div className="container mx-auto landing-page__content">
        <div className="landing-home__right">
          <h1>
            لورم ایپسوم متن <span>ساختگی</span> با تولید سادگی نامفهوم از صنعت
            چاپ
          </h1>
          <p>
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز
          </p>
          <div className="landing-home__buttons">
            <button type="button" className="btn-md btn-primary">
              شروع کار
            </button>
            <button type="button" className="btn-md btn-secondary">
              شروع کار
            </button>
          </div>
        </div>
        <div className="landing-home__left">
          <Image
            src="/images/landing/landing_image.png"
            className="w-10/12 landing_image"
            alt="landing-image"
            width={700}
            height={500}
          />
      
            
          <Image
            src="/images/landing/shape_1.png"
            alt="landing-image"
            className="shape shape_1"
            width={700}
            height={500}
          />
          <Image
            src="/images/landing/shape_2.png"
            alt="landing-image"
            className="shape shape_2"
            width={700}
            height={500}
          />
          <Image
            src="/images/landing/shape_3.png"
            alt="landing-image"
            className="shape shape_3"
            width={700}
            height={500}
          />
          <Image
            src="/images/landing/shape_4.png"
            alt="landing-image"
            className="shape shape_4"
            width={700}
            height={500}
          />
        </div>
      </div>
    </section>
  );
}

export default LandingHomePage;

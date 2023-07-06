import Link from 'next/link'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Autoplay, Pagination } from 'swiper/modules'

import 'swiper/css/autoplay';
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import shortText from '@/services/shortText';
import Image from 'next/image';









function ArticleHomePage({articles}) {
  return (
    <div>
      <div className="flex justify-between items-center title">
        <h2>جدیدترین مقالات</h2>
        <Link href={"/articles"}>
          <button type="button" className="btn-sm sm:btn-md btn-primary">
            سایر مقالات
          </button>
        </Link>

      </div>
      <div className='section-slider'>

        <Swiper
          modules={[EffectCoverflow, Autoplay, Pagination]}

          effect='coverflow'
          grabCursor="true"
          centeredSlides="true"

          speed={600}
          className='swiper-home'
          loop="true"
          autoplay={{
            delay: 4000,
            disableOnInteraction: false
          }}
          pagination={{
            clickable: true
          }}
          coverflowEffect={{
            rotate: 20,
            stretch: 0,
            depth: 100,
            modifier: 3,

          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            630: {
              slidesPerView: 2,
            },
            1100: {
              slidesPerView: 3,
            },
          }}
        >
          {articles.map((i, el) => (
            <SwiperSlide key={el} className='swiper-slide__one'>
              <div className='swiper-slide__body'>
                <h2>{shortText(i.title , 40) }{i.title.length > 40 && "..."}</h2>
                <Image src={i.image} alt={i.image} width={200} height={200}  /> 
                <div className='swiper-slide__buttons-article'>
                  
                  <Link href={`/articles/${i._id}`}>
                    <button type="button" className='btn-sm btn-primary w-full'>جزییات</button>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}

        </Swiper>
      </div >
    </div>

  )
}

export default ArticleHomePage
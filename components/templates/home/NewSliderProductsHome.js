import Link from 'next/link'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Autoplay, Pagination } from 'swiper/modules'

import 'swiper/css/autoplay';
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import Image from 'next/image';
import shortText from '@/services/shortText';








function NewSliderProductsHome({products}) {
    return (
        <div>
            <div className="flex justify-between items-center title">
                <h2>جدیدترین محصولات</h2>
                <Link href={"/products"}>
                    <button type="button" className="btn-sm sm:btn-md btn-primary">
                        سایر محصولات
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
                        rotate: 0,
                        stretch: 0,
                        depth: 100,
                        modifier: 3,
                        slideShadows : true
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
                    {products.map((i, el) => (
                        <SwiperSlide key={el} className='swiper-slide__one'>
                            <div className='swiper-slide__body'>
                                <h2>{shortText(i.name , 20)}{i.name.length > 20 && "..."}</h2>
                                <Image src={i.images[0].link} alt={i.images[0].name} width={200} height={200}  /> 
                                <div className='swiper-slide__buttons'>
                                    <p className='btn-sm btn-primary'>قیمت : <span>{i.price.toLocaleString()}ريال</span></p>
                                    <Link href={`/products/${i._id}`}>
                                        <button type="button" className='btn-sm btn-primary'>جزییات</button>
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

export default NewSliderProductsHome
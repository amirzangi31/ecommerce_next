import Link from 'next/link'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Autoplay, Pagination } from 'swiper/modules'

import 'swiper/css/autoplay';
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'




const products = [
    { link: "https://www.technolife.ir/image/gallery-1-TLP-4373_3c87b1de-79f3-4a73-b5f3-68da38ee9f5c.png" },
    { link: "https://www.technolife.ir/image/gallery-1-TLP-6122_4acd5813-ce0b-4f69-a999-eb92b845703b.png" },
    { link: "https://www.technolife.ir/image/gallery-0-TLP-6194_f8a86980-6201-44a1-b00c-911a6714cd55.png" },
    { link: "https://www.technolife.ir/image/gallery-1-TLP-6122_4acd5813-ce0b-4f69-a999-eb92b845703b.png" },
    { link: "https://www.technolife.ir/image/gallery-1-TLP-4373_3c87b1de-79f3-4a73-b5f3-68da38ee9f5c.png" },
    { link: "https://www.technolife.ir/image/gallery-0-TLP-6194_f8a86980-6201-44a1-b00c-911a6714cd55.png" },
    { link: "https://www.technolife.ir/image/gallery-1-TLP-6122_4acd5813-ce0b-4f69-a999-eb92b845703b.png" },
    { link: "https://www.technolife.ir/image/gallery-1-TLP-4373_3c87b1de-79f3-4a73-b5f3-68da38ee9f5c.png" },
    { link: "https://www.technolife.ir/image/gallery-0-TLP-6194_f8a86980-6201-44a1-b00c-911a6714cd55.png" },
]



function NewSliderProductsHome() {
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
                                <h2>slider {el}</h2>
                                <img src={i.link} alt="adf" />
                                <div className='swiper-slide__buttons'>
                                    <p className='btn-sm btn-primary'>قیمت : <span>12000</span></p>
                                    <Link href={"/"}>
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
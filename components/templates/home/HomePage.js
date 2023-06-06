import React from 'react'
import LandingHomePage from './LandingHomePage'
import ServicesHomePage from './ServicesHomePage'
import RequestHomePage from './RequestHomePage'
import ProductSliderHomePage from './ProductSliderHomePage'
import InstagramHomePage from './InstagramHomePage'
import ArticlesHomePage from './ArticlesHomePage'

function HomePage({ products,articles }) {

  return (
    <>
      <LandingHomePage />
      <div className='container mx-auto px-2'>
        <ServicesHomePage />
        <RequestHomePage />
        <ProductSliderHomePage products={products} />
        <InstagramHomePage />
        <ArticlesHomePage   articles={articles} />
      </div>
    </>
  )
}

export default HomePage
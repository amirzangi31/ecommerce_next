import React from 'react'
import LandingHomePage from './LandingHomePage'
import ServicesHomePage from './ServicesHomePage'
import RequestHomePage from './RequestHomePage'
import ProductSliderHomePage from './ProductSliderHomePage'
import InstagramHomePage from './InstagramHomePage'
import ArticlesHomePage from './ArticlesHomePage'
import NewSliderProductsHome from './NewSliderProductsHome'


function HomePage({ products,articles }) {

  return (
    <>
      <LandingHomePage />
      <div className='container mx-auto px-4 lg:px-0'>
        <ServicesHomePage />
        
        <RequestHomePage />
        <NewSliderProductsHome products={products} /> 
        {/* <ProductSliderHomePage products={products} /> */}
        <InstagramHomePage />
        <ArticlesHomePage   articles={articles} />
      </div>
    </>
  )
}

export default HomePage
import React from 'react'
import Hero2 from '../../Components/Hero2'
import AddToCartSection from '../../Components/AddToCartSection'
import useGetProducts from '../../utils/GetProducts'

import './ProductDetails.css'
import './ProductDetailsResponsive.css'
import OtherDetails from '../../Components/OtherDetails'

const ProductDetails = () => {

    const { product } = useGetProducts();

    return (
        <>
            {/* ====== 2.1 Hero section ======  */}
            <Hero2 heading={product.productName} />
            {/* ====== 2.1 Hero section ======  */}

            {/* ====== 3.1 Add To Cart section ======  */}
            <AddToCartSection />
            {/* ====== End 3.1 Add To Cart section ======  */}

            {/* ====== 3.2 Other Details section ======  */}
            <OtherDetails />
            {/* ====== End 3.2 Other Details section ======  */}
        </>
    )
}

export default ProductDetails
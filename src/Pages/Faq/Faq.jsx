import React from 'react'
import Hero2 from '../../Components/Hero2'
import FaqSection from '../../Components/FaqSection'
import './Faq.css'

const Faq = () => {
  return (
    <>
      {/* ====== 2.1 Hero section ======  */}
      <Hero2 heading="FAQ" />
      {/* ====== End 2.1 Hero section ======  */}

      {/* ====== FAQ section ======  */}
      <FaqSection />
      {/* ====== End FAQ section ======  */}
    </>
  )
}

export default Faq
import React from 'react'
import Hero from '../../Components/Hero'
import './Home.css'
import './HomeResponsive.css'
import Featured from '../../Components/Featured'
import Selling from '../../Components/Selling'
import PersistentCountdown from '../../Components/Countdown'
import Blog from '../../Components/Blog'
import Newsletter from '../../Components/Newsletter'

const Home = () => {
  return (
    <>
      {/* ====== 1.2 Hero section ======  */}
      <Hero />
      {/* ====== End 1.2 Hero section ======  */}

      {/* ====== 1.3 Featured section ======  */}
      <Featured />
      {/* ====== End 1.3 Featured section ======  */}

      {/* ====== 1.4 Selling Products section ======  */}
      <Selling />
      {/* ====== End 1.4 Selling Products section ======  */}

      {/* ====== 1.5 Countdown section ======  */}
      <PersistentCountdown />
      {/* ====== End 1.5 Countdown section ======  */}

      {/* ====== 1.6 Blog section ======  */}
      <Blog />
      {/* ====== End 1.6 Blog section ======  */}

      {/* ====== 1.7 Newsletter section ======  */}
      <Newsletter />
      {/* ====== End 1.7 Newsletter section ======  */}

    </>
  )
}

export default Home
import React from 'react'
import Hero2 from '../../Components/Hero2'
import './About.css'
import './AboutResponsive.css'
import Video from '../../Components/Video'
import Services from '../../Components/Services'
import Gallery from '../../Components/Gallery'

const About = () => {
    return (
        <>
            {/* ====== 2.1 Hero section ======  */}
            <Hero2 heading="About Us" />
            {/* ====== End 2.1 Hero section ======  */}

            {/* ====== 2.2 Video section ======  */}
            <Video />
            {/* ====== End 2.2 Video section ======  */}

            {/* ====== 2.3 Services section ======  */}
            <Services />
            {/* ====== End 2.3 Services section ======  */}

            {/* ====== 2.4 Gallery section ======  */}
            <Gallery />
            {/* ====== End 2.4 Gallery section ======  */}
        </>
    )
}

export default About
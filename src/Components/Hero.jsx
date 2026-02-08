import React, { useState } from 'react';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router';

// Import Swiper styles and modules
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

const HeroSlide = (props) => {
    return (
        <div className={`slide ${props.slide} ${props.isActive ? 'fade-up' : ''}`}>
            <div className="container">
                <div className="col-md-6">
                    <div>
                        <h5>{props.title}</h5>
                        <h1>{props.heading}</h1>
                        <p>{props.para}</p>
                        <Link to="#" className='black_btn'>Shop Now <FontAwesomeIcon icon={faArrowRight} /></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Hero = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section id='hero'>
            <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={50}
                slidesPerView={1}
                pagination={{ clickable: true }}
                loop={true}
                speed={700}
                autoplay={{
                    delay: 4000, // 4 seconds
                    disableOnInteraction: false,
                }}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            >
                <SwiperSlide>
                    <HeroSlide
                        slide="slide1"
                        isActive={activeIndex === 0} // Only active slide gets the fade-up class
                        title="ELEGANT COMFORT"
                        heading="Discover Modern Chairs"
                        para="Experience the perfect blend of style and comfort with our premium chair collection. Designed for your lifestyle!"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <HeroSlide
                        slide="slide2"
                        isActive={activeIndex === 1}
                        title="PREMIUM DESIGNS"
                        heading="Redefine Your Living Space"
                        para="Elevate your home with our contemporary furniture collection, crafted to perfection for a luxurious touch."
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <HeroSlide
                        slide="slide3"
                        isActive={activeIndex === 2}
                        title="STYLE MEETS FUNCTION"
                        heading="Create Timeless Spaces"
                        para="Transform your interiors with our versatile and durable furniture pieces that combine beauty and functionality."
                    />
                </SwiperSlide>
            </Swiper>
        </section>
    );
};

export default Hero;

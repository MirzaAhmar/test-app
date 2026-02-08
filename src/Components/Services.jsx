import { faPaypal } from '@fortawesome/free-brands-svg-icons'
import { faBagShopping, faClock, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const ServicesCard = (props) => {
    return (
        <div className="col-md-3">
            <div className='serviceCard'>
                <div className='d-flex gap-md-4 gap-3 mb-md-4 mb-2'>
                    {props.icon}
                    <h4>{props.title}</h4>
                </div>
                <p>{props.para}</p>
            </div>
        </div>
    )
}

const Services = () => {
    return (
        <section id='services'>
            <div className="container">
                <div className="row gap-md-0 gap-4">
                    <ServicesCard icon={<FontAwesomeIcon icon={faBagShopping} />} title="Shop online" para="Browse and purchase products from the comfort of your home." />
                    <ServicesCard icon={<FontAwesomeIcon icon={faPaypal} />} title="Payment methods" para="Choose from a variety of secure and easy payment options." />
                    <ServicesCard icon={<FontAwesomeIcon icon={faPaperPlane} />} title="Free shipping" para="Enjoy free delivery on all orders with no hidden fees." />
                    <ServicesCard icon={<FontAwesomeIcon icon={faClock} />} title="Return policy" para="Easily return items within the specified time frame." />
                </div>
                <div className="row mt-5">
                    <div className="col-md-7">
                        <div>
                            <h4>Functionality meets perfection</h4>
                            <p>But I must explain to you how all this mistaken idea of denouncing sure and praising pain was born and I will give you a complete at the system, expound the actual teachings of the great of the truth, the human happiness was born. teachings of the great of the truth.</p>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className='d-flex flex-column gap-5 mt-4'>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Services
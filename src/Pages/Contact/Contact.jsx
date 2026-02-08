import React from 'react'
import Hero2 from '../../Components/Hero2'
import { faClock, faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Contact.css'
import './ContactResponsive.css'
import { faFacebookF, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router'
import useNewsletter from '../../Components/EmailForm'
import { ToastContainer } from 'react-toastify'

const DetailCard = (props) => {
    return (
        <div className="col-md-3">
            <div className='d-flex gap-4 detail_card'>
                {props.icon}
                <div>
                    <h4>{props.heading}</h4>
                    <p>{props.detail1}</p>
                    <p>{props.detail2}</p>
                </div>
            </div>
        </div>
    )
}

const Contact = () => {

    const { email, handleEmail, isLoading, formSubmit, errors } = useNewsletter();
    

    return (
        <>
            {/* ====== 2.1 Hero section ======  */}
            <Hero2 heading="Contact" />
            {/* ====== End 2.1 Hero section ======  */}

            <section id='contact'>
                <div className="container">
                    <div className="row gap-md-0 gap-4 detailCards">
                        <DetailCard icon={<FontAwesomeIcon icon={faClock} />} heading="Open houses" detail1="Mon – Fri : 8:30 – 18:00" detail2="Sat – Sun : 9:00 – 17:00" />
                        <DetailCard icon={<FontAwesomeIcon icon={faPhone} />} heading="Phone number" detail1="(504) 586 256 23" detail2="(306) 574 326 56" />
                        <DetailCard icon={<FontAwesomeIcon icon={faEnvelope} />} heading="Our email" detail1="office@helendo.com" detail2="Info@helendo.com" />
                        <DetailCard icon={<FontAwesomeIcon icon={faLocationDot} />} heading="Our location" detail1="1102 Helen Estates, Guys" detail2="Store, San Diego, USA." />
                    </div>

                    <div className="row gap-md-0 gap-4">
                        <div className="col-md-7">
                            <div>
                                <h4>Get in touch</h4>
                                <h5>Write us a letter !</h5>
                                <form onSubmit={(e) => formSubmit(e, true)}>
                                    <input
                                        type="text"
                                        placeholder="Email *"
                                        name="sender"
                                        value={email.sender}
                                        onChange={handleEmail}
                                    />
                                    {errors.sender && <p className="error">{errors.sender}</p>}

                                    <input
                                        type="text"
                                        placeholder="Subject *"
                                        name="subject"
                                        value={email.subject}
                                        onChange={handleEmail}
                                    />
                                    {errors.subject && <p className="error">{errors.subject}</p>}

                                    <textarea
                                        name="message"
                                        rows={8}
                                        placeholder="Please describe what you need"
                                        value={email.message}
                                        onChange={handleEmail}
                                    ></textarea>
                                    {errors.message && <p className="error">{errors.message}</p>}

                                    <button type="submit" disabled={isLoading}>Submit</button>

                                    {isLoading && (
                                        <div className="loader-overlay">
                                            <div className="loader"></div>
                                        </div>
                                    )}
                                </form>
                            </div>
                        </div>
                        <div className="col-md-5">
                            <div className='address'>
                                <h4>Our address</h4>
                                <p>Duis aute irure dolor in reprehenderit ioluptate velit esse cillum dolore pariatur.</p>
                                <p>1102 Helen Estates, Guys Store, San Diego, USA. <br />
                                    (693) 650-2389 <br />
                                    office@helendo.com</p>
                                <div className='socialIcons d-flex align-items-center gap-4 mt-md-5 mt-3'>
                                    <h5>Follow us on social</h5>
                                    <Link><FontAwesomeIcon icon={faFacebookF} /></Link>
                                    <Link><FontAwesomeIcon icon={faXTwitter} /></Link>
                                    <Link><FontAwesomeIcon icon={faInstagram} /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="location py-5">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d423284.69000255124!2d-118.41173260000001!3d34.02047895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22fdf6f254608f4!2sLos%20Angeles%2C%20CA%2C%20USA!5e0!3m2!1sen!2s!4v1739269408476!5m2!1sen!2s"
                width="600"
                height="600"
                style={{ border: "0" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
            <ToastContainer />
        </>
    )
}

export default Contact
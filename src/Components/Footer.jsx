import { faFacebookF, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { faArrowRight, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router'
import useNewsletter from './EmailForm'
import { Logo } from '../assets/images'

const Footer = () => {
    const { email, handleEmail, formSubmit, isLoading } = useNewsletter();

    return (
        <>
            <footer>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-3 mb-sm-0 mb-4">
                            <div>
                                <h4>Address</h4>
                                <div className='d-flex align-items-start gap-3'>
                                    <FontAwesomeIcon icon={faPhone} />
                                    <Link to={"tel:846677028028"}> <h6>+846677028028</h6> </Link>
                                </div>
                                <div className='socialIcons d-flex align-items-center gap-4'>
                                    <Link><FontAwesomeIcon icon={faFacebookF} /></Link>
                                    <Link><FontAwesomeIcon icon={faXTwitter} /></Link>
                                    <Link><FontAwesomeIcon icon={faInstagram} /></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3 col-6">
                            <div>
                                <h4>Help & Information</h4>
                                <div className='d-flex flex-column gap-3'>
                                    <Link>Help & Contact Us</Link>
                                    <Link>Returns & Refunds</Link>
                                    <Link>Online Stores</Link>
                                    <Link>Terms & Conditions</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3 col-6">
                            <div>
                                <h4>About Us</h4>
                                <div className='d-flex flex-column gap-3'>
                                    <Link>About Us</Link>
                                    <Link>What We Do</Link>
                                    <Link>FAQ Page</Link>
                                    <Link>Cobtact Us</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 mt-sm-0 mt-4">
                            <div>
                                <h4>Newsletter</h4>
                                <form onSubmit={formSubmit}>
                                    <input type="email" name='message' value={email.message} onChange={handleEmail} placeholder='Your email address' />
                                    <button type='submit'><FontAwesomeIcon icon={faArrowRight} /></button>
                                    {isLoading && (
                                        <div className='loader-overlay'>
                                            <div className='loader'></div>
                                        </div>
                                    )}
                                </form>

                                <div className='d-flex gap-lg-4 gap-3 mt-md-5 mt-4'>
                                    <Link>Terms & Condition</Link>
                                    <Link>Policy</Link>
                                    <Link>Map</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <section id='subFooter'>
                <div className="container">
                    <div className="d-flex flex-md-row flex-column-reverse flex-column align-items-md-center justify-content-between">
                        <div className='d-flex gap-4 mt-md-5 mt-3'>
                            <Link>Terms & Condition</Link>
                            <Link>Policy</Link>
                            <Link>Map</Link>
                        </div>

                        <Link><img src={Logo} alt="footerLogo" /></Link>
                        <div className='socialIcons d-flex align-items-end gap-4'>
                            <h5>Follow us on social</h5>
                            <Link><FontAwesomeIcon icon={faFacebookF} /></Link>
                            <Link><FontAwesomeIcon icon={faXTwitter} /></Link>
                            <Link><FontAwesomeIcon icon={faInstagram} /></Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Footer
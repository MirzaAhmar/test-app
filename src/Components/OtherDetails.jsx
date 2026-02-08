import React, { useState } from 'react'
import useGetProducts from '../utils/GetProducts'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useNewsletter from './EmailForm'
import { ToastContainer } from 'react-toastify'

const OtherDetails = () => {
    const { product } = useGetProducts()

    const { email, handleEmail, isLoading, formSubmit } = useNewsletter();

    const [tab, setTab] = useState("des");

    return (
        <>
            <section id='otherDetails'>
                <div className="container">
                    <div className="tabs">
                        <button className={tab === 'des' ? 'active' : ''} onClick={() => setTab("des")}>Description <span>/</span></button>
                        <button className={tab === 'additional' ? 'active' : ''} onClick={() => setTab("additional")}>Additional information <span>/</span></button>
                        <button className={tab === 'review' ? 'active' : ''} onClick={() => setTab("review")}>Reviews</button>
                    </div>

                    {
                        tab === "des" && (
                            <>
                                <div className='description'>
                                    <div className="row align-items-center gap-md-0 gap-4">
                                        <div className="col-md-7">
                                            <div>
                                                <h4>Description</h4>
                                                <p>{product.longDescription}</p>
                                            </div>
                                        </div>
                                        <div className="col-md-5">
                                            <div>
                                                <img src={product.previewImg} alt="previewImg" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='description'>
                                    <div className="row gap-md-0 gap-4 align-items-center">
                                        <div className="col-md-7">
                                            <div>
                                                <h4>features</h4>
                                                {product.features.map((feature, index) => (
                                                    <div key={index} className='d-flex align-items-center gap-2 py-2'>
                                                        <FontAwesomeIcon icon={faPlay} />
                                                        <p>{feature}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="col-md-5">
                                            <div>
                                                <img src={product.previewImg} alt="previewImg" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                    {tab == "additional" && (
                        <div className='d-flex gap-5 additional'>
                            <p><span>Weight</span> {product.weight}</p>
                            <p><span>Dimensions</span> {product.dimensions}</p>
                        </div>
                    )}
                    {tab == "review" && (
                        <div className='review'>
                            <form onSubmit={formSubmit}>
                                <label htmlFor="review">Your review *</label>
                                <textarea name="message" value={email.message} onChange={handleEmail} id="review" rows={8}></textarea>

                                <div className="row gap-md-0 gap-4 mt-4">
                                    <div className="col-md-6">
                                        <div>
                                            <label htmlFor="name">Name *</label>
                                            <input type="text" name='subject' value={email.subject} id='name' onChange={handleEmail} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div>
                                            <label htmlFor="email">Email *</label>
                                            <input type="email" name='sender' value={email.sender} id='email' onChange={handleEmail} />
                                        </div>
                                    </div>
                                </div>
                                <button type='submit'>Submit</button>
                                {isLoading && (
                                    <div className='loader-overlay'>
                                        <div className='loader'></div>
                                    </div>
                                )}
                            </form>
                        </div>
                    )}
                </div>
            </section>
            <ToastContainer />
        </>
    )
}

export default OtherDetails
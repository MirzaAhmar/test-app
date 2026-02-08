import axios from 'axios'
import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import useNewsletter from './EmailForm';
const Newsletter = () => {

    const { email, handleEmail, formSubmit, isLoading } = useNewsletter();
    return (
        <>
            <section id='newsletter'>
                <div className="container">
                    <div className="row gap-md-0 gap-4">
                        <div className="col-md-6">
                            <div>
                                <h2 className='b_gold'>Our Newsletter</h2>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div>
                                <form onSubmit={formSubmit}>
                                    <input type="email" placeholder='Your email address' name='message' value={email.message} onChange={handleEmail} />
                                    <button type='submit'>Subscribe</button>
                                    {isLoading && (
                                        <div className='loader-overlay'>
                                            <div className='loader'></div>
                                        </div>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer />
        </>
    )
}

export default Newsletter
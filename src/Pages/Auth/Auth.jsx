import React, { useState } from 'react'
import Hero2 from '../../Components/Hero2'

import './Auth.css'
import './AuthResponsive.css'
import { Link } from 'react-router'

const Auth = () => {

    const [formdata, setFormdata] = useState({
        name: "",
        password: "",
        email: ""
    })

    const handleInput = (e) => {
        setFormdata({ ...formdata, [e.target.name]: e.target.value })
    }

    // form tabs
    const [tabs, setTabs] = useState("login");

    return (
        <>
            {/* ====== 2.1 Hero section ======  */}
            <Hero2 heading="Login" />
            {/* ====== End 2.1 Hero section ======  */}

            {/* ====== 4.1 Login/Register section ======  */}
            <section id='login'>
                <div className="container">
                    <div className='forms'>
                        <div className='d-flex justify-content-center gap-5'>
                            <h3 onClick={() => setTabs("login")} style={{color: tabs==="login" ? "gray" : ""}}>Login</h3>
                            <h3 onClick={() => setTabs("register")} style={{color: tabs==="register" ? "gray" : ""}}>Our Register</h3>
                        </div>
                        {
                            tabs === "login" && (
                                <form>
                                    <h4>Login your account</h4>
                                    <input type="text" placeholder='Username' name='name' value={formdata.name} onChange={handleInput} />
                                    <input type="password" placeholder='Password' name='password' value={formdata.password} onChange={handleInput} />
                                    <div className='d-flex justify-content-between'>
                                        <div className='d-flex gap-3'>
                                            <input type="checkbox" name="remember" id="remember" />
                                            <label htmlFor="remember">Remember me</label>
                                        </div>
                                        <Link>Lost your password?</Link>
                                    </div>
                                    <button type='submit'>Login</button>
                                </form>
                            )}

                        {
                            tabs === "register" && (
                                <form>
                                    <h4>Register An Account</h4>
                                    <input type="text" placeholder='Username' name='name' value={formdata.name} onChange={handleInput} />
                                    <input type="email" placeholder='Email address' name='email' value={formdata.email} onChange={handleInput} />
                                    <input type="password" placeholder='Password' name='password' value={formdata.password} onChange={handleInput} />
                                    <p>Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our <Link>privacy policy.</Link></p>
                                    <button type='submit'>Login</button>
                                </form>
                            )}
                    </div>
                </div>
            </section>
            {/* ====== End 4.1 Login/Register section ======  */}
        </>
    )
}

export default Auth
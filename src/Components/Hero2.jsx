import React from 'react'
import { Link } from 'react-router'

const Hero2 = (props) => {
    return (
        <section id='hero2'>
            <div className="container">
                <div className="d-flex flex-md-row flex-column align-items-center justify-content-between gap-md-0 gap-4">
                    <h3>{props.heading}</h3>
                    <div className='breadcrumb d-flex  align-items-center gap-4'>
                        <Link to={"/"}><h5>Home</h5></Link>
                        <span>/</span>
                        <h5>{props.heading}</h5>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero2
import React from 'react'
import { gallery1, gallery2, gallery3, gallery4, gallery5 } from '../assets/images'
import { Link } from 'react-router'

const Gallery = () => {
    return (
        <section id='gallery'>
            <div className="container">
                <div className="row gap-md-0 gap-3">
                    <div className="col-md-8">
                        <div>
                            <figure><img src={gallery1} alt="gallery" /></figure>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className='d-flex flex-column gap-3'>
                            <figure><img src={gallery2} alt="gallery" /></figure>
                            <figure><img src={gallery3} alt="gallery" /></figure>
                        </div>
                    </div>
                    <div className="col-md-4 mt-md-3 mt-0">
                        <div>
                            <figure><img src={gallery4} alt="gallery" /></figure>
                        </div>
                    </div>
                    <div className="col-md-8 mt-md-3 mt-0">
                        <div>
                            <figure><img src={gallery5} alt="gallery" /></figure>
                        </div>
                    </div>
                </div>
                <div className='d-flex flex-column gap-3 mt-5'>
                    <h4>New York</h4>
                    <Link>2954 Golden Estates, Guys Store, New York, USA.</Link>
                    <Link to={"tel:(571) 400-1255"}>(571) 400-1255</Link>
                    <Link>info@helendo.com</Link>
                </div>
            </div>
        </section>
    )
}

export default Gallery
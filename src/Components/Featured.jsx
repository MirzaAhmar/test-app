import React from 'react'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router'
import { SellingProducts } from '../data/data'
import { scrollToTop } from '../utils/TopButton'

const Featured = () => {
    return (
        <section id='featured'>
            <div className="container">
                {SellingProducts.filter(product => [20, 21, 22].includes(product.id)).map((product, index) => (
                    <div className={`row align-items-center gap-md-0 gap-sm-5 gap-4 ${index === 1 ? 'flex-row-reverse' : ''}`} key={product.id}>
                        <div className="col-md-6">
                            <div>
                                <Link to={`/product-detail/${product.id}`} className={`d-flex justify-content-md-start justify-content-center ${index === 1 ? 'justify-content-md-end' : ''} `}>
                                    <img src={product.img} alt="featured" />
                                </Link>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className='featured_content'>
                                <h5>{product.title}</h5>
                                <Link to={`/product-detail/${product.id}`} onClick={() => scrollToTop()} ><h2 className='b_gold'>{product.productName}</h2></Link>
                                <p>{product.longDescription}</p>
                                <Link to={`/product-detail/${product.id}`} onClick={() => scrollToTop()}>Only ${product.productPrice} <FontAwesomeIcon icon={faArrowRight} /></Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Featured
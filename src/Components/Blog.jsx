import React from 'react'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router'
import { blogs } from '../data/data'
import { scrollToTop } from '../utils/TopButton'

const Blog = () => {
    return (
        <section id="blog">
            <div className="container">
                <h2 className='b_center'>Our Blog</h2>
                <div className="row gap-md-0 gap-4">
                    {blogs.filter(blogs => [1, 2, 3].includes(blogs.id)).map((blog, index) => (
                        <div className="col-md-4" key={index}>
                            <div className="blogCard">
                                <div className="position-relative">
                                    <Link to={`/blog-detail/${blog.id}`} onClick={() =>scrollToTop()}><img src={blog.img} alt="blog" /></Link>
                                    <Link to={`/blog-detail/${blog.id}`} onClick={() => scrollToTop()} className="read-more">Read more <FontAwesomeIcon icon={faPlus} /></Link>
                                </div>
                                <Link><h3>{blog.title}</h3></Link>
                                <div className='breadcrumb'>
                                    <h6>{blog.date}</h6>
                                    <span>/</span>
                                    <h6>Admin</h6>
                                    <span>/</span>
                                    <h6><span>in</span><a href="#">deco</a></h6>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Blog
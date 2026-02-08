import React from 'react'
import './BlogDetails.css'
import { blogdetail1, blogdetail2 } from '../../assets/images'
import { Link } from 'react-router'
import { faQuoteLeftAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useGetProducts from '../../utils/GetProducts'

const BlogDetails = () => {

    const { blog } = useGetProducts();

    return (
        <>
            <section id='blogDetail'>
                <div className="container">
                    <img src={blog.previewImg} className='w-100' alt="blogpreview" />
                    <h3>{blog.title}</h3>
                    <div className='blogDesc'>
                        <div className='breadcrumb'>
                            <h6>{blog.date}</h6>
                            <span>/</span>
                            <h6>Admin</h6>
                            <span>/</span>
                            <h6><span>in</span><Link to={"/"}>deco</Link></h6>
                            <p>{blog.blogDescription}</p>
                            <div className='quote d-flex gap-3 mt-3'>
                                <FontAwesomeIcon icon={faQuoteLeftAlt} />
                                <p>{blog.quote}</p>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex gap-4 my-5'>
                        <img src={blogdetail1} alt="blogdetail" className='w-100' />
                        <img src={blogdetail2} alt="blogdetail" className='w-100' />
                    </div>
                </div>
            </section>
        </>
    )
}

export default BlogDetails
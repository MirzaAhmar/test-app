import React, { useState } from 'react';
import Hero2 from '../../Components/Hero2';
import { blogs } from '../../data/data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router';
import './AllBlogs.css'
import './AllBlogsResponsive.css'
import { scrollToTop } from '../../utils/TopButton';

const AllBlogs = () => {
    const [visibleBlogs, setVisibleBlogs] = useState(6);
    const blogsPerLoad = 3;

    const loadMoreBlogs = () => {
        if (visibleBlogs < blogs.length) {
            setVisibleBlogs(prevCount => prevCount + blogsPerLoad);
        }
    };

    return (
        <>
            <Hero2 heading="Blog" />

            <section id='allBlogs'>
                <div className="container" id='blog'>
                    <div className="row gap-md-0 gap-4">
                        {blogs.slice(0, visibleBlogs).map((blog, index) => (
                            <div className="col-md-4 mt-md-4 mt-0" key={index}>
                                <div className="blogCard">
                                    <div className="position-relative">
                                        <Link to={`/blog-detail/${blog.id}`} onClick={() => scrollToTop()} ><img src={blog.img} alt="blog" /></Link>
                                        <Link to={`/blog-detail/${blog.id}`} onClick={() => scrollToTop()} className="read-more">Read more <FontAwesomeIcon icon={faPlus} /></Link>
                                    </div>
                                    <Link to={`/blog-detail/${blog.id}`} onClick={() => scrollToTop()} ><h3>{blog.title}</h3></Link>
                                    <div className='breadcrumb'>
                                        <h6>{blog.date}</h6>
                                        <span>/</span>
                                        <h6>Admin</h6>
                                        <span>/</span>
                                        <h6><span>in</span><Link to={"/"}>deco</Link></h6>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {visibleBlogs < blogs.length ? (
                        <div>
                            <button onClick={loadMoreBlogs}>Load More</button>
                        </div>
                    ) : (
                        <div>
                            <p>All items have been loaded!</p>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default AllBlogs;

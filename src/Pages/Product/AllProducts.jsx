import React, { useState, useEffect } from 'react';
import Hero2 from '../../Components/Hero2';
import { faBagShopping, faHeart, faMinus, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SellingProducts } from '../../data/data';
import { Link } from 'react-router-dom';
import { scrollToTop } from '../../utils/TopButton';
import { ToastContainer } from 'react-toastify';
import './AllProducts.css';
import { useCounter } from '../../utils/CounterContext';

const AllProducts = () => {

    const [open, setOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const productsPerPage = 9;

    // Calculate total pages
    const totalPages = Math.ceil(SellingProducts.length / productsPerPage);

    // Get products for the current page
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = SellingProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const handleProductClick = (product) => {
        setSelectedProduct(product);
        setOpen(true);
        setCountProduct(1);
    };

    // product add remove counter
    const [countProduct, setCountProduct] = useState(1);

    const addProducts = () => {
        setCountProduct(countProduct + 1);
    };

    const removeProducts = () => {
        if (countProduct > 0) {
            setCountProduct(countProduct - 1);
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;

        if (!isNaN(value) && value !== "") {
            setCountProduct(parseInt(value, 10));
        } else if (value === "") {
            setCountProduct("");
        }
    };

    const handleBlur = () => {
        if (countProduct === "" || isNaN(countProduct)) {
            setCountProduct(0);
        }
    };
    const handleAddToCart = (product, quantity) => {
        const existingCart = JSON.parse(localStorage.getItem('cart')) || [];

        const addedQuantity = Math.max(1, Number(quantity));

        // Check if product already exists in the cart
        const existingProduct = existingCart.find(item => item.id === product.id);

        if (existingProduct) {
            existingProduct.quantity += addedQuantity;
        } else {
            // If product does not exist, add it with the given quantity
            existingCart.push({
                ...product,
                quantity: addedQuantity,
                totalPrice: addedQuantity * Number(product.productPrice)
            });
        }

        setCart(existingCart);
        localStorage.setItem('cart', JSON.stringify(existingCart));

        for (let i = 0; i < addedQuantity; i++) {
            increamentCart();
        }
    };

    // Scroll to #product when page changes
    useEffect(() => {
        const section = document.getElementById('product');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }, [currentPage]);

    // Generate pagination buttons
    const visiblePages = [...Array(totalPages).keys()].map(i => i + 1);

    const { increamentCart, increamentHeart, increamentCart2, setCartCount, setHeartCount, addToWishlist, addToCart, setCart } = useCounter();


    return (
        <>
            <Hero2 heading="Product" />

            <section id='product'>
                <div className="container">
                    <div className="row">
                        {currentProducts.map((product, index) => (
                            <div className='col-md-4 mt-5' key={index}>
                                <div>
                                    <Link to={`/product-detail/${product.id}`} onClick={scrollToTop}>
                                        <div className="product_img">
                                            <img src={product.img} alt="product" />
                                            <div className="overlay">
                                                <div onClick={(e) => { e.stopPropagation(); e.preventDefault(); handleProductClick(product); e.stopPropagation(); }}><button><FontAwesomeIcon icon={faPlus} /></button></div>
                                                <div onClick={(e) => e.stopPropagation()}><Link><button onClick={() => { addToCart(product); }} disabled={product.availability !== 'in-stock'} style={{ cursor: product.availability === 'in-stock' ? 'pointer' : 'not-allowed' }}><FontAwesomeIcon icon={faBagShopping} /></button></Link></div>
                                                <div onClick={(e) => e.stopPropagation()}><Link><button onClick={() => { addToWishlist(product); e.stopPropagation(); }}><FontAwesomeIcon icon={faHeart} /></button></Link></div>
                                            </div>
                                            {product.availability === "out-of-stock" && (
                                                <div className="stock">
                                                    <h5>Out Of Stock</h5>
                                                </div>
                                            )}
                                        </div>
                                    </Link>
                                    <Link to={`/product-detail/${product.id}`} onClick={scrollToTop}>
                                        <h5>{product.productName}</h5>
                                    </Link>
                                    <h5>${Number(product.productPrice).toFixed(2)}</h5>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    <div className="pagination mt-4 d-flex justify-content-center">
                        {currentPage > 1 && (
                            <button onClick={() => setCurrentPage(prev => prev - 1)}>
                                Prev
                            </button>
                        )}

                        {visiblePages.map((page) => (
                            <button
                                key={page}
                                className={currentPage === page ? 'active' : ''}
                                onClick={() => setCurrentPage(page)}
                            >
                                {page}
                            </button>
                        ))}

                        {currentPage < totalPages && (
                            <button onClick={() => setCurrentPage(prev => prev + 1)}>
                                Next
                            </button>
                        )}
                    </div>
                </div>
                {open && selectedProduct && (
                    <div className='plus_popup d-flex align-items-center' onClick={() => setOpen(false)}>
                        <div className="container" onClick={(e) => e.stopPropagation()}>
                            <div className="row">
                                <div className="col-sm-6 p-0">
                                    <div className='h-100 position-relative'>
                                        <Link to={`/product-detail/${selectedProduct.id}`} onClick={scrollToTop}>
                                            <img src={selectedProduct.previewImg} alt="product" />
                                        </Link>
                                        {selectedProduct.availability === "out-of-stock" && (
                                            <div className="stock">
                                                <h5>Out Of Stock</h5>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="col-sm-6 p-0">
                                    <div className='popup_content'>
                                        <h3>{selectedProduct.productName}</h3>
                                        <h3>${selectedProduct.productPrice}</h3>
                                        <h6>Available: <span>{selectedProduct.availability === "in-stock" ? "in-stock" : "out-of-stock"}</span></h6>
                                        <p>{selectedProduct.shortDescription}</p>
                                        <div className='d-flex flex-lg-row flex-column gap-3'>
                                            <div className='productCounter d-flex align-items-center gap-2'>
                                                <button onClick={removeProducts}><FontAwesomeIcon icon={faMinus} /></button>
                                                <input type="text" value={countProduct} onChange={handleInputChange} onBlur={handleBlur} />
                                                <button onClick={addProducts}><FontAwesomeIcon icon={faPlus} /></button>
                                            </div>
                                            <Link><button className='addCart_btn' onClick={() => handleAddToCart(selectedProduct, countProduct)} style={{ cursor: selectedProduct.availability === 'in-stock' ? 'pointer' : 'not-allowed' }} disabled={selectedProduct.availability !== 'in-stock'}>Add to cart</button></Link>

                                            <button className='favourite' onClick={() => addToWishlist(selectedProduct)}>
                                                <FontAwesomeIcon icon={faHeart} />
                                            </button>
                                        </div>
                                        <div className='otherInfo pt-3'>
                                            <h5>SKU: <span>{selectedProduct.sku}</span></h5>
                                            <h5>Categories: {selectedProduct.categories.map((category, index) => <span key={index}>{category}</span>)} </h5>
                                            <h5>Tags: {selectedProduct.tags.map((tag, index) => <span key={index}>{tag}</span>)} </h5>
                                        </div>
                                        <FontAwesomeIcon icon={faXmark} onClick={() => setOpen(false)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>

            <ToastContainer />
        </>
    );
};

export default AllProducts;

import React, { useState } from 'react';
import { preview1, product1 } from '../assets/images';
import { faArrowRight, faBagShopping, faHeart, faMinus, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SellingProducts } from '../data/data';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Link } from 'react-router';
import useGetProducts from '../utils/GetProducts';
import { scrollToTop } from '../utils/TopButton';
import { useCounter } from '../utils/CounterContext';


const Selling = () => {
    const [open, setOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleProductClick = (product) => {
        setSelectedProduct(product);
        setOpen(true);
        setCountProduct(1)
    };

    // product add remove counter
    const [countProduct, setCountProduct] = useState(1);

    console.log(countProduct)

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

    const { cart, setCart } = useCounter();
    const handleAddToCart = (product, quantity) => {
        const existingCart = JSON.parse(localStorage.getItem('cart')) || [];

        const addedQuantity = Math.max(1, Number(quantity));

        // Check if product already exists in the cart
        const existingProduct = existingCart.find(item => item.id === product.id);

        if (existingProduct) {
            // If product exists, update its quantity
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

        // Call increamentCart() multiple times based on the added quantity
        for (let i = 0; i < addedQuantity; i++) {
            increamentCart();
        }
    };

    // cart increamnet counter
    const { increamentCart, increamentHeart, increamentCart2, setCartCount, setHeartCount, addToWishlist, addToCart } = useCounter();

    return (
        <section id="selling">
            <div className="container">
                <h2 className='b_center'>Best Selling</h2>
                <Swiper
                    modules={[Pagination, A11y]}
                    spaceBetween={20}
                    slidesPerView={4}
                    navigation
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                    breakpoints={{
                        // Responsive settings for Swiper
                        320: { slidesPerView: 1 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 },
                    }}
                >
                    {SellingProducts.filter(product => [1, 2, 3, 4, 5].includes(product.id)).map((product, index) => (
                        <SwiperSlide key={index}>
                            <div>
                                <Link to={`/product-detail/${product.id}`} onClick={scrollToTop}>
                                    <div className="product_img">
                                        <img src={product.img} alt="product" />
                                        <div className="overlay">
                                            <div onClick={(e) => { handleProductClick(product); e.stopPropagation(); }}><Link><button><FontAwesomeIcon icon={faPlus} /></button></Link></div>
                                            <div onClick={(e) => e.stopPropagation()}><Link><button onClick={() => { addToCart(product); }} disabled={product.availability !== 'in-stock'} style={{ cursor: product.availability === 'in-stock' ? 'pointer' : 'not-allowed' }}><FontAwesomeIcon icon={faBagShopping} /></button></Link></div>
                                            <div onClick={(e) => e.stopPropagation()}><Link><button onClick={() => { addToWishlist(product); e.stopPropagation(); }}><FontAwesomeIcon icon={faHeart} /></button></Link></div>
                                        </div>
                                        {product.availability === "out-of-stock" && (
                                            <div className="stock">
                                                <h5>Out Of Stock</h5>
                                            </div>
                                        )}
                                        {product.sale && (
                                            <div className="sale d-flex flex-column gap-3">
                                                <span><h6>Sale</h6></span>
                                                <span><h6>{product.discount}</h6></span>
                                            </div>
                                        )}
                                    </div>
                                </Link>
                                <Link to={`/product-detail/${product.id}`} onClick={scrollToTop} ><h5>{product.productName}</h5></Link>
                                <h5>${Number(product.productPrice).toFixed(2)}</h5>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <Link to={"/products"}><button className='allProducts'>All Products <FontAwesomeIcon icon={faArrowRight} /></button></Link>
            </div>
            {
                open && selectedProduct && (
                    <div className='plus_popup d-flex align-items-center' onClick={() => setOpen(false)}>
                        <div className="container"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div>
                                <div className="row">
                                    <div className="col-sm-6 p-0">
                                        <div className='h-100 position-relative'>
                                            <Link to={`/product-detail/${selectedProduct.id}`} onClick={scrollToTop}><img src={selectedProduct.previewImg} alt="product" /></Link>
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
                                            <h3>$10.00</h3>
                                            <h6>Available: <span>{selectedProduct.availability === "in-stock" ? "in-stock" : "out-of-stock"}</span></h6>
                                            <p>{selectedProduct.shortDescription}</p>
                                            <div className='d-flex flex-lg-row flex-column gap-3'>
                                                <div className='productCounter d-flex align-items-center gap-2'>
                                                    <button onClick={() => removeProducts()}><FontAwesomeIcon icon={faMinus} /></button>
                                                    <input
                                                        type="text"
                                                        value={countProduct}
                                                        onChange={handleInputChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    <button onClick={() => addProducts()}><FontAwesomeIcon icon={faPlus} /></button>
                                                </div>
                                                <Link><button className='addCart_btn' onClick={() => handleAddToCart(selectedProduct, countProduct)} style={{ cursor: selectedProduct.availability === 'in-stock' ? 'pointer' : 'not-allowed' }} disabled={selectedProduct.availability !== 'in-stock'}>Add to cart</button></Link>
                                                <button className='favourite' onClick={() => { addToWishlist(selectedProduct); e.stopPropagation(); }}>
                                                    <FontAwesomeIcon icon={faHeart} />
                                                </button>
                                            </div>
                                            <div className='otherInfo pt-3'>
                                                <h5>SKU: <span>{selectedProduct.sku}</span></h5>
                                                <h5>SKU: {selectedProduct.categories.map((category, index) => <span key={index}>{category}</span>)} </h5>
                                                <h5>Tags: {selectedProduct.tags.map((tag, index) => <span key={index}>{tag}</span>)} </h5>
                                            </div>
                                            <FontAwesomeIcon icon={faXmark} onClick={() => setOpen(false)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </section>
    );
};

export default Selling;

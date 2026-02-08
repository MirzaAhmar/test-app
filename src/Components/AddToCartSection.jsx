import React, { useState } from 'react'
import useGetProducts from '../utils/GetProducts'
import { faHeart, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCounter } from '../utils/CounterContext'

const AddToCartSection = (props) => {
    const { product } = useGetProducts()

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

    const isAvailable = product.availability === "in-stock"

    // cart increament counter
    const { addToWishlist, setCart, increamentCart, } = useCounter();

    const handleAddToCart = (product, quantity) => {
        const existingCart = JSON.parse(localStorage.getItem('cart')) || [];

        // Convert quantity to a number and ensure it's at least 1
        const addedQuantity = Math.max(1, Number(quantity));

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

        // Update local storage and state
        setCart(existingCart);
        localStorage.setItem('cart', JSON.stringify(existingCart));

        for (let i = 0; i < addedQuantity; i++) {
            increamentCart();
        }
    };

    return (
        <section id='addCart'>
            <div className="container">
                <div className="row gap-md-0 gap-4">
                    <div className="col-md-6">
                        <div className='position-relative'>
                            <img src={product.previewImg} alt="productImg" />
                            {product.availability === "out-of-stock" && (
                                <div className="stock">
                                    <h5>Out Of Stock</h5>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div>
                            <div className='popup_content addCartContent'>
                                <h3>{product.productName}</h3>
                                <h3>$10.00</h3>
                                <p>{product.shortDescription}</p>
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
                                    <button className='addCart_btn' onClick={() => handleAddToCart(product, countProduct)} style={{ cursor: isAvailable ? "pointer" : "not-allowed" }} disabled={!isAvailable}>Add to cart</button>
                                    <button className='favourite' onClick={() => { addToWishlist(product); e.stopPropagation(); }}>
                                        <FontAwesomeIcon icon={faHeart} />
                                    </button>
                                </div>
                                <div className='d-flex flex-column gap-2 otherInfo pt-lg-5 pt-3'>
                                    <h5>SKU: <span>{product.sku}</span></h5>
                                    <h5>SKU: {product.categories.map((category, index) => <span key={index}>{category}</span>)} </h5>
                                    <h5>Tags: {product.tags.map((tag, index) => <span key={index}>{tag}</span>)} </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddToCartSection
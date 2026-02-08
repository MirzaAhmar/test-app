import React, { useEffect, useState } from 'react';
import { faArrowLeft, faMinus, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCounter } from '../../utils/CounterContext';
import { NoCart } from '../../Components/NoWishlist';
import Hero2 from '../../Components/Hero2';
import { Link } from 'react-router-dom';
import { scrollToTop } from '../../utils/TopButton';

const Cart = () => {
    const { cart, setCart } = useCounter();
    const { setCartCount, increamentCart, decreamentCart } = useCounter();

    // Load cart from localStorage
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];

        // Ensure each item has a quantity property
        const updatedCart = savedCart.map(item => ({
            ...item,
            quantity: item.quantity || 1,
        }));

        setCart(updatedCart);
    }, []);

    const updateQuantity = (id, change) => {
        const updatedCart = cart.map((item) => {
            if (item.id === id) {
                const newQuantity = Math.max(1, (Number(item.quantity) || 1) + change); // Ensure quantity is always at least 1
                const newPrice = Number(item.productPrice) || 0;

                // Call functions based on the change (increment or decrement)
                if (change > 0) {
                    increamentCart();
                } else if (change < 0 && item.quantity > 1) {
                    decreamentCart(); // Call example2 function for decrement only if quantity is more than 0
                }

                return {
                    ...item,
                    quantity: newQuantity,
                    totalPrice: newQuantity * newPrice
                };
            }
            return item;
        });

        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };
    // handle manual input 
    const handleQuantityChange = (id, value) => {
        const updatedCart = cart.map((item) => {
            if (item.id === id) {
                const oldQuantity = Number(item.quantity) || 1;
                const newQuantity = Math.max(1, Number(value));
                const newPrice = Number(item.productPrice) || 0;

                // Quantity change ka difference nikalna hai
                const quantityDiff = newQuantity - oldQuantity;

                if (quantityDiff > 0) {
                    for (let i = 0; i < quantityDiff; i++) {
                        increamentCart();
                    }
                }
                else if (quantityDiff < 0) {
                    for (let i = 0; i < Math.abs(quantityDiff); i++) {
                        decreamentCart();
                    }
                }

                return {
                    ...item,
                    quantity: newQuantity,
                    totalPrice: newQuantity * newPrice
                };
            }
            return item;
        });

        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };


    // Function to remove product from cart
    const removeFromCart = (id) => {
        const productToRemove = cart.find((item) => item.id === id);

        if (productToRemove) {
            for (let i = 0; i < productToRemove.quantity; i++) {
                decreamentCart();
            }
        }

        const updatedCart = cart.filter((item) => item.id !== id);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));

        if (updatedCart.length === 0) setCartCount(0);
    };

    // Function to clear entire cart
    const clearCart = () => {
        setCart([]);
        localStorage.setItem('cart', JSON.stringify([]));
        setCartCount(0);
    };

    // Fixing subtotal calculation
    const subtotal = cart.reduce((acc, product) => {
        const quantity = Number(product.quantity) || 1; // Ensure valid number
        const price = Number(product.productPrice) || 0; //
        return acc + (price * quantity);
    }, 0);

    const total = subtotal;

    return (
        <>
            <Hero2 heading="Cart" />
            <section>
                <div className="container">
                    {cart.length > 0 ? (
                        <>
                            <div className='wishlist_table cart_table'>
                                <table className="product-table">
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Unit Price</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cart.map((product) => (
                                            <tr key={product.id}>
                                                <td className='d-flex align-items-center gap-3'>
                                                    <img src={product.img} alt="wishlistImg" />
                                                    {product.productName}
                                                </td>
                                                <td>${Number(product.productPrice).toFixed(2)}</td>
                                                <td>
                                                    <div className='productCounter d-flex align-items-center gap-2'>
                                                        <button onClick={() => updateQuantity(product.id, -1)}>
                                                            <FontAwesomeIcon icon={faMinus} />
                                                        </button>
                                                        <input
                                                            type="number"
                                                            value={product.quantity}
                                                            onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                                                            min="1"
                                                        />
                                                        <button onClick={() => updateQuantity(product.id, 1)}>
                                                            <FontAwesomeIcon icon={faPlus} />
                                                        </button>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div>
                                                        ${Number(product.productPrice * product.quantity).toFixed(2)}
                                                        <button className='ms-4 bg-transparent' onClick={() => removeFromCart(product.id)}>
                                                            <FontAwesomeIcon icon={faXmark} />
                                                        </button>
                                                    </div>
                                                </td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div>
                                    <Link to="/products">
                                        <button><FontAwesomeIcon icon={faArrowLeft} /> Continue Shopping</button>
                                    </Link>
                                    <button className='clearBtn' onClick={clearCart}>Clear cart</button>
                                </div>
                                <div className='coupon mt-5'>
                                    <div className="row justify-content-between gap-md-0 gap-4">
                                        <div className="col-md-4">
                                            <div>
                                                <h4>Coupon Discount</h4>
                                                <p>Enter your coupon code if you have one.</p>
                                                <form>
                                                    <input type="text" placeholder='Coupon code' />
                                                    <button>Apply coupon</button>
                                                </form>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div>
                                                <div className='cartTotal'>
                                                    <div>
                                                        <h5>Subtotal:</h5>
                                                        <h5>${subtotal.toFixed(2)}</h5>
                                                    </div>
                                                    <div>
                                                        <h5>Total:</h5>
                                                        <h5>${total.toFixed(2)}</h5>
                                                    </div>
                                                </div>
                                                <Link to="/checkout" onClick={() => scrollToTop()}>Proceed to checkout</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <NoCart cartTitle="Your cart is currently empty." />
                    )}
                </div>
            </section>
        </>
    );
};

export default Cart;

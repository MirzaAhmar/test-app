import React, { useEffect, useState } from 'react'
import Hero2 from '../../Components/Hero2'
import NoWishlist from '../../Components/NoWishlist'

import './Wishlist.css'
import './WishlistResponsive.css'
import { useCounter } from '../../utils/CounterContext'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ToastContainer } from 'react-toastify'

const Wishlist = () => {

    const [wishlist, setWishlist] = useState([]);
    const { setHeartCount } = useCounter()

    useEffect(() => {
        const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        setWishlist(savedWishlist);

        // Set heartCount to 0 when wishlist is empty
        if (savedWishlist.length === 0) {
            setHeartCount(0);
        }
    }, [setHeartCount]);

    const removeFromWishlist = (id) => {
        const updatedWishlist = wishlist.filter((item) => item.id !== id);
        setWishlist(updatedWishlist);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));

        // Set heartCount to 0 if wishlist is empty after removal
        if (updatedWishlist.length === 0) {
            setHeartCount(0);
        }
    };

    // clear wishlist button
    const clearWishlist = () => {
        setWishlist([]);
        localStorage.setItem('wishlist', JSON.stringify([]));
        setHeartCount(0);
    }

    return (
        <>
            {/* ====== 2.1 Hero section ======  */}
            <Hero2 heading="Wishlist" />
            {/* ====== 2.1 Hero section ======  */}

            {/* ====== 5.1 No Wishlist section ======  */}
            <div className="container">

                {wishlist.length > 0 ? (
                    <>
                        <div className='wishlist_table'>
                            <table className="product-table">
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Unit Price</th>
                                        <th>Buy Now</th>
                                        <th>Remove</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {wishlist.map((product) => (
                                        <tr key={product.id}>
                                            <td className='d-flex align-items-center gap-3'>
                                                <img src={product.img} alt="wishlistImg" />
                                                {product.productName}
                                            </td>
                                            <td>${Number(product.productPrice).toFixed(2)}</td>
                                            <td>
                                                <button className="buy-now-btn">Buy Now</button>
                                            </td>
                                            <td>
                                                <button className='ms-4 bg-transparent' onClick={() => { removeFromWishlist(product.id); }}><FontAwesomeIcon icon={faXmark} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button className='clearBtn' onClick={() => clearWishlist()} >Clear wishlist</button>
                        </div>
                    </>
                ) : (
                    <NoWishlist />
                )}
            </div>
            <ToastContainer />
            {/* ====== End 5.1 No Wishlist section ======  */}
        </>
    )
}

export default Wishlist;
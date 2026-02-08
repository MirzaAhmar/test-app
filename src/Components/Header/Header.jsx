import React, { useState, useEffect } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faBars, faChevronDown, faHeart, faMagnifyingGlass, faUser, faXmark } from '@fortawesome/free-solid-svg-icons';
import './Header.css';
import { Logo, product1 } from '../../assets/images/index.js';
import { useCounter } from '../../utils/CounterContext.jsx';
import { faFacebookF, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { scrollToTop } from '../../utils/TopButton.js';

const Header = (props) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [navSearch, setNavSearch] = useState("");

    // cart increment counter
    const { heartCount, cartCount } = useCounter();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const searchSubmit = (e) => {
        e.preventDefault();
    };

    // checkout sidebar
    const [isCheckoutOpen, setIsCheckoutOpen] = useState("close");

    // menu sidebar
    const [isMenuOpen, setIsMenuOpen] = useState("close");



    const { cart, setCart } = useCounter();
    const { setCartCount, increamentCart, decreamentCart } = useCounter();


    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];

        // Ensure each item has a quantity property
        const updatedCart = savedCart.map(item => ({
            ...item,
            quantity: item.quantity || 1,  // default quantity to 1
        }));

        setCart(updatedCart);
    }, []);

    const updateQuantity = (id, change) => {
        const updatedCart = cart.map((item) => {
            if (item.id === id) {
                const newQuantity = Math.max(1, (Number(item.quantity) || 1) + change);
                const newPrice = Number(item.productPrice) || 0;

                // Call functions based on the change (increment or decrement)
                if (change > 0) {
                    increamentCart(); // Call example function for increment
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
    // Function to handle manual input change
    const handleQuantityChange = (id, value) => {
        const updatedCart = cart.map((item) => {
            if (item.id === id) {
                const oldQuantity = Number(item.quantity) || 1; // Pehle wali quantity
                const newQuantity = Math.max(1, Number(value)); // Nai wali quantity
                const newPrice = Number(item.productPrice) || 0;

                const quantityDiff = newQuantity - oldQuantity;

                if (quantityDiff > 0) {
                    for (let i = 0; i < quantityDiff; i++) {
                        increamentCart();
                    }
                }
                // Agar quantity decrease hui hai to decreamentCart() multiple times call hoga
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

    // 🛠 Fixing subtotal calculation (removing undefined variable `countProduct`)
    const subtotal = cart.reduce((acc, product) => {
        const quantity = Number(product.quantity) || 1;
        const price = Number(product.productPrice) || 0;
        return acc + (price * quantity);
    }, 0);

    const total = subtotal;

    let [pagesDropdown, setPagesDropdown] = useState(false);

    const toggleInnerDropdown = () => {
        setPagesDropdown(!pagesDropdown);
    };

    const [openDropdown, setOpenDropdown] = useState(null);

    const toggleDropdown = (dropdownName) => {
        setOpenDropdown(prev => prev === dropdownName ? null : dropdownName);
    };

    return (
        <>
            <header className={`${props.position} ${isScrolled ? 'scrolled' : ''}`}>
                <nav className="navbar navbar-expand-lg">
                    <div className="container">
                        <div className='navSearch'>
                            <form onSubmit={searchSubmit}>
                                <input
                                    type="text"
                                    placeholder='Search Anything...'
                                    name='search'
                                    value={navSearch}
                                    onChange={(e) => setNavSearch(e.target.value)}
                                />
                                <button type='submit'>
                                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                                </button>
                            </form>
                        </div>

                        <Link to={"/"}>
                            <img src={Logo} alt="Logo" />
                        </Link>

                        <div className='navIcons d-flex align-items-center gap-sm-4 gap-3'>
                            <Link to={"/auth"}>
                                <span>
                                    <FontAwesomeIcon icon={faUser} />
                                </span>
                            </Link>
                            <Link to={"/wishlist"}>
                                <span className='position-relative hover-effect'>
                                    <FontAwesomeIcon icon={faHeart} />
                                    <div className='counter'><h6>{heartCount}</h6></div>
                                </span>
                            </Link>
                            <span className='position-relative hover-effect' onClick={() => setIsCheckoutOpen("open")}>
                                <FontAwesomeIcon icon={faBagShopping} />
                                <div className='counter'><h6>{cartCount}</h6></div>
                            </span>
                            <span onClick={() => setIsMenuOpen("open")}>
                                <FontAwesomeIcon icon={faBars} />
                            </span>
                        </div>
                    </div>
                </nav>
            </header>
            <aside className={`checkout_sidebar ${isCheckoutOpen === 'open' ? 'checkoutOpen' : ''}`}>
                <FontAwesomeIcon icon={faXmark} onClick={() => setIsCheckoutOpen("close")} />
                {cart.length > 0 ? (
                    <>
                        <ul>
                            {cart.map((product, index) => (
                                <li key={index}>
                                    <Link><img src={product.img} alt="checkoutImg" /></Link>
                                    <div>
                                        <h6>{product.productName}</h6>
                                        <h6>Qty: <span>{product.quantity}</span></h6>
                                        <h6>price: <span>${product.productPrice}</span></h6>
                                    </div>
                                    <FontAwesomeIcon icon={faXmark} onClick={() => removeFromCart(product.id)} />
                                </li>
                            ))}
                        </ul>
                        <div className='d-flex justify-content-between'>
                            <h3>Subtotal:</h3>
                            <h3>${subtotal.toFixed(2)}</h3>
                        </div>
                        <div>
                            <Link to={"/cart"}><button onClick={() => { setIsCheckoutOpen('close'); scrollToTop() }} >View cart</button></Link>
                            <Link to={"/checkout"}><button className='checkoutBtn' onClick={() => { setIsCheckoutOpen('close'); scrollToTop() }}>Checkout</button></Link>
                        </div>
                    </>
                ) : (
                    <h4 className='pt-5'>Your cart is currently empty.</h4>
                )}

            </aside>

            <aside className={`menubar ${isMenuOpen === 'open' ? 'checkoutOpen' : ''}`}>
                <FontAwesomeIcon icon={faXmark} onClick={() => setIsMenuOpen("close")} />
                <ul>
                    <li>
                        <Link to='/' onClick={() => { setIsMenuOpen('close'); scrollToTop() }}>Home</Link>
                    </li>
                    <li>
                        <Link to='#' onClick={() => toggleDropdown('products')} className='d-flex justify-content-between align-items-center'>
                            Products <FontAwesomeIcon icon={faChevronDown} className={`${openDropdown === 'products' && "sideArrow"}`} />
                        </Link>
                        {openDropdown === 'products' && (
                            <ul className="dropdown-list pt-2">
                                <li><Link to='/products' onClick={() => { setIsMenuOpen('close'); scrollToTop() }}>Products</Link></li>
                                <li>
                                    <Link to='#' onClick={toggleInnerDropdown} className='d-flex justify-content-between align-items-center'>
                                        Products Related <FontAwesomeIcon icon={faChevronDown} className={`${pagesDropdown && "sideArrow"}`} />
                                    </Link>
                                    {pagesDropdown && (
                                        <ul className="dropdown-list pt-2">
                                            <li><Link to='/cart' onClick={() => { setIsMenuOpen('close'); scrollToTop() }} >Cart</Link></li>
                                            <li><Link to='/checkout' onClick={() => { setIsMenuOpen('close'); scrollToTop() }}>Checkout</Link></li>
                                            <li><Link to='/auth' onClick={() => { setIsMenuOpen('close'); scrollToTop() }}>Auth</Link></li>
                                            <li><Link to='/wishlist' onClick={() => { setIsMenuOpen('close'); scrollToTop() }}>Wishlist</Link></li>
                                        </ul>
                                    )}
                                </li>
                            </ul>
                        )}
                    </li>
                    <li>
                        <Link to='#' onClick={() => toggleDropdown('pages')} className='d-flex justify-content-between align-items-center'>
                            Pages <FontAwesomeIcon icon={faChevronDown} className={`${openDropdown === 'pages' && "sideArrow"}`} />
                        </Link>
                        {openDropdown === 'pages' && (
                            <ul className="dropdown-list pt-2">
                                <li><Link to='/about' onClick={() => { setIsMenuOpen('close'); scrollToTop() }}>About Us</Link></li>
                                <li><Link to='/contact' onClick={() => { setIsMenuOpen('close'); scrollToTop() }}>Contact</Link></li>
                                <li><Link to='/faq' onClick={() => { setIsMenuOpen('close'); scrollToTop() }}>FAQ Page</Link></li>
                                <li><Link to='/comingsoon' onClick={() => { setIsMenuOpen('close'); scrollToTop() }}>Coming Soon</Link></li>
                            </ul>
                        )}
                    </li>
                    <li>
                        <Link to='/blogs' onClick={() => { setIsMenuOpen('close'); scrollToTop() }}>Blogs</Link>
                    </li>
                </ul>
                <div className='socialIcons d-flex align-items-center gap-4 mt-5 pt-5'>
                    <h5>Follow us on social</h5>
                    <Link onClick={() => { setIsMenuOpen('close'); scrollToTop() }}><FontAwesomeIcon icon={faFacebookF} /></Link>
                    <Link onClick={() => { setIsMenuOpen('close'); scrollToTop() }}><FontAwesomeIcon icon={faXTwitter} /></Link>
                    <Link onClick={() => { setIsMenuOpen('close'); scrollToTop() }}><FontAwesomeIcon icon={faInstagram} /></Link>
                </div>
            </aside>

            <div className={`checkOutOverlay ${isCheckoutOpen === 'open' ? 'checkoutOpen' : ''} ${isMenuOpen === 'open' ? 'checkoutOpen' : ''}`} onClick={() => { setIsCheckoutOpen("close"); setIsMenuOpen("close") }} ></div>
        </>
    );
};

export default Header;

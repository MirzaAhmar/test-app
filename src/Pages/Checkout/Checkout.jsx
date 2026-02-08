import React, { useState } from 'react';
import Hero2 from '../../Components/Hero2';
import './Checkout.css';
import './CheckoutResponsive.css';
import { Link } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import { NoCart } from '../../Components/NoWishlist';
import { useCounter } from '../../utils/CounterContext';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Checkout = () => {
    const [checkoutData, setCheckoutData] = useState({
        firstname: '',
        lastname: '',
        company: '',
        address: '',
        house: '',
        city: '',
        postal: '',
        phone: '',
        email: '',
        notes: '',
    });

    const [country, setCountry] = useState('');
    const [district, setDistrict] = useState('');
    const [errors, setErrors] = useState({});

    // select field handling
    const handleCountry = (event) => {
        setCountry(event.target.value);
        setErrors({ ...errors, country: '' });
    };

    const handleDistrict = (event) => {
        setDistrict(event.target.value);
        setErrors({ ...errors, district: '' });
    };

    // form handling
    const checkoutHandle = (e) => {
        setCheckoutData({ ...checkoutData, [e.target.name]: e.target.value });

        setErrors({ ...errors, [e.target.name]: '' });
    };

    // form validation
    const validateForm = () => {
        let newErrors = {};

        if (!checkoutData.firstname.trim()) newErrors.firstname = 'First name is required.';
        if (!checkoutData.lastname.trim()) newErrors.lastname = 'Last name is required.';
        if (!checkoutData.address.trim()) newErrors.address = 'Address is required.';
        if (!checkoutData.city.trim()) newErrors.city = 'City is required.';
        if (!checkoutData.phone.trim()) newErrors.phone = 'Phone is required.';
        if (!checkoutData.email.trim()) newErrors.email = 'Email is required.';
        else if (!/\S+@\S+\.\S+/.test(checkoutData.email)) newErrors.email = 'Invalid email format.';
        if (!country.trim()) newErrors.country = 'Country is required.';
        if (!district.trim()) newErrors.district = 'District is required.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            toast.success('Form submitted successfully!')
        }
    };

    const { cart, setCart } = useCounter();
    const subtotal = cart.reduce((acc, product) => {
        const quantity = Number(product.quantity) || 1; // Ensure valid number
        const price = Number(product.productPrice) || 0; //
        return acc + (price * quantity);
    }, 0);

    const total = subtotal;

    // toggle coupon form
    const [coupon, setCoupon] = useState(false);
    console.log(coupon)

    return (
        <>
            <Hero2 heading={"Checkout"} />

            <section id='checkout'>
                <div className="container">
                    {cart.length > 0 ? (
                        <form onSubmit={handleSubmit}>
                            <div className="row gap-md-0 gap-4">
                                <div className="col-md-7">
                                    <h5>Billing Details</h5>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div>
                                                <label htmlFor="firstname">First name *</label>
                                                <input
                                                    type="text"
                                                    name="firstname"
                                                    id="firstname"
                                                    value={checkoutData.firstname}
                                                    onChange={checkoutHandle}
                                                    className={errors.firstname ? 'error-border' : ''}
                                                />
                                                {errors.firstname && <p className="error-text">{errors.firstname}</p>}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div>
                                                <label htmlFor="lastname">Last name *</label>
                                                <input
                                                    type="text"
                                                    name="lastname"
                                                    id="lastname"
                                                    value={checkoutData.lastname}
                                                    onChange={checkoutHandle}
                                                    className={errors.lastname ? 'error-border' : ''}
                                                />
                                                {errors.lastname && <p className="error-text">{errors.lastname}</p>}
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="company">Company name (optional)</label>
                                        <input type="text" name="company" id="company" value={checkoutData.company} onChange={checkoutHandle} />
                                    </div>
                                    <div>
                                        <label htmlFor="country">Country *</label>
                                        <select id="country" value={country} onChange={handleCountry} className={errors.country ? 'error-border' : ''}>
                                            <option value="">Select Country</option>
                                            <option value="australia">Australia</option>
                                            <option value="romania">Romania</option>
                                            <option value="mexico">Mexico</option>
                                            <option value="canada">Canada</option>
                                            <option value="bangladesh">Bangladesh</option>
                                        </select>
                                        {errors.country && <p className="error-text">{errors.country}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="address">Street address *</label>
                                        <div className="d-flex flex-column gap-4">
                                            <input
                                                type="text"
                                                placeholder="House number and street name"
                                                name="address"
                                                id="address"
                                                value={checkoutData.address}
                                                onChange={checkoutHandle}
                                                className={errors.address ? 'error-border' : ''}
                                            />
                                            <input type="text" placeholder="Apartment, suite, unit etc. (optional)" name="house" value={checkoutData.house} onChange={checkoutHandle} />
                                            {errors.address && <p className="error-text">{errors.address}</p>}
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="city">Town / City *</label>
                                        <input
                                            type="text"
                                            id="city"
                                            name="city"
                                            value={checkoutData.city}
                                            onChange={checkoutHandle}
                                            className={errors.city ? 'error-border' : ''}
                                        />
                                        {errors.city && <p className="error-text">{errors.city}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="district">District *</label>
                                        <select id="district" value={district} onChange={handleDistrict} className={errors.district ? 'error-border' : ''}>
                                            <option value="">Select District</option>
                                            <option value="sydney">Sydney</option>
                                            <option value="brisbane">Brisbane</option>
                                            <option value="adelaide">Adelaide</option>
                                            <option value="hobart">Hobart</option>
                                            <option value="melbourne">Melbourne</option>
                                        </select>
                                        {errors.district && <p className="error-text">{errors.district}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="postal">Postcode / ZIP (optional)</label>
                                        <input type="text" id="postal" name="postal" value={checkoutData.postal} onChange={checkoutHandle} />
                                    </div>
                                    <div>
                                        <label htmlFor="phone">Phone *</label>
                                        <input
                                            type="text"
                                            id="phone"
                                            name="phone"
                                            value={checkoutData.phone}
                                            onChange={checkoutHandle}
                                            className={errors.phone ? 'error-border' : ''}
                                        />
                                        {errors.phone && <p className="error-text">{errors.phone}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="email">Email Address *</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={checkoutData.email}
                                            onChange={checkoutHandle}
                                            className={errors.email ? 'error-border' : ''}
                                        />
                                        {errors.email && <p className="error-text">{errors.email}</p>}
                                    </div>
                                    <h5 className="pt-4">Additional information</h5>
                                    <div>
                                        <label htmlFor="notes">Order notes (optional)</label>
                                        <textarea name="notes" id="notes" rows={8} value={checkoutData.notes} onChange={checkoutHandle}></textarea>
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div>
                                        <div className='showCoupon d-flex flex-md-row flex-column align-items-md-center gap-2'>
                                            <FontAwesomeIcon icon={faCheck} /> <h5>Have a coupon?</h5> <button type='button' onClick={(e) => { setCoupon(!coupon); e.stopPropagation() }}>Click here to enter your code</button>
                                        </div>
                                        {coupon ? <div className='coupanForm'>
                                            <p>If you have a coupon code, please apply it below.</p>
                                            <form>
                                                <input type="text" placeholder='Coupon code' />
                                                <button type='submit'>Apply Coupon</button>
                                            </form>
                                        </div> : null}
                                        <div className='checkOrder'>
                                            <h4>Your order</h4>
                                            <div>
                                                <h5>Product</h5>
                                                <h5>Total</h5>
                                            </div>
                                            {cart.map((product, index) => (
                                                <div key={index}>
                                                    <p>{product.productName}	</p>
                                                    <p>${Number(product.productPrice).toFixed(2)}</p>
                                                </div>
                                            ))}
                                            <div>
                                                <h6>Subtotal</h6>
                                                <p>${subtotal.toFixed(2)}</p>
                                            </div>
                                            <div className='mb-4'>
                                                <h6>Total</h6>
                                                <p>${total.toFixed(2)}</p>
                                            </div>
                                            <h4>Check payments</h4>
                                            <p className='mb-4'>Please send a check to Store Name, Store Street, Store Town, Store State / County, Store Postcode.</p>
                                            <h4>What is PayPal?</h4>
                                            <p>Pay via PayPal; you can pay with your credit card if you don’t have a PayPal account.</p>
                                        </div>
                                        <p className='policy'>Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <Link>privacy policy.</Link></p>
                                        <button type='submit'>Place Order</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    ) : (
                        <NoCart cartTitle="No items found in cart to checkout" />
                    )}
                </div>
            </section>
            <ToastContainer />
        </>
    );
};

export default Checkout;


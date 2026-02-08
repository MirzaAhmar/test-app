import React from 'react'
import { createBrowserRouter } from 'react-router'
import Layout from './Layout/Layout'
import Home from './Pages/Home/Home'
import About from './Pages/About/About'
import ProductDetails from './Pages/ProductDetails/ProductDetails'
import Auth from './Pages/Auth/Auth'
import Wishlist from './Pages/Wishlist/Wishlist'
import Cart from './Pages/Cart/Cart'
import Checkout from './Pages/Checkout/Checkout'
import Contact from './Pages/Contact/Contact'
import Faq from './Pages/Faq/Faq'
import ComingSoon from './Pages/ComingSoon/ComingSoon'
import AllProducts from './Pages/Product/AllProducts'
import AllBlogs from './Pages/AllBlogs/AllBlogs'
import BlogDetails from './Pages/AllBlogs/BlogDetails'

export const Routers = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "/", element: <Home /> },
            { path: '/about', element: <About /> },
            { path: '/product-detail/:id', element: <ProductDetails /> },
            { path: '/auth', element: <Auth /> },
            { path: '/wishlist', element: <Wishlist /> },
            { path: '/cart', element: <Cart /> },
            { path: '/checkout', element: <Checkout /> },
            { path: '/contact', element: <Contact /> },
            { path: '/faq', element: <Faq /> },
            { path: '/comingsoon', element: <ComingSoon /> },
            { path: '/products', element: <AllProducts /> },
            { path: '/blogs', element: <AllBlogs /> },
            { path: '/blog-detail/:id', element: <BlogDetails /> },
        ]
    },
])
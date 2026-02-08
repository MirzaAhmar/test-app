import React from 'react'
import Header from '../Components/Header/Header'
import { Outlet, useLocation } from 'react-router'
import Footer from '../Components/Footer'

const Layout = () => {

    const location = useLocation();
    const position = location.pathname === "/" ? "position-absolute" : "";
    return (
        <>
            {/* ====== 1.1 Header section ======  */}
            <Header position={position} />
            {/* ====== End 1.1 Header section ======  */}

            <Outlet />

            {/* ====== 1.8 Footer section ======  */}
            <Footer />
            {/* ====== End 1.8 Footer section ======  */}
        </>
    )
}

export default Layout
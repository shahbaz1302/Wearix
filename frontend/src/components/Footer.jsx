import { useContext, useEffect, useState } from "react"
import { assets } from "../assets/assets"
import { ShopContext } from "../context/ShopContext"
import { NavLink } from "react-router-dom"

const Footer = () => {
    const{theme}=useContext(ShopContext)

    return (
        <div>
            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 sm:mt-40 text-sm">
                <div>
                    <img src={theme === "light" ? assets.logo : assets.logo_dark} className="mb-5 w-32" alt="Logo" />
                    <p className="w-full md:w-2/3 --footer-text">
                        Wearix brings you modern, trend-driven fashion with a focus on quality, comfort, and affordability.
                        We’re here to help you express your style effortlessly with collections made for everyday confidence.
                    </p>
                </div>

                <div>
                    <p className="text-xl font-medium mb-5">COMPANY</p>
                    <ul className="flex flex-col gap-1 --footer-text">
                        <NavLink to="/"><li>Home</li></NavLink>
                        <NavLink to="/about"><li>About Us</li></NavLink>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>

                <div>
                    <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
                    <ul className="flex flex-col gap-1 --footer-text">
                        <li>+91 9058931071</li>
                        <li>contact@wearix.com</li>
                    </ul>
                </div>
            </div>

            <div>
                <hr />
                <p className="py-5 text-sm text-center">Copyright 2026@ wearix.com - All Rights Reserved.</p>
            </div>
        </div>
    )
}

export default Footer
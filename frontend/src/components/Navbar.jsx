import { useContext, useEffect, useRef, useState } from "react"
import { assets } from "../assets/assets"
import { Link, NavLink, useLocation } from "react-router-dom"
import { FiMoon, FiSun, FiX } from "react-icons/fi";
import { ShopContext } from "../context/ShopContext";
import { PiHandbag } from "react-icons/pi";
import { RxPerson } from "react-icons/rx";
import { IoSearchOutline, IoCloseOutline } from "react-icons/io5";
import { TbMenuDeep } from "react-icons/tb";
import axios from "axios"
import toast from "react-hot-toast"
import { useAuthStore } from "../context/authStore"

const Navbar = () => {
    const [visible, setVisible] = useState(false)
    const [showLogo, setShowLogo] = useState(true)
    const [searchExpanded, setSearchExpanded] = useState(false);
    const [mobileProfileOpen, setMobileProfileOpen] = useState(false);
    const { showSearch, setShowSearch, search, setSearch, theme, setTheme, getCartCount, navigate, setCartItems } = useContext(ShopContext)
    const { logout, isAuthenticated, checkAuth } = useAuthStore();
    const inputRef = useRef(null);
    const location = useLocation();

    const logoutUser = async () => {
        try {
            await logout()
            setCartItems({})
            navigate("/login")
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || error.message);
        }
    }

    const handleOpenSearch = () => {
        setSearchExpanded(true);
        setShowSearch(true);
        if (window.innerWidth < 1024) {
            setShowLogo(false);
        }
        if (!location.pathname.includes("collection")) {
            navigate("/collection");
        }
    };

    const handleCloseSearch = () => {
        setSearchExpanded(false);
        setShowSearch(false);
        setSearch("");
        setShowLogo(true)
    };

    const handleProfileClick = () => {
        const isMobile = window.innerWidth < 640;

        if (isMobile) {
            if (isAuthenticated) {
                setMobileProfileOpen((prev) => !prev);
            }
            return;
        }

        if (!isAuthenticated) {
            navigate("/login");
        }
    };

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    useEffect(() => {
        if (searchExpanded) {
            inputRef.current?.focus();
        }
    }, [searchExpanded]);

    useEffect(() => {
        if (!location.pathname.includes("collection")) {
            setSearchExpanded(false);
            setShowSearch(false);
            setSearch("");
        }
    }, [location.pathname, setSearch, setShowSearch]);

    return (
        <div className="flex items-center justify-between py-5 font-medium">
            <Link to="/" className={`${showLogo ? "flex" : "hidden"} items-center transition-all duration-200`}><img src={theme === "light" ? assets.logo : assets.logo_dark} className="w-36" alt="Logo" /></Link>

            <ul className={`hidden sm:flex gap-5 text-sm var(--text-color)`}>
                <NavLink to="/" className="flex flex-col items-center gap-1">
                    <p>HOME</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-(--text-color) hidden" />
                </NavLink>
                <NavLink to="/collection" className="flex flex-col items-center gap-1">
                    <p>COLLECTION</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-(--text-color) hidden" />
                </NavLink>
                <NavLink to="/about" className="flex flex-col items-center gap-1">
                    <p>ABOUT</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-(--text-color) hidden" />
                </NavLink>
                <NavLink to="/contact" className="flex flex-col items-center gap-1">
                    <p>CONTACT</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-(--text-color) hidden" />
                </NavLink>
            </ul>

            <div className="flex items-center gap-3 sm:gap-6">
                <div className="flex items-center gap-3 sm:gap-5">
                    {location.pathname.includes("collection") && (
                        <div
                            className={`flex items-center overflow-hidden transition-all duration-300 ease-in-out
              ${searchExpanded ? "w-55 sm:w-64 px-3 py-2 rounded-full border border-gray-300" : "w-10 px-2 py-2"}`}
                        >
                            <button
                                type="button"
                                onClick={handleOpenSearch}
                                className="flex shrink-0 items-center justify-center"
                                aria-label="Open search"
                            >
                                <IoSearchOutline className="w-6 h-6" />
                            </button>

                            <input
                                ref={inputRef}
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search products..."
                                className={`ml-2 bg-transparent text-md --text-color outline-none transition-all duration-200
                ${searchExpanded ? "w-full opacity-100" : "w-0 opacity-0"}`}
                            />

                            {searchExpanded && (
                                <button
                                    type="button"
                                    onClick={handleCloseSearch}
                                    className="ml-2 flex shrink-0 items-center justify-center"
                                    aria-label="Close search"
                                >
                                    <IoCloseOutline className="w-6 h-6" />
                                </button>
                            )}
                        </div>
                    )}
                    <div className="group relative">
                        <RxPerson
                            onClick={handleProfileClick}
                            className="w-6 h-6 cursor-pointer"
                        />

                        {isAuthenticated && (
                            <>
                                <div className="hidden sm:group-hover:block sm:absolute dropdown-menu right-0 pt-4 z-20">
                                    <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                                        <p onClick={() => navigate("/profile")} className="cursor-pointer hover:text-black">
                                            My Profile
                                        </p>
                                        <p onClick={() => navigate("/wishlist")} className="cursor-pointer hover:text-black">
                                            My Wishlist
                                        </p>
                                        <p onClick={logoutUser} className="cursor-pointer hover:text-black">
                                            Logout
                                        </p>
                                    </div>
                                </div>

                                {mobileProfileOpen && (
                                    <div className="absolute right-0 top-8 z-20 w-36 rounded bg-slate-100 px-5 py-3 text-gray-500 shadow sm:hidden">
                                        <p
                                            onClick={() => {
                                                navigate("/profile");
                                                setMobileProfileOpen(false);
                                            }}
                                            className="cursor-pointer hover:text-black"
                                        >
                                            My Profile
                                        </p>
                                        <p
                                            onClick={() => {
                                                navigate("/wishlist");
                                                setMobileProfileOpen(false);
                                            }}
                                            className="cursor-pointer hover:text-black"
                                        >
                                            My Wishlist
                                        </p>
                                        <p
                                            onClick={() => {
                                                logoutUser();
                                                setMobileProfileOpen(false);
                                            }}
                                            className="cursor-pointer hover:text-black"
                                        >
                                            Logout
                                        </p>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                    <Link to="/cart" className="relative">
                        <PiHandbag className="w-6 h-6 min-w-5" />
                        <p className={`absolute -right-1.25 -bottom-1.25 w-4 text-center ${theme === "light" ? "bg-black text-white" : "bg-white text-black"} leading-4  transition-colors duration-350 aspect-square rounded-full text-[8px]`}>{getCartCount()}</p>
                    </Link>
                    <TbMenuDeep onClick={() => setVisible(true)} className="w-6 h-6 cursor-pointer sm:hidden" />
                    <button className="hover:rotate-15 hover:scale-110 transition-all duration-300 cursor-pointer" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>{theme === "light" ? <FiMoon className="w-6 h-6" /> : <FiSun className="w-6 h-6" />}</button>
                </div>

                {/* SideBar Menu for Small Screen */}
                <div className={`absolute top-0 right-0 bottom-0 overflow-hidden z-50 bg-white transition-all duration-200 ${visible ? "w-3/4 " : "w-0"}`}>
                    <div className="flex flex-col text-gray-600">
                        <div onClick={() => setVisible(false)} className="flex items-center gap-4 p-3 cursor-pointer">
                            <FiX className="h-4 rotate-180" />
                        </div>
                        <ul className="flex flex-col items-center justify-center">
                            <NavLink onClick={() => setVisible(false)} className="py-2 pl-6" to="/">
                                <p>HOME</p>
                                <hr className="w-2/4 mx-auto border-none h-[1.5px] bg-gray-700 hidden" />
                            </NavLink>
                            <NavLink onClick={() => setVisible(false)} className="py-2 pl-6" to="/collection">
                                <p>COLLECTION</p>
                                <hr className="w-2/4 mx-auto border-none h-[1.5px] bg-gray-700 hidden" />
                            </NavLink>
                            <NavLink onClick={() => setVisible(false)} className="py-2 pl-6" to="/about">
                                <p>ABOUT</p>
                                <hr className="w-2/4 mx-auto border-none h-[1.5px] bg-gray-700 hidden" />
                            </NavLink>
                            <NavLink onClick={() => setVisible(false)} className="py-2 pl-6" to="/contact">
                                <p>CONTACT</p>
                                <hr className="w-2/4 mx-auto border-none h-[1.5px] bg-gray-700 hidden" />
                            </NavLink>
                            <button onClick={() => { navigate("/login"); setVisible(false) }} className={`bg-black text-white ml-5 mt-3 px-8 py-2 font-light cursor-pointer rounded-lg`} disabled={isAuthenticated?true:false}>
                                Login
                            </button>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Navbar;
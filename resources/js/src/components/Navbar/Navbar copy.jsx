import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { IoSearchSharp } from "react-icons/io5";
import { FaChevronDown, FaBars } from "react-icons/fa6";
import { GrBasket } from "react-icons/gr";
import {
    useGetCartDetailsQuery,
    useGetUserProfileQuery,
    useGetFooterQuery,
    useGetHomeCategoriesQuery,
    useLogoutMutation,
    eCommerceApi,
} from "../../redux/services/eCommerceApi";
import { useSyncToken } from "../../utils/useSyncToken";
import { useDispatch } from "react-redux";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isSticky, setSticky] = useState(false);
    const [showSearchbar, setShowSearchbar] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [mobileShopOpen, setMobileShopOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const [hoveredCat, setHoveredCat] = useState(null);
    const [hoveredSub, setHoveredSub] = useState(null);

    const searchBarRef = useRef(null);
    const navRef = useRef(null);

    const token = useSyncToken();

    const { data: user } = useGetUserProfileQuery(undefined, {
        skip: !token,
        selectFromResult: ({ data }) => ({
            data: token ? data : null,
        }),
    });
    const { data: cart } = useGetCartDetailsQuery(undefined);
    const { data: categoryData, isLoading } = useGetHomeCategoriesQuery();
    const { data: logoData } = useGetFooterQuery();
    const [logout] = useLogoutMutation();

    const categories = categoryData?.categories || [];
    const totalQuantity = cart?.data?.cart_count ?? 0;

    useEffect(() => {
        const handleScroll = () => setSticky(window.scrollY > 250);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                searchBarRef.current &&
                !searchBarRef.current.contains(e.target)
            ) {
                setShowSearchbar(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleSearch = () => setShowSearchbar(!showSearchbar);
    const toggleProfileDropdown = () =>
        setIsProfileDropdownOpen(!isProfileDropdownOpen);
    const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu);

    const handleLogout = async () => {
        await logout();
        dispatch(eCommerceApi.util.resetApiState());

        navigate("/");
    };
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/shop/?q=${encodeURIComponent(searchQuery)}`);
            setShowSearchbar(false);
            setSearchQuery("");
        }
    };

    // এই ফাংশনটাই ম্যাজিক! ID দিয়ে Shop Page এ পাঠাবে
    const goToShopWithCategory = (categoryId) => {
        navigate(`/shop/?category_ids[]=${categoryId}`);
        setShowMobileMenu(false);
        setMobileShopOpen(false);
        setHoveredCat(null);
        setHoveredSub(null);
    };

    // সাবক্যাটাগরি + চাইল্ডের জন্যও ID দিয়ে পাঠাবে
    const goToShopWithSubcategory = (subId) => {
        navigate(`/shop/?category_ids[]=${subId}`);
        setShowMobileMenu(false);
        setMobileShopOpen(false);
    };

    if (isLoading) return null;

    return (
        <div ref={navRef}>
            {/* Main Navbar  */}

            <div
                className={` bg-dark2  transition-all duration-500 ${
                    isSticky
                        ? "fixed top-0 left-0 right-0 z-50 py-4 shadow-md"
                        : "py-6 lg:py-4"
                }`}
            >
                <div className="px-4 sm:px-6 lg:px-10 xl:px-20 max-w-[1200px] mx-auto flex justify-between items-center">
                    <div
                        className="block lg:hidden cursor-pointer"
                        onClick={toggleMobileMenu}
                    >
                        <FaBars className="text-cream text-xl" />
                    </div>

                    <div className="flex items-center gap-4 sm:gap-6 lg:gap-10">
                        {logoData?.logo_fav?.logo && (
                            <Link to="/">
                                <img
                                    src={`/${logoData.logo_fav.logo}`}
                                    alt="logo"
                                    className={`w-10 sm:w-12 lg:w-16 ${
                                        isSticky ? "w-8" : ""
                                    }`}
                                />
                            </Link>
                        )}

                        <nav className="hidden lg:flex">
                            <ul className="flex gap-6 xl:gap-8 items-center">
                                {/* SHOP Dropdown */}
                                <li className="relative group">
                                    <Link
                                        to="/shop"
                                        className="px-4 py-2 text-cream hover:bg-nav-gradient rounded-[10px] font-mont cursor-pointer flex items-center text-md uppercase"
                                    >
                                        Our Products
                                        <FaChevronDown className="ml-2 text-xs transition-transform group-hover:rotate-180" />
                                    </Link>

                                    <div className="absolute top-full left-0 bg-cream w-[250px] p-4 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                                        <ul>
                                            {categories.map((cat) => (
                                                <li
                                                    key={cat.id}
                                                    className="relative group/sub font-mont"
                                                    onMouseEnter={() =>
                                                        setHoveredCat(cat.id)
                                                    }
                                                    onMouseLeave={() => {
                                                        setHoveredCat(null);
                                                        setHoveredSub(null);
                                                    }}
                                                >
                                                    <div
                                                        className="flex items-center justify-between py-2 px-3 cursor-pointer hover:bg-gray-100 rounded"
                                                        onClick={() =>
                                                            goToShopWithCategory(
                                                                cat.id
                                                            )
                                                        } // ID দিয়ে
                                                    >
                                                        <span className="text-dark2 text-sm font-mont">
                                                            {cat.name}
                                                        </span>
                                                        {cat.sub_categories
                                                            ?.length > 0 && (
                                                            <span className="text-xs">
                                                                ›
                                                            </span>
                                                        )}
                                                    </div>

                                                    {/* Subcategories */}
                                                    {hoveredCat === cat.id &&
                                                        cat.sub_categories
                                                            ?.length > 0 && (
                                                            <div className="absolute top-0 left-full bg-cream w-[250px] p-4 rounded-lg shadow-lg z-50">
                                                                <ul>
                                                                    {cat.sub_categories.map(
                                                                        (
                                                                            sub
                                                                        ) => (
                                                                            <li
                                                                                key={
                                                                                    sub.id
                                                                                }
                                                                                className="relative"
                                                                                onMouseEnter={() =>
                                                                                    setHoveredSub(
                                                                                        sub.id
                                                                                    )
                                                                                }
                                                                                onMouseLeave={() =>
                                                                                    setHoveredSub(
                                                                                        null
                                                                                    )
                                                                                }
                                                                            >
                                                                                <div
                                                                                    className="flex items-center justify-between py-2 px-3 cursor-pointer hover:bg-gray-100 rounded"
                                                                                    onClick={() =>
                                                                                        goToShopWithSubcategory(
                                                                                            sub.id
                                                                                        )
                                                                                    } // ID দিয়ে
                                                                                >
                                                                                    <span className="text-dark2 text-sm font-mont">
                                                                                        {
                                                                                            sub.name
                                                                                        }
                                                                                    </span>
                                                                                    {sub
                                                                                        .child_categories
                                                                                        ?.length >
                                                                                        0 && (
                                                                                        <span className="text-xs">
                                                                                            ›
                                                                                        </span>
                                                                                    )}
                                                                                </div>

                                                                                {/* Child Categories */}
                                                                                {hoveredSub ===
                                                                                    sub.id &&
                                                                                    sub
                                                                                        .child_categories
                                                                                        ?.length >
                                                                                        0 && (
                                                                                        <div className="absolute top-0 left-full bg-cream w-[250px] p-4 rounded-lg shadow-lg z-50">
                                                                                            <ul>
                                                                                                {sub.child_categories.map(
                                                                                                    (
                                                                                                        child
                                                                                                    ) => (
                                                                                                        <li
                                                                                                            key={
                                                                                                                child.id
                                                                                                            }
                                                                                                            className="py-2 px-3 cursor-pointer hover:bg-gray-100 rounded text-dark2 text-sm"
                                                                                                            onClick={() =>
                                                                                                                goToShopWithCategory(
                                                                                                                    child.id
                                                                                                                )
                                                                                                            } // ID দিয়ে
                                                                                                        >
                                                                                                            {
                                                                                                                child.name
                                                                                                            }
                                                                                                        </li>
                                                                                                    )
                                                                                                )}
                                                                                            </ul>
                                                                                        </div>
                                                                                    )}
                                                                            </li>
                                                                        )
                                                                    )}
                                                                </ul>
                                                            </div>
                                                        )}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </li>

                                {["ABOUT", "CONTACT", "CUSTOMIZE"].map(
                                    (title) => (
                                        <li key={title}>
                                            <Link
                                                to={`/${title.toLowerCase()}`}
                                                className="px-4 py-2 text-cream hover:bg-nav-gradient font-mont rounded-[10px] text-md"
                                            >
                                                {title}
                                            </Link>
                                        </li>
                                    )
                                )}
                            </ul>
                        </nav>
                    </div>

                    <ul className="flex items-center gap-4 sm:gap-6">
                        <li
                            className="text-cream cursor-pointer"
                            onClick={toggleSearch}
                        >
                            <IoSearchSharp className="text-xl" />
                        </li>

                        {token && user ? (
                            <li className="relative">
                                <div
                                    className="flex items-center gap-2 cursor-pointer"
                                    onClick={toggleProfileDropdown}
                                >
                                    <img
                                        src={`${user.data.image}`}
                                        alt="Profile"
                                        className="w-8 h-8 rounded-full object-cover border border-cream"
                                    />
                                    <span className="text-cream text-sm hidden sm:block font-mont">
                                        {user.data.name}
                                    </span>
                                </div>
                                {isProfileDropdownOpen && (
                                    <ul className="absolute top-[120%] right-0 bg-cream w-[150px] p-4 rounded-lg shadow-lg z-30">
                                        <li>
                                            <Link
                                                to="/profile"
                                                className="block px-2 py-2 text-dark2 text-sm hover:bg-linear-to-r from-dark1 to-dark2 font-mont hover:text-cream rounded"
                                                onClick={() =>
                                                    setIsProfileDropdownOpen(
                                                        false
                                                    )
                                                }
                                            >
                                                Profile
                                            </Link>
                                        </li>
                                        <li>
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full text-left px-2 py-2 text-dark2 font-mont text-sm hover:bg-linear-to-r from-dark1 to-dark2 hover:text-cream rounded"
                                            >
                                                Logout
                                            </button>
                                        </li>
                                    </ul>
                                )}
                            </li>
                        ) : (
                            <li className="text-cream text-sm hidden lg:block font-mont">
                                <Link to="/signin">SIGN IN</Link>
                            </li>
                        )}

                        <li className="text-cream relative">
                            <Link to="/cart">
                                <GrBasket size={40} />
                                {/* <MdOutlineShoppingBag size={40} /> */}
                                {totalQuantity > 0 && (
                                    <div className="absolute -top-2 font-mont -right-2 w-5 h-5 rounded-full bg-red text-cream flex justify-center items-center text-xs">
                                        {totalQuantity}
                                    </div>
                                )}
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Mobile Menu */}
                {showMobileMenu && (
                    <div
                        className={`lg:hidden fixed ${
                            isSticky ? "top-14" : "top-[72px]"
                        } left-0 right-0 bg-dark2 shadow-lg z-40 max-h-[80vh] overflow-y-auto`}
                    >
                        <ul className="px-4 py-4 space-y-2">
                            <li>
                                <div
                                    className="flex items-center font-mont justify-between text-cream py-3 px-4 rounded-lg hover:bg-nav-gradient cursor-pointer"
                                    onClick={() =>
                                        setMobileShopOpen(!mobileShopOpen)
                                    }
                                >
                                    <span>SHOP</span>
                                    <FaChevronDown
                                        className={`transition-transform ${
                                            mobileShopOpen ? "rotate-180" : ""
                                        }`}
                                    />
                                </div>
                                {mobileShopOpen && categories && (
                                    <ul className="bg-cream/10 ml-4 mt-2 rounded-lg space-y-1">
                                        {categories.map((cat) => (
                                            <li key={cat.id}>
                                                <div
                                                    className="text-cream py-2 px-4 hover:bg-cream/20 cursor-pointer"
                                                    onClick={() =>
                                                        goToShopWithCategory(
                                                            cat.id
                                                        )
                                                    }
                                                >
                                                    {cat.name}
                                                </div>
                                                {cat.sub_categories?.length >
                                                    0 && (
                                                    <ul className="ml-4 mt-1">
                                                        {cat.sub_categories.map(
                                                            (sub) => (
                                                                <li
                                                                    key={sub.id}
                                                                >
                                                                    <div
                                                                        className="text-cream  font-mont py-2 px-4 hover:bg-cream/20 cursor-pointer text-sm"
                                                                        onClick={() =>
                                                                            goToShopWithSubcategory(
                                                                                sub.id
                                                                            )
                                                                        }
                                                                    >
                                                                        {
                                                                            sub.name
                                                                        }
                                                                    </div>
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>

                            {["ABOUT", "CONTACT"].map((title) => (
                                <li key={title}>
                                    <Link
                                        to={`/${title.toLowerCase()}`}
                                        className="block text-cream font-mont py-3 px-4 rounded-lg hover:bg-nav-gradient"
                                        onClick={toggleMobileMenu}
                                    >
                                        {title}
                                    </Link>
                                </li>
                            ))}

                            {!token && (
                                <li>
                                    <Link
                                        to="/signin"
                                        className="block text-cream py-3 px-4 font-mont rounded-lg hover:bg-nav-gradient"
                                        onClick={toggleMobileMenu}
                                    >
                                        SIGN IN
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                )}

                {/* Search Overlay */}
                <div
                    ref={searchBarRef}
                    className={`fixed inset-x-0 px-4 sm:px-6 lg:px-20 py-6 bg-dark2 transition-all duration-500 z-50 ${
                        showSearchbar
                            ? "top-0 opacity-100"
                            : "-top-full opacity-0"
                    }`}
                >
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="text-cream text-lg font-mont">
                            Search Our Product
                        </h4>
                        <button
                            onClick={toggleSearch}
                            className="text-cream text-2xl"
                        >
                            ×
                        </button>
                    </div>
                    <form onSubmit={handleSearchSubmit}>
                        <div className="border-b border-gray flex items-center">
                            <input
                                type="text"
                                placeholder="Are You Looking For?"
                                className="py-2 w-full bg-dark2 text-cream placeholder:text-gray focus:outline-none"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button type="submit">
                                <IoSearchSharp className="text-gray text-xl" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Navbar;

import {
    Bars3Icon,
    MagnifyingGlassIcon,
    ShoppingCartIcon,
    UserCircleIcon,
} from "@heroicons/react/24/outline";
import logoLee from "../assets/logo-lee.png";
import { Link } from "react-router-dom";

const NavBar = ({
    sideBarVisible,
    toggleSidebar,
}: {
    sideBarVisible: boolean;
    toggleSidebar: () => void;
}) => {
    return (
        <>
            <div className="flex flex-row w-full justify-between items-center shadow-sm py-2 px-4 bg-purple-900 sticky top-0 z-50">
                {/* Logo */}
                <div className="flex flex-row items-center gap-4">
                    <button
                        className="border-transparent border-1 text-white hover:border-purple-700 hover:cursor-pointer active:border-purple-600 active:bg-purple-800 transition-colors duration-200"
                        onClick={toggleSidebar}
                    >
                        <Bars3Icon className="w-6" />
                    </button>
                    <Link to="/" className="hover:cursor-pointer">
                        <img src={logoLee} alt="Logo" className="w-10" />
                    </Link>
                </div>
                {/* Searchbar */}
                <div className="group flex flex-row justify-between items-center text-white border-1 rounded-full border-gray-300 pl-4 w-100">
                    <input
                        className="text-sm w-full focus:outline-none focus:border-none bg-transparent text-white"
                        type="text"
                        placeholder="Search items here"
                    />
                    <MagnifyingGlassIcon className="h-8 w-8 p-2 rounded-full hover:cursor-pointer hover:bg-purple-700" />
                </div>
                {/* User actions */}
                <div className="flex flex-row justify-around items-center gap-1">
                    <div className="group">
                        <ShoppingCartIcon className="w-8 p-1 border-1 border-transparent text-white hover:cursor-pointer hover:border-1 hover:border-purple-700 active:border-purple-600 active:bg-purple-800 transition-colors duration-100" />
                    </div>
                    <div className="group">
                        <UserCircleIcon className="w-9 p-1 border-1 border-transparent text-white hover:cursor-pointer hover:border-1 hover:border-purple-700 active:border-purple-600 active:bg-purple-800 transition-colors duration-100" />
                    </div>
                </div>
            </div>
            {/* Sidebar */}
            <div
                className={`fixed top-13 left-0 h-dvh bg-purple-900 text-white transition-all duration-300 ${
                    !sideBarVisible ? "-translate-x-full" : "translate-x-0"
                }`}
            >
                <div className="grid grid-cols-1">
                    <div className="py-8 px-4 border-b-1 border-purple-300">
                        <h2 className="font-bold">Shop by Departments</h2>
                        <ul className="list-none text-sm">
                            <li className="p-2 hover:bg-purple-800 hover:cursor-pointer hover:rounded-md">
                                Electronics
                            </li>
                            <li className="p-2 hover:bg-purple-800 hover:cursor-pointer hover:rounded-md">
                                Clothing
                            </li>
                            <li className="p-2 hover:bg-purple-800 hover:cursor-pointer hover:rounded-md">
                                Home & Kitchen
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NavBar;

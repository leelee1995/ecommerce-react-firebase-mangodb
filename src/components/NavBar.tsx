import {
    Bars3Icon,
    CheckBadgeIcon,
    MagnifyingGlassIcon,
    ShoppingCartIcon,
    UserCircleIcon,
} from "@heroicons/react/24/outline";
import logoLee from "../assets/logo-lee.png";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { useAuth } from "../AuthContext";
import {
    EmailAuthProvider,
    GoogleAuthProvider,
    reauthenticateWithCredential,
    reauthenticateWithPopup,
} from "firebase/auth";

const NavBar = ({
    sideBarVisible,
    toggleSidebar,
}: {
    sideBarVisible: boolean;
    toggleSidebar: () => void;
}) => {
    const [profileOpen, setProfileOpen] = useState(false);
    const profileMenuRef = useRef<HTMLDivElement>(null);
    const { user } = useAuth();

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                profileMenuRef.current &&
                !profileMenuRef.current.contains(event.target as Node)
            ) {
                setProfileOpen(false);
            }
        }
        if (profileOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [profileOpen]);

    async function handleDeleteAccountClick() {
        if (!user) return;

        try {
            await user.delete();
            alert("Account deleted successfully.");
        } catch (error: any) {
            if (error.code === "auth/requires-recent-login") {
                // Google re-auth
                if (user.providerData[0]?.providerId === "google.com") {
                    try {
                        await reauthenticateWithPopup(
                            user,
                            new GoogleAuthProvider()
                        );
                        await user.delete();
                        alert("Account deleted successfully.");
                    } catch (reauthError: any) {
                        alert(
                            "Re-authentication failed: " + reauthError.message
                        );
                    }
                }
                // Email/password re-auth
                else if (user.email) {
                    const password = prompt(
                        "Please re-enter your password to delete your account:"
                    );
                    if (password) {
                        const credential = EmailAuthProvider.credential(
                            user.email,
                            password
                        );
                        try {
                            await reauthenticateWithCredential(
                                user,
                                credential
                            );
                            await user.delete();
                            alert("Account deleted successfully.");
                        } catch (reauthError: any) {
                            alert(
                                "Re-authentication failed: " +
                                    reauthError.message
                            );
                        }
                    }
                } else {
                    alert(
                        "Re-authentication required, but no supported provider found."
                    );
                }
            } else {
                alert("Error deleting account: " + error.message);
            }
        }
    }

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
                    {/* Profile Menu */}
                    <div className="group flex items-center justify-center">
                        <div
                            className="relative inline-block text-left"
                            ref={profileMenuRef}
                        >
                            <div>
                                <button
                                    type="button"
                                    className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs"
                                    id="menu-button"
                                    aria-expanded={profileOpen}
                                    aria-haspopup="true"
                                    onClick={() => setProfileOpen(!profileOpen)}
                                >
                                    {user ? (
                                        <CheckBadgeIcon className="w-9 p-1 border-1 border-transparent text-white hover:cursor-pointer hover:border-1 hover:border-purple-700 active:border-purple-600 active:bg-purple-800 transition-colors duration-100" />
                                    ) : (
                                        <UserCircleIcon className="w-9 p-1 border-1 border-transparent text-white hover:cursor-pointer hover:border-1 hover:border-purple-700 active:border-purple-600 active:bg-purple-800 transition-colors duration-100" />
                                    )}
                                </button>
                            </div>

                            <Transition
                                show={profileOpen}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <div
                                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md shadow-lg ring-1 ring-black/5 bg-white focus:outline-hidden"
                                    role="menu"
                                    aria-orientation="vertical"
                                    aria-labelledby="menu-button"
                                    tabIndex={-1}
                                >
                                    {user ? (
                                        <>
                                            <div className="flex flex-row items-center">
                                                <CheckBadgeIcon className="w-12 h-12 p-2 text-purple-900" />{" "}
                                                {user.email}
                                            </div>
                                            <button
                                                className="p-2 bg-red-300 border-1 border-red-500 text-red-600 w-full rounded-b-md hover:cursor-pointer hover:bg-red-500 hover:border-red-600 hover:text-white transition-colors duration-100"
                                                onClick={
                                                    handleDeleteAccountClick
                                                }
                                            >
                                                Delete account
                                            </button>
                                        </>
                                    ) : (
                                        <div className="flex flex-row items-center">
                                            <UserCircleIcon className="w-12 h-12 p-2 text-purple-900" />
                                            <Link
                                                to="/user_registry"
                                                className="text-blue-500 hover:text-blue-600 hover:underline"
                                            >
                                                Sign in/up
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </Transition>
                        </div>
                    </div>
                </div>
            </div>
            {user && (
                <div className="text-center w-full bg-amber-200 text-amber-600">
                    <span className="font-bold">ATTENTION:</span> You are logged
                    in as {user?.email}. Delete your account before shutting
                    down your localhost.
                </div>
            )}
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

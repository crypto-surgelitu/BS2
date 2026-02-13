import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, User as UserIcon, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    // Navigation links configuration
    const links = [
        { name: 'Home', path: '/' },
        { name: 'Our Venues', path: '/venues' },
        { name: 'My Bookings', path: '/my-bookings' },
    ];

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="bg-[#FCF9F6] border-b border-gray-100 sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    {/* Logo Section */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-primary rounded flex items-center justify-center text-white font-bold text-lg">
                                SP
                            </div>
                            <div className="flex flex-col">
                                <span className="font-serif font-bold text-lg text-gray-800 leading-none">Swahili Pot</span>
                                <span className="text-[10px] text-gray-500 font-medium mt-0.5">Event Venue Booking</span>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-8">
                        {links.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`text-sm font-medium transition-colors duration-200 ${isActive(link.path)
                                    ? 'text-primary'
                                    : 'text-gray-600 hover:text-primary'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Auth & CTA */}
                    <div className="hidden md:flex items-center space-x-4">
                        {user ? (
                            <>
                                {user.role === 'admin' && (
                                    <Link to="/admin" className="flex items-center space-x-1 text-xs font-bold text-gray-600 hover:text-primary transition-colors uppercase tracking-wider">
                                        <Shield size={14} />
                                        <span>Admin Panel</span>
                                    </Link>
                                )}
                                <div className="flex items-center space-x-2 text-sm text-gray-700 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                                    <UserIcon size={16} className="text-primary" />
                                    <span className="font-medium">{user.name}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="p-2 text-gray-500 hover:text-primary transition-colors"
                                    title="Logout"
                                >
                                    <LogOut size={20} />
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-sm font-bold text-gray-600 hover:text-primary transition-colors px-3 py-1.5">
                                    Sign In
                                </Link>
                                <Link to="/signup" className="bg-white border border-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors px-4 py-2 rounded-lg shadow-sm">
                                    Sign Up
                                </Link>
                            </>
                        )}
                        <Link
                            to="/venues"
                            className="bg-primary hover:bg-opacity-90 text-white px-5 py-2.5 rounded text-sm font-bold transition-all shadow-md hover:shadow-lg"
                        >
                            Book a Venue
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-600 hover:text-primary focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="lg:hidden bg-[#FCF9F6] border-t border-gray-100 shadow-xl">
                    <div className="px-4 pt-2 pb-6 space-y-1">
                        {links.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={`block px-3 py-3 rounded-md text-base font-medium ${isActive(link.path)
                                    ? 'bg-red-50 text-primary'
                                    : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="pt-4 border-t border-gray-100 flex flex-col space-y-3">
                            {user ? (
                                <>
                                    <div className="px-3 py-2 flex items-center space-x-3 text-gray-700">
                                        <UserIcon size={20} className="text-primary" />
                                        <span className="font-bold">{user.name}</span>
                                    </div>
                                    {user.role === 'admin' && (
                                        <Link to="/admin" onClick={() => setIsOpen(false)} className="px-3 py-2 flex items-center space-x-3 text-gray-700 font-bold">
                                            <Shield size={20} className="text-primary" />
                                            <span>Admin Panel</span>
                                        </Link>
                                    )}
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-3 py-2 flex items-center space-x-3 text-gray-700 font-bold"
                                    >
                                        <LogOut size={20} className="text-primary" />
                                        <span>Sign Out</span>
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" onClick={() => setIsOpen(false)} className="px-3 py-3 rounded font-bold text-gray-700">Sign In</Link>
                                    <Link to="/signup" onClick={() => setIsOpen(false)} className="px-3 py-3 rounded font-bold text-gray-700">Sign Up</Link>
                                </>
                            )}
                            <Link
                                to="/venues"
                                onClick={() => setIsOpen(false)}
                                className="block w-full text-center bg-primary text-white py-4 rounded-xl font-bold shadow-lg"
                            >
                                Book a Venue
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

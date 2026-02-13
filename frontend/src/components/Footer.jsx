import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react';

/**
 * Footer Component
 * 
 * Displays the footer section of the application.
 * Matches the official Swahili Pot Hub Foundation content while 
 * maintaining the v0 aesthetic and branding.
 */
const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#0a2357] text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <Link to="/" className="flex items-center space-x-3 group">
                            <div className="w-10 h-10 bg-primary rounded-tr-xl rounded-bl-xl flex items-center justify-center text-white font-serif font-bold text-xl transition-transform group-hover:scale-110">
                                S
                            </div>
                            <div className="flex flex-col">
                                <span className="font-serif font-bold text-xl text-white leading-none">Swahili Pot</span>
                                <span className="text-[10px] text-gray-400 uppercase tracking-[0.2em] mt-1">Event Booking</span>
                            </div>
                        </Link>

                        <p className="text-gray-300 text-sm leading-relaxed max-w-xs italic">
                            "Empowering youth through technology, arts, and entrepreneurship across East Africa."
                        </p>

                        <div className="flex space-x-5">
                            <a href="https://www.facebook.com/swahilipothub" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-all hover:-translate-y-1">
                                <Facebook size={20} />
                            </a>
                            <a href="https://x.com/swahilipothub" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-all hover:-translate-y-1">
                                <Twitter size={20} />
                            </a>
                            <a href="https://www.instagram.com/swahilipothub/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-all hover:-translate-y-1">
                                <Instagram size={20} />
                            </a>
                            <a href="https://www.linkedin.com/company/swahilipothub/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-all hover:-translate-y-1">
                                <Linkedin size={20} />
                            </a>
                            <a href="https://www.youtube.com/@swahilipothubfoundation" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-all hover:-translate-y-1">
                                <Youtube size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Programs Section */}
                    <div>
                        <h3 className="text-lg font-serif font-bold mb-6 border-b border-white/10 pb-2">Programs</h3>
                        <ul className="space-y-3">
                            <li><a href="https://swahilipothub.co.ke/programs" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center group">
                                <span className="w-1.5 h-1.5 bg-primary/40 rounded-full mr-2 group-hover:bg-primary transition-colors"></span>
                                Mombasa Tourism Innovation Hub
                            </a></li>
                            <li><a href="https://swahilipothub.co.ke/programs" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center group">
                                <span className="w-1.5 h-1.5 bg-primary/40 rounded-full mr-2 group-hover:bg-primary transition-colors"></span>
                                Arts & Culture
                            </a></li>
                            <li><a href="https://swahilipothub.co.ke/programs" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center group">
                                <span className="w-1.5 h-1.5 bg-primary/40 rounded-full mr-2 group-hover:bg-primary transition-colors"></span>
                                Entrepreneurship
                            </a></li>
                            <li><a href="https://swahilipothub.co.ke/programs" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center group">
                                <span className="w-1.5 h-1.5 bg-primary/40 rounded-full mr-2 group-hover:bg-primary transition-colors"></span>
                                Youth Mentorship
                            </a></li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-serif font-bold mb-6 border-b border-white/10 pb-2">Quick Links</h3>
                        <ul className="space-y-3">
                            <li><Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center group">
                                <span className="w-1.5 h-1.5 bg-white/20 rounded-full mr-2 group-hover:bg-white transition-colors"></span>
                                Home
                            </Link></li>
                            <li><a href="#venues" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center group">
                                <span className="w-1.5 h-1.5 bg-white/20 rounded-full mr-2 group-hover:bg-white transition-colors"></span>
                                Our Venues
                            </a></li>
                            <li><Link to="/my-bookings" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center group">
                                <span className="w-1.5 h-1.5 bg-white/20 rounded-full mr-2 group-hover:bg-white transition-colors"></span>
                                My Bookings
                            </Link></li>
                            <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center group">
                                <span className="w-1.5 h-1.5 bg-white/20 rounded-full mr-2 group-hover:bg-white transition-colors"></span>
                                Contact Us
                            </Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-serif font-bold mb-6 border-b border-white/10 pb-2">Contact</h3>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start space-x-3 group">
                                <MapPin size={18} className="text-primary mt-1 shrink-0 group-hover:scale-110 transition-transform" />
                                <span className="text-gray-300 leading-snug">Opp. Governor's Office, Butterfly House,<br />Mombasa, Kenya</span>
                            </li>
                            <li className="flex items-center space-x-3 group">
                                <Mail size={18} className="text-primary shrink-0 group-hover:scale-110 transition-transform" />
                                <a href="mailto:info@swahilipothub.co.ke" className="text-gray-300 hover:text-white transition-colors">info@swahilipothub.co.ke</a>
                            </li>
                            <li className="flex items-center space-x-3 group">
                                <Phone size={18} className="text-primary shrink-0 group-hover:scale-110 transition-transform" />
                                <a href="tel:+254114635505" className="text-gray-300 hover:text-white transition-colors">+254 11 4635505</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                    <p className="mb-4 md:mb-0">&copy; {currentYear} Swahili Pot Hub Foundation. All rights reserved.</p>
                    <div className="flex space-x-6 font-medium">
                        <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

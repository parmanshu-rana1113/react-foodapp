import React from 'react';
import { Twitter, Instagram, Facebook, TwitterIcon } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-10 ">
            <div className="container mx-auto px-4">
                {/* Top Section */}
                <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-600 pb-6">
                    <h2 className="h-10 mb-4 md:mb-0 font-extrabold">FODDIZM</h2>
                    {/* <img src="path_to_foddizm_logo" alt="Foddizm Logo" className="h-10 mb-4 md:mb-0" /> */}
                    <div className="flex items-center space-x-4">
                        <p>India</p>
                        <p>English</p>
                    </div>
                </div>

                {/* Middle Section */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-6">
                    {/* Column 1 */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">About Foddizm</h4>
                        <ul className="space-y-2">
                            <li><a href="/about" className="hover:text-gray-300">Who We Are</a></li>
                            <li><a href="/blog" className="hover:text-gray-300">Blog</a></li>
                            <li><a href="/careers" className="hover:text-gray-300">Work With Us</a></li>
                            <li><a href="/investor-relations" className="hover:text-gray-300">Investor Relations</a></li>
                            <li><a href="/report-fraud" className="hover:text-gray-300">Report Fraud</a></li>
                            <li><a href="/press-kit" className="hover:text-gray-300">Press Kit</a></li>
                            <li><a href="/contact" className="hover:text-gray-300">Contact Us</a></li>
                        </ul>
                    </div>

                    {/* Column 2 */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Foddizm Universe</h4>
                        <ul className="space-y-2">
                            <li><a href="/foddizm" className="hover:text-gray-300">Foddizm</a></li>
                            <li><a href="/blinkit" className="hover:text-gray-300">Blinkit</a></li>
                            <li><a href="/feeding-india" className="hover:text-gray-300">Feeding India</a></li>
                            <li><a href="/hyperpure" className="hover:text-gray-300">Hyperpure</a></li>
                            <li><a href="/live" className="hover:text-gray-300">Foddizm Live</a></li>
                            <li><a href="/foddiland" className="hover:text-gray-300">Foddiland</a></li>
                        </ul>
                    </div>

                    {/* Column 3 */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">For Restaurants</h4>
                        <ul className="space-y-2">
                            <li><a href="/partner" className="hover:text-gray-300">Partner With Us</a></li>
                            <li><a href="/apps" className="hover:text-gray-300">Apps For You</a></li>
                            <li><a href="/learn" className="hover:text-gray-300">Learn More</a></li>
                        </ul>
                    </div>

                    {/* Column 4 */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2">
                            <li><a href="/privacy" className="hover:text-gray-300">Privacy</a></li>
                            <li><a href="/security" className="hover:text-gray-300">Security</a></li>
                            <li><a href="/terms" className="hover:text-gray-300">Terms</a></li>
                            <li><a href="/sitemap" className="hover:text-gray-300">Sitemap</a></li>
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div className="flex space-x-6 absolut">
                        <a href="https://twitter.com" aria-label="Twitter">
                            <TwitterIcon className="text-gray-400 hover:text-white" size={24} />
                        </a>
                        <a href="https://instagram.com" aria-label="Instagram">
                            <Instagram className="text-gray-400 hover:text-white" size={24} />
                        </a>
                        <a href="https://facebook.com" aria-label="Facebook">
                            <Facebook className="text-gray-400 hover:text-white" size={24} />
                        </a>
                    </div>
                </div>




                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 border-t border-gray-600 pt-6">


                    {/* Legal and Copyright */}
                    <div className="text-center md:text-right">
                        <p className="text-sm text-gray-400">
                            By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy, and Content Policies. All trademarks are properties of their respective owners.  2008-2024 © Foddizm™ Ltd. All rights reserved.
                        </p>

                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/umigodotin?igsh=YWszZm1za3piY215',
      icon: (
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: 'Gmail',
      url: 'mailto:contact@umigo.com',
      icon: (
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h.727L12 10.085l9.637-6.264h.727c.904 0 1.636.732 1.636 1.636z" />
        </svg>
      ),
    },
    {
      name: 'Twitter/X',
      url: '#',
      icon: (
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      url: '#',
      icon: (
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-gray-800 text-white pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 items-center">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex justify-center items-center gap-3 py-4">
              <img src="/logo.jpg" alt="Umigo" className="w-10 rounded-lg" />
              <span className="text-xl font-semibold">Umigo</span>
            </div>
            <p className="text-gray-300 mb-4 ml-8 xl:ml-20 md:mb-6 max-w-md text-sm md:text-base">
              Turn ideas into hangouts — with maps, media, and memories.
              Connect with people who share your interests and create unforgettable experiences.
            </p>
            <div className="flex justify-center space-x-3 md:space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#ff5500] transform hover:scale-110 transition-all duration-200"
                  aria-label={`Follow us on ${social.name}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-base md:text-lg mb-3 md:mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-[#ff5500] transition-colors duration-200 text-sm md:text-base"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-[#ff5500] transition-colors duration-200 text-sm md:text-base"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/features"
                  className="text-gray-300 hover:text-[#ff5500] transition-colors duration-200 text-sm md:text-base"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to="/events"
                  className="text-gray-300 hover:text-[#ff5500] transition-colors duration-200 text-sm md:text-base"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  to="/support"
                  className="text-gray-300 hover:text-[#ff5500] transition-colors duration-200 text-sm md:text-base"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-white font-semibold text-base md:text-lg mb-3 md:mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/privacy-policy"
                  className="text-gray-300 hover:text-[#ff5500] transition-colors duration-200 text-sm md:text-base"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms-conditions"
                  className="text-gray-300 hover:text-[#ff5500] transition-colors duration-200 text-sm md:text-base"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="/cookie-policy"
                  className="text-gray-300 hover:text-[#ff5500] transition-colors duration-200 text-sm md:text-base"
                >
                  Cookie Policy
                </a>
              </li>
              <li>
                <Link
                  to="/support"
                  className="text-gray-300 hover:text-[#ff5500] transition-colors duration-200 text-sm md:text-base"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-6 md:mt-8 pt-6 md:pt-8">
          <div className="flex flex-col md:flex-row justify-around items-center text-xs">
            <p className="text-gray-400 text-center md:text-left md:mb-0">
              © {currentYear} Umigo. All Rights Reserved.
            </p>
            <div className="flex space-x-4 md:space-x-6">
              <a
                href="/privacy-policy"
                className="text-gray-400 hover:text-[#ff5500] transition-colors duration-200"
              >
                Privacy Policy
              </a>
              <a
                href="/terms-conditions"
                className="text-gray-400 hover:text-[#ff5500] transition-colors duration-200"
              >
                Terms & Conditions
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
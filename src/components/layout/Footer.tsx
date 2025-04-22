
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t py-8">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-swapspace-green flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="M17 1l4 4-4 4" />
                  <path d="M3 11V9a4 4 0 0 1 4-4h14" />
                  <path d="m7 23-4-4 4-4" />
                  <path d="M21 13v2a4 4 0 0 1-4 4H3" />
                </svg>
              </div>
              <span className="text-xl font-semibold text-swapspace-green-DEFAULT">SwapSpace</span>
            </Link>
            <p className="text-sm text-gray-500">
              Trade without money. Swap items you don't need for things you do.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/browse" className="text-gray-500 hover:text-swapspace-green-DEFAULT">
                  Browse Items
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-500 hover:text-swapspace-green-DEFAULT">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-gray-500 hover:text-swapspace-green-DEFAULT">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Account</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/login" className="text-gray-500 hover:text-swapspace-green-DEFAULT">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-gray-500 hover:text-swapspace-green-DEFAULT">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to="/my-items" className="text-gray-500 hover:text-swapspace-green-DEFAULT">
                  My Items
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Help</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/faq" className="text-gray-500 hover:text-swapspace-green-DEFAULT">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-500 hover:text-swapspace-green-DEFAULT">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-500 hover:text-swapspace-green-DEFAULT">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">© 2025 SwapSpace. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-swapspace-green-DEFAULT">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="lucide lucide-facebook"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-500 hover:text-swapspace-green-DEFAULT">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="lucide lucide-twitter"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-500 hover:text-swapspace-green-DEFAULT">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="lucide lucide-instagram"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

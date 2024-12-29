import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="bg-[#f5f5f5] border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-gray-800">
          <span>Medium</span>
        </div>

        <nav className="hidden md:flex space-x-6 text-gray-600">
          <Link to="/my-posts" className="hover:text-black">
            Our stories
          </Link>
          <Link to="/blogs" className="hover:text-black">
            All Blogs
          </Link>
          <Link to="/publish" className="hover:text-black">
            Write
          </Link>
          <Link to="/signin" className="hover:text-black">
            Sign in
          </Link>
        </nav>

        <div>
          <Link to="/send-otp" className="bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800 transition">
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

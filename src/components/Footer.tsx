// src/components/Footer.tsx
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#f5f5f5] border-t border-gray-200 py-4">
      <div className="container mx-auto px-4 text-center">
        <nav className="flex flex-wrap justify-center space-x-6 text-gray-600 text-sm">
          <a href="#help" className="hover:text-black">
            Help
          </a>
          <a href="#status" className="hover:text-black">
            Status
          </a>
          <a href="#about" className="hover:text-black">
            About
          </a>
          <a href="#careers" className="hover:text-black">
            Careers
          </a>
          <a href="#press" className="hover:text-black">
            Press
          </a>
          <a href="#blog" className="hover:text-black">
            Blog
          </a>
          <a href="#privacy" className="hover:text-black">
            Privacy
          </a>
          <a href="#terms" className="hover:text-black">
            Terms
          </a>
          <a href="#text-to-speech" className="hover:text-black">
            Text to speech
          </a>
          <a href="#teams" className="hover:text-black">
            Teams
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4 text-center">
      <div className="container mx-auto">
        <Link to="/contact" className="text-blue-400 underline">
          Contact Me
        </Link>
        <p className="mt-2 text-sm">© 2025 Tune Flow. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

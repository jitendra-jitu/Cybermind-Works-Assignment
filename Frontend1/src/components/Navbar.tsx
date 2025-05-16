
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm py-4 border-b">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded"></div>
          <Link to="/" className="text-xl font-bold">JobPortal</Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="font-medium hover:text-blue-600 transition-colors">Home</Link>
          <Link to="/jobs" className="font-medium hover:text-blue-600 transition-colors">Find Jobs</Link>
          <Link to="/talents" className="font-medium hover:text-blue-600 transition-colors">Find Talents</Link>
          <Link to="/about" className="font-medium hover:text-blue-600 transition-colors">About us</Link>
          <Link to="/testimonials" className="font-medium hover:text-blue-600 transition-colors">Testimonials</Link>
        </div>
        
        <div>
          <Link to="/create-job">
            <Button className="bg-purple-600 hover:bg-purple-700">Create Jobs</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

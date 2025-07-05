import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-deep-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-gold to-dark-gold rounded-full flex items-center justify-center">
                <span className="text-white font-serif font-bold">M</span>
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg">Marc Aroma</h3>
                <p className="text-xs text-gray-400">Essence of Elegance</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Crafting luxury fragrances that capture the essence of sophistication and elegance.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-gold transition-colors duration-200">Home</Link></li>
              <li><Link to="/products" className="text-gray-300 hover:text-gold transition-colors duration-200">Products</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-gold transition-colors duration-200">About</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-gold transition-colors duration-200">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-gold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-gray-300">
                <Mail size={16} />
                <span className="text-sm">info@marcaroma.com</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-300">
                <Phone size={16} />
                <span className="text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-300">
                <MapPin size={16} />
                <span className="text-sm">New York, NY</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-semibold text-gold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-gold transition-colors duration-200">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-gold transition-colors duration-200">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-gold transition-colors duration-200">
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Marc Aroma. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import React from 'react';
import { ShoppingBag, Heart } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gold hover:text-white transition-colors duration-200">
            <Heart size={18} />
          </button>
          <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gold hover:text-white transition-colors duration-200">
            <ShoppingBag size={18} />
          </button>
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-gold text-white px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide">
            {product.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-serif font-bold text-deep-black mb-2">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gold">
            ${product.price}
          </span>
          <button className="bg-deep-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gold transition-colors duration-200">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
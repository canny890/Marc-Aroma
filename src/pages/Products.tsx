import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Fragrances' },
    { id: 'men', name: 'For Men' },
    { id: 'women', name: 'For Women' },
    { id: 'unisex', name: 'Unisex' },
  ];

  const products = [
    {
      id: 1,
      name: 'Midnight Elegance',
      category: 'men',
      price: 120,
      image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg',
      description: 'A sophisticated blend of cedar, bergamot, and amber.',
    },
    {
      id: 2,
      name: 'Rose Mystique',
      category: 'women',
      price: 135,
      image: 'https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg',
      description: 'Delicate rose petals with hints of vanilla and musk.',
    },
    {
      id: 3,
      name: 'Ocean Breeze',
      category: 'unisex',
      price: 110,
      image: 'https://images.pexels.com/photos/1190830/pexels-photo-1190830.jpeg',
      description: 'Fresh aquatic notes with citrus and marine accords.',
    },
    {
      id: 4,
      name: 'Golden Sunset',
      category: 'women',
      price: 145,
      image: 'https://images.pexels.com/photos/1190831/pexels-photo-1190831.jpeg',
      description: 'Warm amber and honey with floral undertones.',
    },
    {
      id: 5,
      name: 'Urban Legend',
      category: 'men',
      price: 125,
      image: 'https://images.pexels.com/photos/1190832/pexels-photo-1190832.jpeg',
      description: 'Bold spices with leather and tobacco notes.',
    },
    {
      id: 6,
      name: 'Eternal Spring',
      category: 'unisex',
      price: 115,
      image: 'https://images.pexels.com/photos/1190833/pexels-photo-1190833.jpeg',
      description: 'Fresh florals with green leaves and white tea.',
    },
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif font-bold text-deep-black mb-4">
          Our Fragrance Collection
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover our carefully curated selection of luxury fragrances, each crafted to tell a unique story.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
              selectedCategory === category.id
                ? 'bg-gold text-white shadow-lg'
                : 'bg-white text-deep-black border border-gold/30 hover:bg-gold/10'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
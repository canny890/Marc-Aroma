import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

const FeaturedProducts = () => {
  const featuredProducts = [
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
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-deep-black mb-4">
            Featured Fragrances
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our most beloved scents, each carefully crafted to tell a unique story.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/products"
            className="inline-block bg-gold text-white px-8 py-3 rounded-full font-semibold hover:bg-dark-gold transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
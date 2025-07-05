import React from 'react';
import { Award, Heart, Leaf, Star } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: <Heart className="w-8 h-8 text-gold" />,
      title: 'Passion',
      description: 'Every fragrance is crafted with love and dedication to perfection.',
    },
    {
      icon: <Leaf className="w-8 h-8 text-gold" />,
      title: 'Sustainability',
      description: 'We source our ingredients ethically and sustainably.',
    },
    {
      icon: <Award className="w-8 h-8 text-gold" />,
      title: 'Quality',
      description: 'Only the finest ingredients make it into our fragrances.',
    },
    {
      icon: <Star className="w-8 h-8 text-gold" />,
      title: 'Excellence',
      description: 'We strive for excellence in every aspect of our craft.',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-serif font-bold text-deep-black mb-6">
          About Marc Aroma
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Founded on the belief that fragrance is an art form, Marc Aroma has been creating 
          exceptional perfumes that capture the essence of elegance and sophistication.
        </p>
      </div>

      {/* Story Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div className="space-y-6">
          <h2 className="text-3xl font-serif font-bold text-deep-black">Our Story</h2>
          <p className="text-gray-600 leading-relaxed">
            Marc Aroma began as a dream to create fragrances that tell stories. Founded by master 
            perfumer Marc Dubois in the heart of Grasse, France, our journey started with a simple 
            mission: to craft scents that evoke emotions and create lasting memories.
          </p>
          <p className="text-gray-600 leading-relaxed">
            With over two decades of experience in the fragrance industry, we have perfected the 
            art of blending traditional techniques with modern innovation. Each bottle represents 
            our commitment to excellence and our passion for the olfactory arts.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Today, Marc Aroma continues to push the boundaries of fragrance creation, working with 
            the world's finest ingredients to create scents that are both timeless and contemporary.
          </p>
        </div>
        <div className="relative">
          <img
            src="https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg"
            alt="Perfume creation process"
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
        </div>
      </div>

      {/* Values Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-serif font-bold text-deep-black text-center mb-12">
          Our Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="flex justify-center mb-4">
                {value.icon}
              </div>
              <h3 className="text-xl font-semibold text-deep-black mb-3">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="text-center">
        <h2 className="text-3xl font-serif font-bold text-deep-black mb-8">
          Master Perfumer
        </h2>
        <div className="max-w-2xl mx-auto">
          <img
            src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg"
            alt="Marc Dubois"
            className="w-48 h-48 rounded-full mx-auto mb-6 object-cover shadow-lg"
          />
          <h3 className="text-2xl font-serif font-bold text-deep-black mb-2">Marc Dubois</h3>
          <p className="text-gold font-medium mb-4">Founder & Master Perfumer</p>
          <p className="text-gray-600 leading-relaxed">
            With over 25 years of experience in the fragrance industry, Marc Dubois has created 
            some of the world's most beloved scents. His passion for perfumery began in his 
            childhood in Grasse, where he learned the traditional art of fragrance creation 
            from his grandmother.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
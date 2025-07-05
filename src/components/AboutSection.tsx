import React from 'react';
import { Award, Leaf, Heart } from 'lucide-react';

const AboutSection = () => {
  const features = [
    {
      icon: <Award className="w-8 h-8 text-gold" />,
      title: 'Premium Quality',
      description: 'Only the finest ingredients sourced from around the world.',
    },
    {
      icon: <Leaf className="w-8 h-8 text-gold" />,
      title: 'Sustainable',
      description: 'Ethically sourced materials with eco-friendly packaging.',
    },
    {
      icon: <Heart className="w-8 h-8 text-gold" />,
      title: 'Handcrafted',
      description: 'Each fragrance is carefully crafted by master perfumers.',
    },
  ];

  return (
    <section className="py-20 bg-blush-rose">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-serif font-bold text-deep-black mb-6">
                The Art of Fragrance
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                At Marc Aroma, we believe that fragrance is more than just a scent—it's an expression 
                of personality, a memory maker, and an art form. Our master perfumers blend traditional 
                techniques with modern innovation to create fragrances that are both timeless and contemporary.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Each bottle represents hours of careful craftsmanship, from the initial concept to the 
                final blend. We source our ingredients from the finest suppliers worldwide, ensuring 
                that every fragrance meets our exacting standards of quality and elegance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-3">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-deep-black mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg"
              alt="Perfume creation process"
              className="w-full h-96 object-cover rounded-lg shadow-xl"
            />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gold rounded-full opacity-20"></div>
            <div className="absolute -top-6 -right-6 w-16 h-16 bg-dark-gold rounded-full opacity-30"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
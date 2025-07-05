import React, { useState } from 'react';
import { Mail } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setIsSubscribed(true);
    setEmail('');
    
    // Reset success message after 3 seconds
    setTimeout(() => {
      setIsSubscribed(false);
    }, 3000);
  };

  return (
    <section className="py-20 bg-deep-black text-white">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gold rounded-full">
              <Mail className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h2 className="text-3xl font-serif font-bold mb-4">
            Stay in the Scent
          </h2>
          <p className="text-gray-300 mb-8 leading-relaxed">
            Be the first to know about new fragrances, exclusive offers, and behind-the-scenes 
            stories from our perfumery. Join our community of fragrance enthusiasts.
          </p>

          {isSubscribed ? (
            <div className="bg-gold/20 border border-gold rounded-lg p-6 animate-fade-in">
              <p className="text-gold font-medium">
                Thank you for subscribing! Welcome to the Marc Aroma family.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 px-4 py-3 rounded-full text-deep-black focus:outline-none focus:ring-2 focus:ring-gold"
              />
              <button
                type="submit"
                className="bg-gold text-white px-8 py-3 rounded-full font-semibold hover:bg-dark-gold transition-colors duration-200 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          )}

          <p className="text-xs text-gray-400 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
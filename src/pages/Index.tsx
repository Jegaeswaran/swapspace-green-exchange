import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ItemGrid from '@/components/items/ItemGrid';
import { Button } from '@/components/ui/button';
import { ItemProps } from '@/components/items/ItemCard';

const Index: React.FC = () => {
  // Mock data for feature items
  const featuredItems: ItemProps[] = [
    {
      id: '1',
      title: 'Vintage Record Player',
      description: 'Fully functional vintage record player in excellent condition. Perfect for vinyl enthusiasts.',
      category: 'Electronics',
      condition: 'Good',
      imageUrl: 'https://images.unsplash.com/photo-1545454675-3531b543be5d',
      location: 'Portland, OR',
      ownerId: 'user1',
      ownerName: 'Alex Johnson'
    },
    {
      id: '2',
      title: 'Mid-Century Modern Sofa',
      description: 'Beautiful 3-seater sofa in teal blue. Minimal wear and very comfortable.',
      category: 'Furniture',
      condition: 'Like New',
      imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
      location: 'Seattle, WA',
      ownerId: 'user2',
      ownerName: 'Jamie Smith'
    },
    {
      id: '3',
      title: 'Camping Tent (4-Person)',
      description: 'Spacious 4-person tent, used twice. Includes rainfly and carry bag.',
      category: 'Sports',
      condition: 'Good',
      imageUrl: 'https://images.unsplash.com/photo-1472396961693-142e6e269027',
      location: 'Denver, CO',
      ownerId: 'user3',
      ownerName: 'Morgan Lee'
    },
    {
      id: '4',
      title: 'Mountain Bike',
      description: 'Trek mountain bike, 21 speeds. Some scratches but mechanically sound.',
      category: 'Sports',
      condition: 'Fair',
      imageUrl: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890',
      location: 'Austin, TX',
      ownerId: 'user4',
      ownerName: 'Jordan Wilson'
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-swapspace-green-light/20 to-swapspace-green-DEFAULT/10 py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex-1 space-y-4 text-center md:text-left">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">
                Trade What You Have for What You Need
              </h1>
              <p className="text-lg text-gray-600 md:text-xl">
                SwapSpace helps you exchange items without spending money. List what you don't need and find what you do.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button asChild size="lg">
                  <Link to="/browse">Browse Items</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/signup">Join SwapSpace</Link>
                </Button>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="relative aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 rounded-full bg-swapspace-green-DEFAULT/10 animate-pulse" />
                <img
                  src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9"
                  alt="Items to swap"
                  className="rounded-2xl shadow-xl object-cover"
                />
                <div className="absolute -bottom-4 -right-4 bg-white p-3 rounded-full shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-swapspace-green-DEFAULT"
                  >
                    <path d="M17 1l4 4-4 4" />
                    <path d="M3 11V9a4 4 0 0 1 4-4h14" />
                    <path d="m7 23-4-4 4-4" />
                    <path d="M21 13v2a4 4 0 0 1-4 4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter mb-2">How SwapSpace Works</h2>
            <p className="text-lg text-gray-600">Three simple steps to swap your items</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-swapspace-green-light/20 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-swapspace-green-DEFAULT">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">List Your Item</h3>
              <p className="text-gray-600">
                Take photos and create a listing for items you no longer need
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-swapspace-green-light/20 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-swapspace-green-DEFAULT">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Matched</h3>
              <p className="text-gray-600">
                Connect with people interested in swapping items with you
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-swapspace-green-light/20 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-swapspace-green-DEFAULT">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Make the Swap</h3>
              <p className="text-gray-600">
                Arrange a meeting to exchange items safely and securely
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link to="/how-it-works">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold tracking-tighter">Featured Items</h2>
            <Button asChild variant="outline">
              <Link to="/browse">View All</Link>
            </Button>
          </div>
          
          <ItemGrid items={featuredItems} />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter mb-2">What Our Community Says</h2>
            <p className="text-lg text-gray-600">Join thousands of happy swappers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-swapspace-green-light/20 flex items-center justify-center mr-4">
                  <span className="text-xl font-bold text-swapspace-green-DEFAULT">M</span>
                </div>
                <div>
                  <h4 className="font-semibold">Michael T.</h4>
                  <p className="text-sm text-gray-500">Portland, OR</p>
                </div>
              </div>
              <p className="text-gray-600">
                "I swapped my old camera for a guitar I've always wanted. The process was simple and the community is so helpful!"
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-swapspace-green-light/20 flex items-center justify-center mr-4">
                  <span className="text-xl font-bold text-swapspace-green-DEFAULT">S</span>
                </div>
                <div>
                  <h4 className="font-semibold">Sarah K.</h4>
                  <p className="text-sm text-gray-500">Austin, TX</p>
                </div>
              </div>
              <p className="text-gray-600">
                "SwapSpace helped me furnish my new apartment without spending a fortune. I'm recommending it to all my friends!"
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-swapspace-green-light/20 flex items-center justify-center mr-4">
                  <span className="text-xl font-bold text-swapspace-green-DEFAULT">J</span>
                </div>
                <div>
                  <h4 className="font-semibold">James L.</h4>
                  <p className="text-sm text-gray-500">Denver, CO</p>
                </div>
              </div>
              <p className="text-gray-600">
                "Not only am I saving money, but I'm reducing waste by giving my items a second life. It's a win-win!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-swapspace-green-DEFAULT py-16">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tighter text-white mb-4">
            Ready to Start Swapping?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Join SwapSpace today and be part of a growing community of mindful consumers.
          </p>
          <Button asChild size="lg" variant="secondary" className="bg-white text-swapspace-green-DEFAULT hover:bg-gray-100">
            <Link to="/signup">Create Your Account</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;

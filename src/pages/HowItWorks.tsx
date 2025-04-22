
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';

const HowItWorks: React.FC = () => {
  return (
    <Layout>
      <div className="container px-4 md:px-6 py-8">
        <h1 className="text-3xl font-bold tracking-tighter mb-4">How SwapSpace Works</h1>
        <p className="text-lg text-gray-600 mb-8">
          SwapSpace is a sustainable marketplace that allows you to exchange items without using money.
          Here's a simple guide to get you started.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card>
            <CardContent className="pt-6">
              <div className="rounded-full bg-swapspace-green-100 w-12 h-12 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-swapspace-green-DEFAULT"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Create an Account</h3>
              <p className="text-gray-600">
                Sign up with your email and password to join our community of swappers.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="rounded-full bg-swapspace-green-100 w-12 h-12 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-swapspace-green-DEFAULT"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M3 9h18" />
                  <path d="M9 21V9" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">2. List Your Items</h3>
              <p className="text-gray-600">
                Add photos and descriptions of items you no longer need but are still in good condition.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="rounded-full bg-swapspace-green-100 w-12 h-12 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
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
              <h3 className="text-xl font-semibold mb-2">3. Find & Propose Swaps</h3>
              <p className="text-gray-600">
                Browse items from other users and propose exchanges for items you're interested in.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        
        <div className="space-y-6 mb-10">
          <div>
            <h3 className="text-xl font-semibold mb-2">Is SwapSpace completely free?</h3>
            <p className="text-gray-600">
              Yes! SwapSpace is completely free to use. We believe in promoting sustainable consumption
              without financial barriers.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-2">How do I arrange a swap?</h3>
            <p className="text-gray-600">
              When you find an item you like, click "Propose a Swap" and select one of your items to offer
              in exchange. If the other user accepts, you'll be connected to arrange the exchange details.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-2">What if something goes wrong with my swap?</h3>
            <p className="text-gray-600">
              While SwapSpace facilitates connections between users, we recommend meeting in safe, public places
              for exchanges and checking items before completing the swap. If there are issues, please contact
              our support team.
            </p>
          </div>
        </div>
        
        <div className="bg-swapspace-green-100 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Ready to start swapping?</h2>
          <p className="text-gray-700 mb-6">
            Join thousands of users already exchanging items and reducing waste with SwapSpace.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="/signup" className="bg-swapspace-green-DEFAULT text-white px-6 py-3 rounded-lg font-medium hover:bg-swapspace-green-600 transition-colors">
              Create an Account
            </a>
            <a href="/browse" className="bg-white text-swapspace-green-DEFAULT border border-swapspace-green-DEFAULT px-6 py-3 rounded-lg font-medium hover:bg-swapspace-green-50 transition-colors">
              Browse Available Items
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HowItWorks;

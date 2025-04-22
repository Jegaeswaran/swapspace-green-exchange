
import React from 'react';
import Layout from '@/components/layout/Layout';
import SignupForm from '@/components/auth/SignupForm';

const Signup: React.FC = () => {
  return (
    <Layout>
      <div className="container px-4 md:px-6 py-8">
        <div className="flex flex-col min-h-[60vh] items-center justify-center">
          <SignupForm />
        </div>
      </div>
    </Layout>
  );
};

export default Signup;

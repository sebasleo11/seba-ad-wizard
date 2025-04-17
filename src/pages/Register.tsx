
import React from 'react';
import Layout from '@/components/layout/Layout';
import RegisterForm from '@/components/auth/RegisterForm';

const Register = () => {
  return (
    <Layout>
      <div className="py-16 bg-gray-50">
        <div className="container-app max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold font-heading">Crea tu cuenta</h1>
            <p className="text-gray-600 mt-2">Comienza a crear campañas publicitarias efectivas</p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <RegisterForm />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;

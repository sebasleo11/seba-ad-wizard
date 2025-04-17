
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import LoginForm from '@/components/auth/LoginForm';

const Login = () => {
  return (
    <Layout>
      <div className="py-16 bg-gray-50">
        <div className="container-app max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold font-heading">Bienvenido de nuevo</h1>
            <p className="text-gray-600 mt-2">Ingresa a tu cuenta para continuar</p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <LoginForm />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;

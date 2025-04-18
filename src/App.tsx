import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import CreateAd from "./pages/CreateAd";
import Features from "./pages/Features";
import Precios from './pages/Precios'
import Contacto from './pages/Contacto'
import PoliticaPrivacidad from "./pages/PoliticaPrivacidad";
import Terminos from "./pages/Terminos";
import SebabotChat from "./components/SebabotChat";



<SebabotChat />



// Components
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Create a client
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/features" element={<Features />} />
            <Route path="/precios" element={<Precios />} />
            <Route path="/pricing" element={<Precios />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/contact" element={<Contacto />} />
            <Route path="/privacidad" element={<PoliticaPrivacidad />} />
            <Route path="/privacy-policy" element={<PoliticaPrivacidad />} /> 
            <Route path="/terminos" element={<Terminos />} /> 
            <Route path="/terms-of-service" element={<Terminos />} />

            
            {/* Protected routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/create-ad" element={
              <ProtectedRoute>
                <CreateAd />
              </ProtectedRoute>
            } />

             
            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <SebabotChat />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

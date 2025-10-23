import "./App.css";
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "./components/ui/sonner";

// Lazy load page components for better performance
const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const About = lazy(() => import('./pages/About'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const ServiceAreas = lazy(() => import('./pages/ServiceAreas'));
const Contact = lazy(() => import('./pages/Contact'));

// Lazy load service detail pages
const FinishCarpentry = lazy(() => import('./pages/services/FinishCarpentry'));
const GeneralConstruction = lazy(() => import('./pages/services/GeneralConstruction'));
const ResidentialProjects = lazy(() => import('./pages/services/ResidentialProjects'));
const HomeAdditions = lazy(() => import('./pages/services/HomeAdditions'));
const CustomWoodwork = lazy(() => import('./pages/services/CustomWoodwork'));
const CompleteRemodeling = lazy(() => import('./pages/services/CompleteRemodeling'));

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
  </div>
);

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={
            <Suspense fallback={<PageLoader />}>
              <Home />
            </Suspense>
          } />
          <Route path="/services" element={
            <Suspense fallback={<PageLoader />}>
              <Services />
            </Suspense>
          } />
          <Route path="/about" element={
            <Suspense fallback={<PageLoader />}>
              <About />
            </Suspense>
          } />
          <Route path="/portfolio" element={
            <Suspense fallback={<PageLoader />}>
              <Portfolio />
            </Suspense>
          } />
          <Route path="/service-areas" element={
            <Suspense fallback={<PageLoader />}>
              <ServiceAreas />
            </Suspense>
          } />
          <Route path="/contact" element={
            <Suspense fallback={<PageLoader />}>
              <Contact />
            </Suspense>
          } />
          <Route path="/services/finish-carpentry" element={
            <Suspense fallback={<PageLoader />}>
              <FinishCarpentry />
            </Suspense>
          } />
          <Route path="/services/general-construction" element={
            <Suspense fallback={<PageLoader />}>
              <GeneralConstruction />
            </Suspense>
          } />
          <Route path="/services/residential-projects" element={
            <Suspense fallback={<PageLoader />}>
              <ResidentialProjects />
            </Suspense>
          } />
          <Route path="/services/home-additions" element={
            <Suspense fallback={<PageLoader />}>
              <HomeAdditions />
            </Suspense>
          } />
          <Route path="/services/custom-woodwork" element={
            <Suspense fallback={<PageLoader />}>
              <CustomWoodwork />
            </Suspense>
          } />
          <Route path="/services/complete-remodeling" element={
            <Suspense fallback={<PageLoader />}>
              <CompleteRemodeling />
            </Suspense>
          } />
        </Routes>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;

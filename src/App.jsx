import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navbar from "./composants/Navbar";
import { SpeedInsights } from "@vercel/speed-insights/react";

// Code Splitting: Lazy load routes for better performance
const Home = lazy(() => import("./pages/Home"));
const Products = lazy(() => import("./pages/Products"));
const Abonnement = lazy(() => import("./pages/Abonnement"));
const Machine = lazy(() => import("./pages/Machines"));
const Tableau = lazy(() => import("./pages/Tableau"));

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-black">
    <div className="text-yellow-400 text-xl font-semibold animate-pulse">
      Chargement...
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Navbar />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/abonnement" element={<Abonnement />} />
          <Route path="/machines" element={<Machine />} />
          <Route path="/tableau" element={<Tableau />} />
        </Routes>
      </Suspense>
      <SpeedInsights />
    </Router>
  );
}

export default App;

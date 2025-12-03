import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";

// Lazy load ALL components including Navbar
const Navbar = lazy(() => import("./composants/Navbar"));
const Home = lazy(() => import("./pages/Home"));
const Products = lazy(() => import("./pages/Products"));
const Abonnement = lazy(() => import("./pages/Abonnement"));
const Machine = lazy(() => import("./pages/Machines"));
const Tableau = lazy(() => import("./pages/Tableau"));

// Lazy load SpeedInsights (non-critical)
const SpeedInsights = lazy(() =>
  import("@vercel/speed-insights/react").then(module => ({ default: module.SpeedInsights }))
);

// Minimal loading fallback
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-black">
    <div className="text-yellow-400 text-xl font-semibold animate-pulse">
      Chargement...
    </div>
  </div>
);

// Minimal navbar loader
const NavLoader = () => <div style={{ height: '80px' }} />;

function App() {
  const [showInsights, setShowInsights] = useState(false);

  // Load SpeedInsights after main content
  useEffect(() => {
    const timer = setTimeout(() => setShowInsights(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <Suspense fallback={<NavLoader />}>
        <Navbar />
      </Suspense>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/abonnement" element={<Abonnement />} />
          <Route path="/machines" element={<Machine />} />
          <Route path="/tableau" element={<Tableau />} />
        </Routes>
      </Suspense>
      {showInsights && (
        <Suspense fallback={null}>
          <SpeedInsights />
        </Suspense>
      )}
    </Router>
  );
}

export default App;

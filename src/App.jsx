import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
// import Login from "./pages/login"; 
import Navbar from "./composants/Navbar";
import Products from "./pages/Products";
import Abonnement from "./pages/Abonnement";
import Machine from "./pages/Machines";
import Tableau from "./pages/Tableau";



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/abonnement" element={<Abonnement />} />
        <Route path="/machines" element={<Machine />} />
        <Route path="/tableau" element={<Tableau />} />
      </Routes>
    </Router>
  );
}

export default App;

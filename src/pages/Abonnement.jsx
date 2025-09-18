import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Abonnement() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragStart, setDragStart] = useState(0);
  const [dragEnd, setDragEnd] = useState(0);

  const plans = [
    {
      name: "STANDARD",
      price: "38€",
      per: "/mois",
      description: "Soit 456€/1 an",
      features: [
        "Power Lifting",
        "Cross Training",
        "Weight Lifting",
        "Cardio Training",
      ],
      link: "https://member.resamania.com/irongym/",
    },
    {
      name: "POLICE/POMPIER",
      price: "34€",
      per: "/mois",
      description: "Soit 408€/1 an",
      features: [
        "Power Lifting",
        "Cross Training",
        "Weight Lifting",
        "Cardio Training",
      ],
      link: "https://member.resamania.com/irongym/",
    },
    {
      name: "ETUDIANT",
      price: "32€",
      per: "/mois",
      description: "Soit 384€/1 an",
      features: [
        "Power Lifting",
        "Cross Training",
        "Weight Lifting",
        "Cardio Training",
      ],
      link: "https://member.resamania.com/irongym/",
    },
  ];

  // Défilement automatique toutes les 6 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + plans.length) % plans.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % plans.length);
  };

  const handleDragStart = (event, info) => {
    setDragStart(info.point.x);
  };

  const handleDragEnd = (event, info) => {
    setDragEnd(info.point.x);
    const distance = info.point.x - dragStart;

    // Si le swipe est assez long vers la droite
    if (distance > 100) {
      handlePrev();
    }
    // Si le swipe est assez long vers la gauche
    else if (distance < -100) {
      handleNext();
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Titre */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-yellow-400">Abonnement</h1>
        <p className="text-white/70 mt-2">Choisis ton plan d'entraînement</p>
      </div>

      {/* Carrousel */}
      <div className="relative max-w-3xl mx-auto overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg flex flex-col items-center cursor-grab active:cursor-grabbing"
          >
            <h2 className="text-xl font-bold uppercase text-yellow-400 text-center">
              {plans[currentIndex].name}
            </h2>
            <div className="border-t-2 border-yellow-400 w-16 mt-2 mb-4" />

            <div className="text-4xl font-extrabold text-yellow-400 flex items-baseline gap-1">
              {plans[currentIndex].price}
              <span className="text-base font-normal text-white">
                {plans[currentIndex].per}
              </span>
            </div>

            <p className="text-sm text-white/80 mt-2">
              {plans[currentIndex].description}
            </p>

            <ul className="mt-6 space-y-3 text-left text-white/90">
              {plans[currentIndex].features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-yellow-400">✔</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setSelectedPlan(plans[currentIndex])}
              className="mt-8 bg-yellow-400 text-black py-3 px-6 rounded-xl font-semibold uppercase tracking-wide hover:bg-yellow-300 transition"
            >
              Je m’inscris
            </button>
          </motion.div>
        </AnimatePresence>

        {/* Boutons navigation */}
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-yellow-400 hover:bg-yellow-300 text-black p-3 rounded-full shadow-lg transition"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-yellow-400 hover:bg-yellow-300 text-black p-3 rounded-full shadow-lg transition"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Pop-up Confirmation */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center relative animate-fade-in">
            <button
              onClick={() => setSelectedPlan(null)}
              className="absolute top-3 right-3 text-black hover:text-red-600 text-2xl"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold mb-2 text-yellow-500">
              {selectedPlan.name}
            </h2>
            <p className="text-gray-700 mb-4">{selectedPlan.description}</p>
            <p className="text-3xl font-extrabold mb-4 text-black">
              {selectedPlan.price}
              <span className="text-base font-medium">
                {selectedPlan.per}
              </span>
            </p>

            <button
              onClick={() => {
                window.open(selectedPlan.link, "_blank");
                setSelectedPlan(null);
              }}
              className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-300 transition"
            >
              Confirmer 
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Abonnement;

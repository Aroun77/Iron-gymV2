import { useState, useEffect } from "react";
import ChevronLeft from "lucide-react/dist/esm/icons/chevron-left";
import ChevronRight from "lucide-react/dist/esm/icons/chevron-right";
import { CheckCircle2, XCircle } from "lucide-react";
import { getBackgrounds } from "../services/api";
import SEO from "../composants/SEO";
// Force rebuild - v2

function Abonnement() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [backgroundUrl, setBackgroundUrl] = useState('');

  const plans = [
    {
      name: "STANDARD",
      price: "38€",
      per: "/mois",
      description: "Soit 456€/1 an",
      features: [
        "Power Lifting",
        "Cross Training (Non Inclus)",
        "Weight Lifting",
        "Cardio Training",
      ],
      link: "https://member.resamania.com/irongym/registration",
    },
    {
      name: "POLICE/POMPIER",
      price: "34€",
      per: "/mois",
      description: "Soit 408€/1 an",
      features: [
        "Power Lifting",
        "Cross Training (Non Inclus)",
        "Weight Lifting",
        "Cardio Training",
      ],
      link: "https://member.resamania.com/irongym/registration",
    },
    {
      name: "ETUDIANT",
      price: "32€",
      per: "/mois",
      description: "Soit 384€/1 an",
      features: [
        "Power Lifting",
        "Cross Training (Non Inclus)",
        "Weight Lifting",
        "Cardio Training",
      ],
      link: "https://member.resamania.com/irongym/registration",
    },
  ];

  // Charger le background
  useEffect(() => {
    async function loadBackground() {
      try {
        const backgrounds = await getBackgrounds();
        const bgImage = backgrounds.find(bg => bg.name === 'Background');
        if (bgImage) {
          const cacheBuster = `&v=${Date.now()}`;
          setBackgroundUrl(`${bgImage.url}&w=1920&fit=crop&q=80${cacheBuster}`);
        }
      } catch (err) {
        console.error("Erreur chargement background:", err);
      }
    }
    loadBackground();
  }, []);

  // Défilement automatique 
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

  return (
    <div
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative"
      style={{
        backgroundImage: backgroundUrl
          ? `url('${backgroundUrl}')`
          : "url('https://6960087cffe0774d846458b8.imgix.net/backgrounds/Background.jpg?auto=format,compress&w=1920&fit=crop&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <SEO
        title="Tarifs & Abonnements"
        description="Découvrez nos abonnements flexibles à Iron Gym Villenoy. À partir de 25€/mois. Accès illimité musculation, cardio, et cross training."
        keywords="tarif salle de sport 77, abonnement musculation villenoy, prix gym meaux, cross training tarif"
      />
      {/* Titre */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-yellow-400">Abonnement</h1>
        <p className="text-white/70 mt-2">Choisis ton plan d'entraînement</p>
      </div>

      {/* Carrousel */}
      <div className="relative max-w-3xl mx-auto overflow-hidden">
        <div className="carousel-container">
          <div
            className="carousel-card relative overflow-hidden bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-yellow-400/30 rounded-3xl p-8 shadow-2xl flex flex-col items-center transform transition-all hover:border-yellow-400/60 duration-300"
            key={currentIndex}
          >
            {/* Glow effect */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

            <h2 className="text-2xl font-black uppercase tracking-wider text-yellow-400 text-center mb-2">
              {plans[currentIndex].name}
            </h2>

            <div className="flex items-baseline justify-center gap-1 mb-1">
              <span className="text-5xl font-extrabold text-white">{plans[currentIndex].price}</span>
              <span className="text-lg text-white/60 font-medium">{plans[currentIndex].per}</span>
            </div>

            <p className="text-sm text-yellow-400/80 mb-6 font-medium bg-yellow-400/10 px-3 py-1 rounded-full border border-yellow-400/20">
              {plans[currentIndex].description}
            </p>

            <div className="w-full bg-white/5 rounded-2xl p-6 mb-8 border border-white/5">
              <ul className="space-y-4 text-left">
                {plans[currentIndex].features.map((feature, index) => {
                  const isExcluded = feature.includes("(Non Inclus)");
                  return (
                    <li key={index} className={`flex items-center gap-3 ${isExcluded ? "text-white/50" : "text-white/90"}`}>
                      {isExcluded ? (
                        <XCircle className="w-5 h-5 text-red-500/70 flex-shrink-0" />
                      ) : (
                        <CheckCircle2 className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                      )}
                      <span className="font-medium">
                        {feature.replace(" (Non Inclus)", "")}
                        {isExcluded && <span className="text-red-400 ml-1 text-sm">(Non Inclus)</span>}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <button
              onClick={() => setSelectedPlan(plans[currentIndex])}
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black py-4 px-6 rounded-xl font-bold uppercase tracking-wider shadow-lg hover:shadow-yellow-400/20 hover:scale-105 transition-all duration-300"
            >
              Je m'inscris
            </button>
          </div>
        </div>

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

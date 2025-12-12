import { useState, useEffect } from "react";
import ChevronLeft from "lucide-react/dist/esm/icons/chevron-left";
import ChevronRight from "lucide-react/dist/esm/icons/chevron-right";
import SEO from "../composants/SEO";

const machines = [
  {
    id: 1,
    name: "Presse à jambes",
    description: "Travaillez vos quadriceps et fessiers efficacement.",
    image: "https://source.unsplash.com/400x300/?legpress,gym",
  },
  {
    id: 2,
    name: "Poulie haute",
    description: "Idéale pour cibler le dos et les triceps.",
    image: "https://source.unsplash.com/400x300/?latpulldown,gym",
  },
  {
    id: 3,
    name: "Chest Press",
    description: "Renforcez vos pectoraux de manière contrôlée.",
    image: "https://source.unsplash.com/400x300/?chestpress,gym",
  },
  {
    id: 4,
    name: "Presse à épaules",
    description: "Cible les deltoïdes pour des épaules solides.",
    image: "/equipement-musculation-salle-sport.jpg",
  },
  {
    id: 5,
    name: "Leg Curl",
    description: "Musclez l'arrière des cuisses (ischio-jambiers).",
    image: "https://source.unsplash.com/400x300/?legcurl,gym",
  },
  {
    id: 6,
    name: "Leg Extension",
    description: "Focalise sur les quadriceps.",
    image: "https://source.unsplash.com/400x300/?legextension,gym",
  },
  {
    id: 7,
    name: "Rameur",
    description: "Travail complet du corps et cardio.",
    image: "https://source.unsplash.com/400x300/?rower,gym",
  },
  {
    id: 8,
    name: "Stepper",
    description: "Idéal pour le bas du corps et l'endurance.",
    image: "https://source.unsplash.com/400x300/?stepper,gym",
  },
  {
    id: 9,
    name: "Tapis de course",
    description: "Parfait pour l'échauffement et le cardio.",
    image: "https://source.unsplash.com/400x300/?treadmill,gym",
  },
  {
    id: 10,
    name: "Vélo elliptique",
    description: "Cardio doux pour les articulations.",
    image: "https://source.unsplash.com/400x300/?elliptical,gym",
  },
  {
    id: 11,
    name: "Cage à squat",
    description: "Polyvalente pour les squats, tractions et plus.",
    image: "https://source.unsplash.com/400x300/?squatrack,gym",
  },
  {
    id: 12,
    name: "Machine à abdos",
    description: "Renforcez vos abdominaux en toute sécurité.",
    image: "https://source.unsplash.com/400x300/?abmachine,gym",
  },
  {
    id: 13,
    name: "Curl biceps",
    description: "Isolez les biceps pour un travail ciblé.",
    image: "https://source.unsplash.com/400x300/?bicepcurl,gym",
  },
  {
    id: 14,
    name: "Triceps pushdown",
    description: "Idéal pour les triceps avec une poulie.",
    image: "https://source.unsplash.com/400x300/?triceps,gym",
  },
  {
    id: 15,
    name: "Machine adducteurs",
    description: "Renforcez l'intérieur des cuisses.",
    image: "https://source.unsplash.com/400x300/?adductors,gym",
  },
];

function Machine() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Défilement automatique toutes les 5 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + machines.length) % machines.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % machines.length);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 text-center">
      <SEO
        title="Nos Machines & Équipements"
        description="Explorez notre parc machine complet : charges libres, machines guidées, cardio. TechnoGym, Hammer Strength. Tout pour votre progression."
        keywords="machines musculation, équipement gym, technogym villenoy, hammer strength 77"
      />
      <h1 className="text-4xl font-bold text-yellow-400 mb-4">Nos Machines</h1>
      <p className="text-white/80 max-w-xl mx-auto mb-12">
        Glisse pour découvrir nos machines et leur utilisation.
      </p>

      <div className="relative max-w-lg mx-auto overflow-hidden">
        <div className="carousel-container">
          <div
            className="carousel-card bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-5 shadow-lg flex flex-col items-center"
            key={currentIndex}
          >
            <img
              src={machines[currentIndex].image}
              alt={machines[currentIndex].name}
              className="rounded-xl mb-4 w-full h-82 object-contain bg-white"
            />
            <h3 className="text-2xl font-semibold text-yellow-400 mb-2">
              {machines[currentIndex].name}
            </h3>
            <p className="text-white/80 text-sm mb-4">
              {machines[currentIndex].description}
            </p>
            <button className="bg-yellow-400 text-black py-2 px-5 rounded-full text-sm font-semibold hover:bg-yellow-300 transition">
              Comment l'utiliser
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

      {/* Petits points indicateurs */}
      <div className="flex justify-center mt-6 gap-2">
        {machines.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition ${index === currentIndex ? "bg-yellow-400" : "bg-white/40"
              }`}
          ></button>
        ))}
      </div>
    </div>
  );
}

export default Machine;

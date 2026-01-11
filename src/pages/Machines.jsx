import { useState, useEffect } from "react";
import ChevronLeft from "lucide-react/dist/esm/icons/chevron-left";
import ChevronRight from "lucide-react/dist/esm/icons/chevron-right";
import SEO from "../composants/SEO";

const machines = [
  {
    id: 1,
    name: "Cage de puissance",
    image: "https://6960087cffe0774d846458b8.imgix.net/Cage%20de%20puissance.jpg?auto=format,compress",
  },
  {
    id: 2,
    name: "Leg Extension",
    image: "https://6960087cffe0774d846458b8.imgix.net/Leg%20Extension.jpg?auto=format,compress",
  },
  {
    id: 3,
    name: "Leg Press Reverse",
    image: "https://6960087cffe0774d846458b8.imgix.net/Leg%20Press%20Reverse.jpg?auto=format,compress",
  },
  {
    id: 4,
    name: "Poignet Mag",
    image: "https://6960087cffe0774d846458b8.imgix.net/Poignet%20Mag.jpg?auto=format,compress",
  },
  {
    id: 5,
    name: "Poignet Prime",
    image: "https://6960087cffe0774d846458b8.imgix.net/Poignet%20Prime.jpg?auto=format,compress",
  },
  {
    id: 6,
    name: "Pull Over",
    image: "https://6960087cffe0774d846458b8.imgix.net/Pull%20Over.jpg?auto=format,compress",
  },
  {
    id: 7,
    name: "Reverse Hyper Extension",
    image: "https://6960087cffe0774d846458b8.imgix.net/Reverse%20Hyper%20Extension.jpg?auto=format,compress",
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

  // --- SWIPE LOGIC ---
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null); // Reset
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrev();
    }
  };
  // -------------------

  return (
    <div className="min-h-screen pt-32 pb-12 px-4 sm:px-6 lg:px-8 text-center">
      <SEO
        title="Nos Machines & Équipements"
        description="Explorez notre parc machine complet : charges libres, machines guidées, cardio. TechnoGym, Hammer Strength. Tout pour votre progression."
        keywords="machines musculation, équipement gym, technogym villenoy, hammer strength 77"
      />
      <h1 className="text-4xl font-bold text-yellow-400 mb-4">Nos Machines</h1>
      <p className="text-white/80 max-w-xl mx-auto mb-12">
        Glisse pour découvrir nos équipements de pointe.
      </p>

      <div className="relative max-w-lg mx-auto overflow-hidden">
        <div className="carousel-container">
          <div
            className="carousel-card bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-5 shadow-lg flex flex-col items-center touch-pan-y"
            key={currentIndex}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <img
              src={machines[currentIndex].image}
              alt={machines[currentIndex].name}
              className="rounded-xl mb-4 w-full h-[28rem] object-cover drop-shadow-2xl"
            />
            <h3 className="text-2xl font-semibold text-yellow-400 mb-2">
              {machines[currentIndex].name}
            </h3>
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

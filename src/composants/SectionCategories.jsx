import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getCategories, getBackgrounds } from "../services/api";
// Force rebuild - v3

const SectionCategories = React.memo(function SectionCategories() {
  const [categories, setCategories] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [backgroundUrl, setBackgroundUrl] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef(null);

  // Detect mobile view
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;

      if (direction === 'left') {
        const scrollAmount = current.offsetWidth * 0.8;
        // Loop to end if at start (optional, but standard auto-play is usually Right only)
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        // Check if we are at the end to loop back
        // Allow a small buffer (10px) for float precision
        if (current.scrollLeft + current.clientWidth >= current.scrollWidth - 10) {
          current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          const scrollAmount = current.offsetWidth * 0.8;
          current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }
    }
  };

  const handleScroll = () => {
    // Only update active index on scroll for Mobile (snap feel)
    // On Desktop, we rely on Hover
    if (scrollRef.current && isMobile) {
      const { current } = scrollRef;
      const center = current.scrollLeft + current.offsetWidth / 2;

      const cards = Array.from(current.children);
      let newActiveIndex = -1;
      let minDistance = Infinity;

      cards.forEach((card, index) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(center - cardCenter);
        if (distance < minDistance) {
          minDistance = distance;
          newActiveIndex = index;
        }
      });

      if (newActiveIndex !== -1 && newActiveIndex !== activeIndex) {
        setActiveIndex(newActiveIndex);
      }
    }
  };

  useEffect(() => {
    async function loadData() {
      try {
        // Charger les catégories
        const data = await getCategories();

        const metaData = {
          WeightLifting: {
            name: "Body Building",
            description: "Plateau musculation complet avec charges libres et machines guidées.",
          },
          CardioTraining: {
            name: "Cardio Training",
            description: "Espace cardio de dernière génération pour votre endurance et échauffement.",
          },
          PowerLifting: {
            name: "Power Lifting",
            description: "Zone dédiée à la force athlétique : Squat, Bench, Deadlift.",
          },
          CrossTraining: {
            name: "Cross Training",
            description: "Cage fonctionnelle et espace WOD pour un entraînement complet.",
          },
        };

        const allowedCategories = ['WeightLifting', 'CardioTraining', 'PowerLifting', 'CrossTraining'];

        const formatted = data
          .filter((it) => it?.name && allowedCategories.includes(it.name))
          .map((cat) => ({
            ...cat,
            name: metaData[cat.name]?.name || cat.name,
            description: metaData[cat.name]?.description || "Découvrez notre espace unique.",
          }));

        setCategories(formatted);

        // Charger le background dosGill
        const backgrounds = await getBackgrounds();
        const dosGill = backgrounds.find(bg => bg.name === 'dosGill');
        if (dosGill) {
          const cacheBuster = `&v=${Date.now()}`;
          setBackgroundUrl(`${dosGill.url}&w=1920&fit=crop&q=80${cacheBuster}`);
        }
      } catch (err) {
        console.error("Erreur Chargement Catégories:", err);
      }
    }

    loadData();
  }, []);

  // Auto-scroll logic
  useEffect(() => {
    const interval = setInterval(() => {
      // Only auto-scroll if no active item (user not interacting)
      if (activeIndex === null) {
        scroll('right');
      }
    }, 4000); // 4 seconds

    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center py-20 px-4 sm:px-8 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: backgroundUrl
            ? `url('${backgroundUrl}')`
            : "url('https://iron-gym.imgix.net/backgrounds/dosGill.jpg?auto=format,compress&w=1920&fit=crop&q=80')"
        }}
      />
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center gap-14">
          <div className="category-header text-center max-w-3xl">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-yellow-400 leading-tight mb-6">
              Nos Disciplines
            </h2>
            <p className="text-white/90 text-base sm:text-lg md:text-xl leading-relaxed px-2 sm:px-4">
              Des valeurs fortes pour des performances réelles.<br />
              Chez <span className="text-yellow-400 font-semibold">IRON GYM</span>, chaque entraînement est un pas vers la meilleure version de soi.
            </p>
          </div>

          <div className="w-full relative px-0 sm:px-12 group/carousel">
            {/* Bouton Gauche - Masqué sur mobile */}
            <button
              onClick={() => scroll('left')}
              className="hidden sm:block absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-yellow-400 text-yellow-400 hover:text-black border border-yellow-400/50 p-4 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 shadow-lg opacity-0 group-hover/carousel:opacity-100 disabled:opacity-50"
              aria-label="Scroll left"
            >
              <ChevronLeft size={28} />
            </button>

            {/* Container Carousel */}
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex overflow-x-auto gap-4 sm:gap-8 px-4 sm:px-0 pb-12 pt-4 snap-x snap-mandatory hide-scrollbar scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {categories.map((cat, index) => {
                const isActive = activeIndex === index;
                return (
                  <div
                    key={index}
                    className={`category-card relative flex-shrink-0 snap-center rounded-2xl overflow-hidden shadow-xl cursor-pointer w-[80vw] sm:w-[400px] h-[450px] sm:h-[500px] bg-[#111] transition-all duration-500 ease-out ${isActive ? 'scale-100 ring-2 ring-yellow-400/50' : 'scale-90 opacity-100 sm:opacity-70'
                      }`} // Opacity full on mobile for better visibility, 70% on desktop inactive
                    onMouseEnter={() => !isMobile && setActiveIndex(index)}
                    onMouseLeave={() => !isMobile && setActiveIndex(null)}
                    onClick={() => {
                      // Text toggle logic ONLY for mobile
                      if (isMobile) {
                        if (isActive) {
                          setActiveIndex(null);
                        } else {
                          setActiveIndex(index);
                          // Auto centering on click (mobile convenience)
                          if (scrollRef.current) {
                            const card = scrollRef.current.children[index];
                            const container = scrollRef.current;
                            container.scrollTo({
                              left: card.offsetLeft - (container.offsetWidth / 2) + (card.offsetWidth / 2),
                              behavior: 'smooth'
                            });
                          }
                        }
                      }
                    }}
                  >
                    <img
                      src={cat.url}
                      srcSet={`
                        ${cat.url}&w=400 400w,
                        ${cat.url}&w=800 800w
                      `}
                      sizes="(max-width: 640px) 80vw, 400px"
                      alt={cat.name}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{ backgroundColor: '#111' }}
                    />

                    <div
                      className={`absolute inset-0 flex flex-col items-center justify-center text-center p-6 transition-all duration-500 ${isActive ? "bg-black/60 opacity-100 backdrop-blur-sm" : "bg-black/20 opacity-0 group-hover:opacity-100"
                        }`} // bg-black/20 much lighter on idle state, visible on hover only if not active logic applies
                    >
                      <h3 className={`text-2xl sm:text-3xl font-bold text-yellow-400 mb-3 drop-shadow-lg transform transition-transform duration-500 ${isActive ? 'translate-y-0' : 'translate-y-10'}`}>
                        {cat.name}
                      </h3>
                      <p className={`text-white text-sm sm:text-lg leading-relaxed max-w-[80%] transform transition-transform duration-500 delay-100 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        {cat.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-3 mt-4">
              {categories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (scrollRef.current) {
                      const card = scrollRef.current.children[index];
                      const container = scrollRef.current;
                      container.scrollTo({
                        left: card.offsetLeft - (container.offsetWidth / 2) + (card.offsetWidth / 2),
                        behavior: 'smooth'
                      });
                    }
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${activeIndex === index ? 'w-8 bg-yellow-400' : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Bouton Droite - Masqué sur mobile */}
            <button
              onClick={() => scroll('right')}
              className="hidden sm:block absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-yellow-400 text-yellow-400 hover:text-black border border-yellow-400/50 p-4 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 shadow-lg opacity-0 group-hover/carousel:opacity-100"
              aria-label="Scroll right"
            >
              <ChevronRight size={28} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
});

export default SectionCategories;

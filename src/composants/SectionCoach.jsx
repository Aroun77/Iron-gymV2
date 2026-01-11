import React, { useState, useEffect, useRef } from "react";
import CoachFlipCard from "./CoachFlipCard";
import { getCoaches } from "../services/api";

const SectionCoach = () => {
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);
  const intervalRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;

      if (direction === 'left') {
        const scrollAmount = current.offsetWidth * 0.8;
        // Loop to end if at start (standard behavior logic can be added here if needed, but simple scroll is fine)
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        // Check if we are at the end to loop back
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
    if (scrollRef.current) {
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

  const scrollToCoach = (index) => {
    if (scrollRef.current) {
      const card = scrollRef.current.children[index];
      const container = scrollRef.current;
      container.scrollTo({
        left: card.offsetLeft - (container.offsetWidth / 2) + (card.offsetWidth / 2),
        behavior: 'smooth'
      });
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    async function loadCoaches() {
      try {
        const coachImages = await getCoaches();

        const coachData = [
          {
            name: "Coach Wilmann",
            title: "Préparateur Physique",
            handle: "coach_wilmann",
            status: "Disponible",
            imageName: "CoachW",
            phone: "+33 6 59 85 71 90",
            email: "wilmannpro@gmail.com"
          },
          {
            name: "Coach Simons",
            title: "Éducateur Sportif",
            handle: "coach_simons",
            status: "Disponible",
            imageName: "CoachS",
            phone: "+33 6 13 70 45 38",
            email: "simoncomptepro@gmail.com"
          },
          {
            name: "Coach Dikense",
            title: "Éducateur Sportif",
            handle: "coach_dikense",
            status: "Disponible",
            imageName: "CoachD",
            phone: "+33 6 63 97 93 12",
            email: "fitdrive@gmx.com"
          },
          {
            name: "Coach Mehdi",
            title: "Coach Sport-Santé",
            handle: "coach_mehdi",
            status: "Disponible",
            imageName: "CoachM",
            phone: "07 60 92 44 92",
            email: "mehdi.tarridec@gmail.com"
          },
        ];

        const coachesWithImages = coachData.map(coach => {
          const image = coachImages.find(img => img.name === coach.imageName);
          return {
            ...coach,
            avatarUrl: image ? `${image.url}?auto=format,compress` : `/Coach${coach.imageName.slice(-1)}.jpg`
          };
        });

        setCoaches(coachesWithImages);
      } catch (err) {
        console.error("Erreur chargement coachs:", err);
        setCoaches([
          {
            name: "Coach Wilmann",
            title: "Préparateur Physique",
            handle: "coach_wilmann",
            status: "Disponible",
            avatarUrl: "/CoachW.jpg",
            phone: "+33 6 59 85 71 90",
            email: "wilmannpro@gmail.com"
          },
          {
            name: "Coach Simons",
            title: "Éducateur Sportif",
            handle: "coach_simons",
            status: "Disponible",
            avatarUrl: "/CoachS.jpg",
            phone: "+33 6 13 70 45 38",
            email: "simoncomptepro@gmail.com"
          },
          {
            name: "Coach Dikense",
            title: "Éducateur Sportif",
            handle: "coach_dikense",
            status: "Disponible",
            avatarUrl: "/CoachD.jpg",
            phone: "+33 6 63 97 93 12",
            email: "dikensepro@gmail.com"
          },
          {
            name: "Coach Mehdi",
            title: "Coach Sport-Santé",
            handle: "coach_mehdi",
            status: "Disponible",
            avatarUrl: "/CoachM.jpg",
            phone: "07 60 92 44 92",
            email: "mehdi.tarridec@gmail.com"
          },
        ]);
      } finally {
        setLoading(false);
      }
    }
    loadCoaches();
  }, []);

  const startAutoScroll = () => {
    stopAutoScroll(); // Ensure no duplicate intervals
    if (!loading && coaches.length > 0) {
      intervalRef.current = setInterval(() => {
        if (scrollRef.current) {
          const { current } = scrollRef;

          const maxScrollLeft = current.scrollWidth - current.clientWidth;

          if (current.scrollLeft >= maxScrollLeft - 10) {
            current.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            const cardWidth = current.children[0]?.offsetWidth || 350;
            current.scrollBy({ left: cardWidth + 32, behavior: 'smooth' });
          }
        }
      }, 4000);
    }
  };

  const stopAutoScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Auto-scroll lifecycle management
  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, [loading, coaches.length]);

  // Pause/Resume handlers
  const pauseAutoScroll = stopAutoScroll;
  const resumeAutoScroll = startAutoScroll;


  if (loading) {
    return (
      <section className="relative py-20 px-6 sm:px-10 lg:px-16 flex flex-col items-center justify-center text-center">
        <div className="text-yellow-400 text-xl">Chargement des coachs...</div>
      </section>
    );
  }

  return (
    <section className="relative py-20 px-6 sm:px-10 lg:px-16 flex flex-col items-center justify-center text-center">
      {/* Titre */}
      <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-yellow-400 mb-14 drop-shadow-lg">
        Nos Coachs
      </h2>

      {/* Container Carousel avec flèches */}
      <div
        className="relative w-full max-w-7xl px-4 sm:px-12 group/carousel"
        onMouseEnter={pauseAutoScroll}
        onMouseLeave={resumeAutoScroll}
      >
        {/* Bouton Gauche */}


        {/* Scrollable Area */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto gap-8 py-12 px-4 snap-x snap-mandatory hide-scrollbar scroll-smooth items-center"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {coaches.map((coach, index) => {
            const isActive = activeIndex === index;
            return (
              <div
                key={index}
                className={`flex-shrink-0 snap-center w-[85vw] sm:w-[350px] transition-all duration-500 ease-out transform ${isActive ? 'scale-105 opacity-100' : 'scale-95 opacity-70'
                  }`}
              >
                <CoachFlipCard
                  name={coach.name}
                  title={coach.title}
                  handle={coach.handle}
                  status={coach.status}
                  avatarUrl={coach.avatarUrl}
                  phone={coach.phone}
                  email={coach.email}
                  onContactClick={() => console.log(`Contact avec ${coach.name}`)}
                />
              </div>
            );
          })}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-3 mt-2">
          {coaches.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToCoach(index)}
              className={`h-3 rounded-full transition-all duration-300 ${activeIndex === index ? 'w-8 bg-yellow-400' : 'w-3 bg-white/20 hover:bg-white/40'
                }`}
              aria-label={`Go to coach ${index + 1}`}
            />
          ))}
        </div>

        {/* Bouton Droite */}

      </div>
    </section>
  );
};

export default SectionCoach;

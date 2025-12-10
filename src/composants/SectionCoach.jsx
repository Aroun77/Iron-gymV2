import React, { useState, useEffect } from "react";
import CoachFlipCard from "./CoachFlipCard";
import { getCoaches } from "../services/api";

const SectionCoach = () => {
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCoaches() {
      try {
        const coachImages = await getCoaches();

        // Mapping des données des coachs avec leurs images
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
            email: "dikensepro@gmail.com"
          },
        ];

        // Associer chaque coach à son image Imgix
        const coachesWithImages = coachData.map(coach => {
          const image = coachImages.find(img => img.name === coach.imageName);
          return {
            ...coach,
            avatarUrl: image ? `${image.url}&w=800&h=800&fit=crop&q=85` : `/Coach${coach.imageName.slice(-1)}.jpg`
          };
        });

        setCoaches(coachesWithImages);
      } catch (err) {
        console.error("Erreur chargement coachs:", err);
        // Fallback vers les images locales en cas d'erreur
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
        ]);
      } finally {
        setLoading(false);
      }
    }
    loadCoaches();
  }, []);

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

      {/* Cartes de coachs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center max-w-7xl w-full">
        {coaches.map((coach, index) => (
          <CoachFlipCard
            key={index}
            name={coach.name}
            title={coach.title}
            handle={coach.handle}
            status={coach.status}
            avatarUrl={coach.avatarUrl}
            phone={coach.phone}
            email={coach.email}
            onContactClick={() =>
              console.log(`Contact avec ${coach.name}`)
            }
          />
        ))}
      </div>
    </section>

  );
};

export default SectionCoach;

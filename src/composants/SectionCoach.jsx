import React from "react";
import ProfileCard from "./ProfileCard";

const SectionCoach = () => {
  const coaches = [
    {
      name: "Coach Wilmann",
      title: "Préparateur Physique",
      handle: "coach_wilmann",
      status: "Disponible",
      contactText: "Contacter",
      avatarUrl: "/CoachW.jpg",
    },
    {
      name: "Coach Simons",
      title: "Éducateur Sportif",
      handle: "coach_simons",
      status: "Disponible",
      contactText: "Contacter",
      avatarUrl: "/CoachS.jpg",
    },
    {
      name: "Coach Dikense",
      title: "Éducateur Sportif",
      handle: "coach_dikense",
      status: "Disponible",
      contactText: "Contacter",
      avatarUrl: "/CoachD.jpg",
    },
  ];

  return (
    <section className="relative py-20 px-6 sm:px-10 lg:px-16 flex flex-col items-center justify-center text-center">
      {/* Titre */}
      <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-yellow-400 mb-14 drop-shadow-lg">
        Nos Coachs
      </h2>

      {/* Cartes de coachs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center max-w-7xl w-full">
        {coaches.map((coach, index) => (
          <ProfileCard
            key={index}
            name={coach.name}
            title={coach.title}
            handle={coach.handle}
            status={coach.status}
            contactText={coach.contactText}
            avatarUrl={coach.avatarUrl}
            showUserInfo={true}
            enableTilt={true}
            enableMobileTilt={true}
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

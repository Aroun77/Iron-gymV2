import React from "react";

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
    image: "/assets/machine1.jpg",
  },
  {
    id: 5,
    name: "Leg Curl",
    description: "Musclez l’arrière des cuisses (ischio-jambiers).",
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
    description: "Idéal pour le bas du corps et l’endurance.",
    image: "https://source.unsplash.com/400x300/?stepper,gym",
  },
  {
    id: 9,
    name: "Tapis de course",
    description: "Parfait pour l’échauffement et le cardio.",
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
    description: "Renforcez l’intérieur des cuisses.",
    image: "https://source.unsplash.com/400x300/?adductors,gym",
  },
];

function Machine() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 text-center">
      <h1 className="text-4xl font-bold text-yellow-400 mb-4">Nos Machines</h1>
      <p className="text-white/80 max-w-xl mx-auto mb-12">
        Sélectionnez une machine pour en apprendre plus sur son utilisation et ses bienfaits.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {machines.map((machine) => (
          <div
            key={machine.id}
            className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-4 shadow-lg transition hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02]"
          >
            <img
              src={machine.image}
              alt={machine.name}
              className="rounded-xl mb-4 w-full h-48 object-cover"
            />
            <h3 className="text-xl font-semibold text-yellow-400 mb-2">{machine.name}</h3>
            <p className="text-white/80 text-sm mb-4">{machine.description}</p>
            <button className="bg-yellow-400 text-black py-2 px-4 rounded-full text-sm font-medium hover:bg-yellow-300 transition">
              Comment l’utiliser
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Machine;

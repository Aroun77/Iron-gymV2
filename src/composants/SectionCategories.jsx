function SectionCategories() {
  const categories = [
    { name: "SPORT", image: "/images/sport.jpg" },
    { name: "MUSIQUE", image: "/images/musique.jpg" },
    { name: "DESIGN", image: "/images/design.jpg" },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-xl shadow-lg"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-64 sm:h-72 md:h-96 object-cover transform group-hover:scale-105 transition duration-500"
            />
            <span className="absolute bottom-4 left-4 text-white text-xl font-bold tracking-wide bg-black/50 px-3 py-1 rounded">
              {cat.name}
            </span>
          </div>
        ))}
      </div>

      {/* Texte à droite pour desktop */}
      <div className="hidden lg:block text-right mt-12 pr-4">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-gray-100 space-y-2">
          <div>SPORT</div>
          <div>MUSIQUE</div>
          <div>DESIGN</div>
        </h2>
      </div>
    </div>
  );
}

export default SectionCategories;

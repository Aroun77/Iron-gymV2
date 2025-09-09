import React from "react";

function Tableau() {
  const performances = [
    {
      exercice: "SQUAT",
      col1: "Kyky - 346kg",
      col2: "Hugo - 270kg",
      col3: "Hugo - 270kg",
      col4: "Bank - 250kg",
      col5: "Wilmam - 229,5kg",
    },
    {
      exercice: "BENCH",
      col1: "Gil - 208kg",
      col2: "Remi - 200kg",
      col3: "Wilmam - 190kg",
      col4: "Max - 190kg",
      col5: "Redouane - 180kg",
    },
    {
      exercice: "DEADLIFT",
      col1: "Gil - 360kg",
      col2: "Kyky - 320kg",
      col3: "Hugo - 312,5kg",
      col4: "Wilmam - 302kg",
      col5: "Redouane - 230kg",
    },
    {
      exercice: "SNATCH",
      col1: "Max - 110kg",
      col2: "Lilloo - 62kg",
      col3: "Wilmam - 30kg",
      col4: "Dahmer - 30kg",
      col5: "/",
    },
    {
      exercice: "CLEAN JERK",
      col1: "Max - 115kg",
      col2: "Lilloo - 83kg",
      col3: "Simon - 82kg",
      col4: "Dahmer - 80kg",
      col5: "Gimli - 110kg",
    },
    {
      exercice: "LOG PRESS",
      col1: "Wilmam - 125kg",
      col2: "130kg",
      col3: "Max - 135kg",
      col4: "Amaury - 130kg",
      col5: "Kiki - 144kg",
    },
    {
      exercice: "ZERCHER",
      col1: "Wilmam - 227kg",
      col2: "Dahmer - 220kg",
      col3: "Redouane - 215kg",
      col4: "Kiki - 235kg",
      col5: "Gimli - 200kg",
    },
    {
      exercice: "TRACTION 1RM",
      col1: "Fabio - 75kg",
      col2: "Dahmer - 70kg",
      col3: "Karl - 65kg",
      col4: "Medha - 61kg",
      col5: "Fabrice - 60kg",
    },
    {
      exercice: "PS 1RM",
      col1: "Fabio - 115kg",
      col2: "Kiki - 100kg",
      col3: "Bank - 100kg",
      col4: "Tobii - 85kg",
      col5: "Dorian - 82,5kg",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-6">
      <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-center mb-6 sm:mb-10 text-yellow-500">
        🏆 Tableau des Performances
      </h1>

      <div className="w-full max-w-6xl overflow-x-auto scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-transparent">
        <div className="backdrop-blur-xl bg-white/5 border border-gray-300/30 rounded-2xl shadow-2xl min-w-max">
          <table className="w-full text-gray-800 text-xs sm:text-sm md:text-base">
            <thead>
              <tr className="bg-gray-200/70 text-gray-900 font-semibold">
                <th className="p-3 sm:p-4 text-left">Exercice</th>
                <th className="p-3 sm:p-4 text-center">1</th>
                <th className="p-3 sm:p-4 text-center">2</th>
                <th className="p-3 sm:p-4 text-center">3</th>
                <th className="p-3 sm:p-4 text-center">4</th>
                <th className="p-3 sm:p-4 text-center">5</th>
              </tr>
            </thead>
            <tbody>
              {performances.map((row, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-300/20 hover:bg-gray-200/40 transition"
                >
                  <td className="p-3 sm:p-4 font-semibold text-yellow-600 whitespace-nowrap">
                    {row.exercice}
                  </td>
                  <td className="p-3 sm:p-4 text-center text-yellow-300">{row.col1}</td>
                  <td className="p-3 sm:p-4 text-center text-yellow-300">{row.col2}</td>
                  <td className="p-3 sm:p-4 text-center text-yellow-300">{row.col3}</td>
                  <td className="p-3 sm:p-4 text-center text-yellow-300">{row.col4}</td>
                  <td className="p-3 sm:p-4 text-center text-yellow-300">{row.col5}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Tableau;

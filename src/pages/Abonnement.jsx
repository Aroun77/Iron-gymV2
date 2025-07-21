import { useState } from "react";

function Abonnement() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      name: "ESSENTIEL",
      price: "7€99",
      per: "/semaine",
      description: "Soit 31,96€/4 semaines",
      features: [
        "xxxxxxxxxxxxxxxxxxx",
        "xxxxxxxxxxxxxxxxxxxx",
        "xxxxxxxxxxxxxxxxxxxx",
      ],
    },
    {
      name: "ORIGINAL",
      price: "9€99",
      per: "/semaine",
      description: "Soit 39,96€/4 semaines",
      features: [
        "xxxxxxxxxxxxxxxxxxx",
        "xxxxxxxxxxxxxxxxxxxx",
        "xxxxxxxxxxxxxxxxxxxx",
        "xxxxxxxxxxxxxxxxxxx",
      ],
    },
    {
      name: "ULTRA",
      price: "10€99",
      per: "/semaine",
      description: "Soit 43,96€/4 semaines",
      features: [
        "xxxxxxxxxxxxxxxxxxx",
        "xxxxxxxxxxxxxxxxxxxx",
        "xxxxxxxxxxxxxxxxxxxx",
        "xxxxxxxxxxxxxxxxxxx",
      ],
    },
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-yellow-400">Abonnement</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-6 flex flex-col justify-between shadow-lg transition hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.03] hover:rotate-1"
          >
            <div>
              <h2 className="text-xl font-bold uppercase text-yellow-400 tracking-wide">
                {plan.name}
              </h2>
              <div className="border-t-2 border-yellow-400 w-16 mt-2 mb-4" />

              <div className="text-4xl font-extrabold text-yellow-400 flex items-baseline gap-1">
                {plan.price}
                <span className="text-base font-normal text-white">{plan.per}</span>
              </div>

              <p className="text-sm text-white/80 mt-2">{plan.description}</p>

              <ul className="mt-6 space-y-3 text-left text-white/90">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-yellow-400">✔</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => setSelectedPlan(plan)}
              className="mt-8 bg-yellow-400 text-black text-center py-3 rounded-xl font-semibold uppercase tracking-wide hover:bg-yellow-300 transition"
            >
              Je m’inscris
            </button>
          </div>
        ))}
      </div>

      {/* Pop-up Paiement */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center relative">
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
              <span className="text-base font-medium"> {selectedPlan.per}</span>
            </p>

            <button
              onClick={() => {
                alert("Paiement validé !");
                setSelectedPlan(null);
              }}
              className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-300 transition"
            >
              Confirmer et payer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Abonnement;

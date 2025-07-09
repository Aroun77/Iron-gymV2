function Abonnement() {
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
      link: "#essentiel",
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
        "xxxxxxxxxxxxxxxxxxx"
      ],
      link: "#original",
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
        "xxxxxxxxxxxxxxxxxxx"
      ],
      link: "#ultra",
    },
  ];
/*bg-black/80*/
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-yellow-400">Abonnement</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="
              bg-white/20
              backdrop-blur-md
              border border-white/30
              rounded-2xl
              p-6
              flex flex-col justify-between
              shadow-lg
              transition
              hover:shadow-2xl
              hover:-translate-y-2
              hover:scale-[1.03]
              hover:rotate-1
            "
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

            <a
              href={plan.link}
              className="mt-8 block bg-yellow-400 text-black text-center py-3 rounded-xl font-semibold uppercase tracking-wide hover:bg-yellow-300 transition"
            >
              Je m’inscris
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Abonnement;

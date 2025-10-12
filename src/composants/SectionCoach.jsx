import { motion } from "framer-motion";
import ProfileCard from "./ProfileCard";

function SectionCoach() {
  const coaches = [
    {
      name: "Marc Dubois",
      title: "Coach Principal",
      handle: "marcdubois",
      status: "Disponible",
      contactText: "Réserver",
      avatarUrl: "/coaches/coach1.jpg",
      specialties: "Musculation & Force"
    },
    {
      name: "Sophie Martin",
      title: "Coach Cardio",
      handle: "sophiemartin",
      status: "En séance",
      contactText: "Réserver",
      avatarUrl: "/coaches/coach2.jpg",
      specialties: "HIIT & Cardio"
    },
    {
      name: "Thomas Leroy",
      title: "Coach Old School",
      handle: "thomasleroy",
      status: "Disponible",
      contactText: "Réserver",
      avatarUrl: "/coaches/coach3.jpg",
      specialties: "Bodybuilding Classic"
    }
  ];

  const handleContactClick = (coachName) => {
    console.log(`Contact demandé pour ${coachName}`);
    // Ajoute ici ta logique de réservation
    alert(`Réservation pour ${coachName}`);
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 overflow-hidden">
      
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black opacity-95" />
      
      {/* Pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Contenu principal */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="flex flex-col items-center gap-8 sm:gap-12 md:gap-16">
          
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1 }}
            className="text-center max-w-3xl px-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="inline-block mb-3 sm:mb-4 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full"
              style={{
                background: 'rgba(210, 168, 19, 0.1)',
                border: '1px solid rgba(210, 168, 19, 0.3)'
              }}
            >
              <span className="text-yellow-400 font-semibold text-xs sm:text-sm uppercase tracking-wider">
                Notre Équipe
              </span>
            </motion.div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-4 sm:mb-6">
              Nos <span className="text-yellow-400">Coachs</span>
            </h2>
            
            <p className="text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto px-2">
              Des professionnels passionnés pour t'accompagner vers tes objectifs.
              <span className="block mt-2 text-yellow-400 font-semibold">
                Expertise • Motivation • Résultats
              </span>
            </p>
          </motion.div>

          {/* Grille des Coaches */}
          <div className="w-full flex justify-center items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 w-full max-w-6xl place-items-center">
              {coaches.map((coach, index) => (
                <motion.div
                  key={coach.handle}
                  initial={{ opacity: 0, y: 60, rotateY: -15 }}
                  whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.2,
                    ease: "easeOut"
                  }}
                  className="w-full max-w-sm flex justify-center items-center px-4"
                  style={{ margin: '0 auto' }}
                >
                  <ProfileCard
                    name={coach.name}
                    title={coach.title}
                    handle={coach.handle}
                    status={coach.status}
                    contactText={coach.contactText}
                    avatarUrl={coach.avatarUrl}
                    showUserInfo={true}
                    enableTilt={true}
                    enableMobileTilt={false}
                    onContactClick={() => handleContactClick(coach.name)}
                  />
                  
                  {/* Badge spécialité */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.4 }}
                    className="mt-3 sm:mt-4 text-center"
                  >
                    <span 
                      className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-yellow-400 text-xs sm:text-sm font-medium"
                      style={{
                        background: 'linear-gradient(to right, rgba(210, 168, 19, 0.2), rgba(218, 165, 32, 0.2))',
                        border: '1px solid rgba(210, 168, 19, 0.4)'
                      }}
                    >
                      {coach.specialties}
                    </span>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-4 sm:mt-6 md:mt-8 px-4"
          >
            <p className="text-gray-400 mb-4 sm:mb-6 text-base sm:text-lg">
              Tu as une question ? Besoin d'un programme personnalisé ?
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-yellow-400 text-black font-bold rounded-full text-base sm:text-lg shadow-lg hover:bg-yellow-500 transition-all duration-300 cursor-pointer"
              style={{
                boxShadow: '0 10px 40px rgba(210, 168, 19, 0.3)'
              }}
            >
              Contacte-nous
            </motion.button>
          </motion.div>

        </div>
      </div>

      {/* Éléments décoratifs */}
      <div 
        className="absolute top-20 left-10 w-32 h-32 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'rgba(210, 168, 19, 0.05)' }}
      />
      <div 
        className="absolute bottom-20 right-10 w-40 h-40 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'rgba(210, 168, 19, 0.05)' }}
      />
    </section>
  );
}

export default SectionCoach;
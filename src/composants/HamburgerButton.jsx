import { motion } from "framer-motion";

function HamburgerButton({ isOpen, toggle }) {
  return (
   <button
  onClick={toggle}
  className="relative w-8 h-8 flex flex-col justify-between items-center z-50 focus:outline-none bg-transparent"
  aria-label="Menu"
>

      {/* Ligne 1 */}
      <motion.span
        animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full h-0.5 bg-white rounded origin-center"
      />
      {/* Ligne 2 */}
      <motion.span
        animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full h-0.5 bg-white rounded origin-center"
      />
      {/* Ligne 3 */}
      <motion.span
        animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full h-0.5 bg-white rounded origin-center"
      />
    </button>
  );
}

export default HamburgerButton;

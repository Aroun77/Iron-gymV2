import { motion } from "framer-motion";

export default function HamburgerButton({ isOpen, toggle }) {
  return (
    <motion.button
      onClick={toggle}
      className="flex flex-col justify-center items-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition"
    >
      <motion.span
        animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
        className="w-6 h-[2px] bg-white rounded-full mb-1"
        transition={{ duration: 0.3 }}
      />
      <motion.span
        animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
        className="w-6 h-[2px] bg-white rounded-full mb-1"
        transition={{ duration: 0.3 }}
      />
      <motion.span
        animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
        className="w-6 h-[2px] bg-white rounded-full"
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
}

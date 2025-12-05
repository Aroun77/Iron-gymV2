export default function HamburgerButton({ isOpen, toggle }) {
    return (
        <button
            onClick={toggle}
            className="flex flex-col justify-center items-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition"
        >
            <span
                className={`w-6 h-[2px] bg-white rounded-full mb-1 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-[7px]' : 'rotate-0 translate-y-0'
                    }`}
            />
            <span
                className={`w-6 h-[2px] bg-white rounded-full mb-1 transition-all duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'
                    }`}
            />
            <span
                className={`w-6 h-[2px] bg-white rounded-full transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-[7px]' : 'rotate-0 translate-y-0'
                    }`}
            />
        </button>
    );
}
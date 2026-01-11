import React, { useState } from "react";

const CoachFlipCard = ({ name, title, handle, status, avatarUrl, phone, email, onContactClick }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [showPopup, setShowPopup] = useState(null); // 'contact' ou 'info'

    const handleButtonClick = (type, e) => {
        e.stopPropagation();
        setShowPopup(type);
    };

    const closePopup = (e) => {
        e.stopPropagation();
        setShowPopup(null);
    };

    return (
        <>
            <div
                className="flip-card-container w-full h-[450px] sm:h-96 cursor-pointer"
                onClick={() => setIsFlipped(!isFlipped)}
                onMouseEnter={() => setIsFlipped(true)}
                onMouseLeave={() => setIsFlipped(false)}
            >
                <div className={`flip-card ${isFlipped ? 'flipped' : ''}`}>
                    {/* Face avant - Photo du coach */}
                    <div className="flip-card-front">
                        <img
                            src={avatarUrl}
                            alt={name}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                            <h3 className="text-2xl font-bold text-yellow-400">{name}</h3>
                            <p className="text-white/90 text-sm">{title}</p>
                        </div>
                    </div>

                    {/* Face arrière - Informations */}
                    <div className="flip-card-back">
                        <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                            <div className="w-24 h-24 rounded-full bg-yellow-400/20 flex items-center justify-center mb-6">
                                <svg
                                    className="w-12 h-12 text-yellow-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                            </div>

                            <h3 className="text-3xl font-bold text-yellow-400 mb-2">{name}</h3>
                            <p className="text-xl text-white/90 mb-4">{title}</p>
                            <p className="text-white/70 mb-2">@{handle}</p>

                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                                <span className="text-green-400 text-sm font-semibold">{status}</span>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={(e) => handleButtonClick('contact', e)}
                                    className="bg-yellow-400 text-black px-6 py-3 rounded-full font-bold hover:bg-yellow-300 transition-all hover:scale-105 shadow-lg"
                                >
                                    Contact
                                </button>
                                <button
                                    onClick={(e) => handleButtonClick('info', e)}
                                    className="bg-white/10 text-white border-2 border-yellow-400 px-6 py-3 rounded-full font-bold hover:bg-yellow-400 hover:text-black transition-all hover:scale-105 shadow-lg"
                                >
                                    Information
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mini Popup animée */}
            {showPopup && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in"
                    onClick={closePopup}
                >
                    <div
                        className="bg-gradient-to-br from-gray-900 to-black border-2 border-yellow-400 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl animate-scale-in"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold text-yellow-400">
                                {showPopup === 'contact' ? '📧 Contact' : 'ℹ️ Informations'}
                            </h3>
                            <button
                                onClick={closePopup}
                                className="text-yellow-400 hover:text-yellow-300 text-4xl transition font-bold leading-none"
                            >
                                &times;
                            </button>
                        </div>

                        {/* Contenu */}
                        {showPopup === 'contact' ? (
                            <div className="space-y-4">
                                <p className="text-white/90">
                                    Pour contacter <span className="text-yellow-400 font-bold">{name}</span>,
                                    vous pouvez utiliser les moyens suivants :
                                </p>
                                <div className="bg-white/5 rounded-lg p-4 space-y-3">
                                    <div className="flex items-center gap-3">
                                        <span className="text-yellow-400">📧</span>
                                        <span className="text-white/80">{email || `${handle}@irongym.com`}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-yellow-400">📱</span>
                                        <span className="text-white/80">{phone || "+33 6 XX XX XX XX"}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-yellow-400">💬</span>
                                        <span className="text-white/80">Disponible sur WhatsApp</span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <p className="text-white/90">
                                    <span className="text-yellow-400 font-bold">{name}</span> - {title}
                                </p>
                                <div className="bg-white/5 rounded-lg p-4 space-y-3">
                                    <div>
                                        <h4 className="text-yellow-400 font-semibold mb-2">Spécialités</h4>
                                        <ul className="text-white/80 space-y-1 text-sm list-none p-0">
                                            <li>Musculation & Force</li>
                                            <li>Préparation physique</li>
                                            <li>Coaching personnalisé</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="text-yellow-400 font-semibold mb-2">Disponibilité</h4>
                                        <p className="text-white/80 text-sm">
                                            Lun - Ven : 9h - 20h<br />
                                            Sam : 10h - 18h
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Footer */}
                        <button
                            onClick={closePopup}
                            className="mt-6 w-full bg-yellow-400 text-black py-3 rounded-lg font-bold hover:bg-yellow-300 transition"
                        >
                            Fermer
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default CoachFlipCard;

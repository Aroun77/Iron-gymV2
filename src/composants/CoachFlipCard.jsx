import React, { useState } from "react";

const CoachFlipCard = ({ name, title, handle, status, avatarUrl, onContactClick }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div
            className="flip-card-container w-full max-w-sm h-96 cursor-pointer"
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
                        className="w-full h-full object-cover"
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

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onContactClick();
                            }}
                            className="bg-yellow-400 text-black px-8 py-3 rounded-full font-bold hover:bg-yellow-300 transition-all hover:scale-105 shadow-lg"
                        >
                            Contacter
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoachFlipCard;

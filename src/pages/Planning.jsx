import React, { useState, useEffect } from 'react';
import { Calendar, Dumbbell, Clock } from 'lucide-react';
import SEO from '../composants/SEO';

const Planning = () => {
    const [currentDay, setCurrentDay] = useState(new Date().getDay());

    useEffect(() => {
        // Update current day at midnight
        const updateDay = () => setCurrentDay(new Date().getDay());
        const interval = setInterval(updateDay, 60000); // Check every minute
        return () => clearInterval(interval);
    }, []);

    const schedule = [
        {
            day: 'Lundi',
            dayNumber: 1,
            course: 'Crossfit & Cross Training',
            time: '20h/21h',
            icon: '🏋️',
            color: 'from-yellow-500 to-yellow-600'
        },
        {
            day: 'Mardi',
            dayNumber: 2,
            course: 'Crossfit & Cross Training',
            time: '20h/21h',
            icon: '🏋️',
            color: 'from-yellow-500 to-yellow-600'
        },
        {
            day: 'Mercredi',
            dayNumber: 3,
            course: null,
            time: null,
            icon: '😴',
            color: 'from-gray-700 to-gray-800'
        },
        {
            day: 'Jeudi',
            dayNumber: 4,
            course: 'Haltérophilie',
            time: '20h/21h',
            icon: '🏋️‍♂️',
            color: 'from-cyan-500 to-blue-600'
        },
        {
            day: 'Vendredi',
            dayNumber: 5,
            course: null,
            time: null,
            icon: '😴',
            color: 'from-gray-700 to-gray-800'
        },
        {
            day: 'Samedi',
            dayNumber: 6,
            course: null,
            time: null,
            icon: '😴',
            color: 'from-gray-700 to-gray-800'
        },
        {
            day: 'Dimanche',
            dayNumber: 0,
            course: null,
            time: null,
            icon: '😴',
            color: 'from-gray-700 to-gray-800'
        }
    ];

    return (
        <>
            <SEO
                title="Planning des Cours - Iron Gym Villenoy"
                description="Découvrez le planning hebdomadaire des cours collectifs à Iron Gym : Crossfit, Cross Training et Haltérophilie. Cours tous les lundis, mardis et jeudis de 20h à 21h."
                keywords="planning iron gym, cours collectifs, crossfit villenoy, haltérophilie, cross training, horaires cours"
            />

            <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pt-24 pb-16 px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="max-w-7xl mx-auto text-center mb-16">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Calendar className="w-12 h-12 text-yellow-400" />
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-yellow-400">
                            Planning des Cours
                        </h1>
                    </div>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto">
                        Rejoignez nos cours collectifs et progressez avec notre coach Simons
                    </p>
                </div>

                {/* Desktop Grid View */}
                <div className="hidden md:grid md:grid-cols-7 gap-4 max-w-7xl mx-auto mb-8">
                    {schedule.map((item) => {
                        const isToday = item.dayNumber === currentDay;
                        const hasCourse = item.course !== null;

                        return (
                            <div
                                key={item.day}
                                className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${isToday ? 'ring-4 ring-yellow-400 scale-105' : 'hover:scale-105'
                                    } ${hasCourse ? 'cursor-pointer' : ''}`}
                            >
                                {/* Background Gradient */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-90`} />

                                {/* Content */}
                                <div className="relative p-6 h-full flex flex-col">
                                    {/* Day Name */}
                                    <div className="text-center mb-4">
                                        <h3 className={`text-lg font-bold ${isToday ? 'text-yellow-300' : 'text-white'}`}>
                                            {item.day}
                                        </h3>
                                        {isToday && (
                                            <span className="text-xs text-yellow-300 font-semibold">Aujourd'hui</span>
                                        )}
                                    </div>

                                    {/* Icon */}
                                    <div className="text-5xl text-center mb-4">
                                        {item.icon}
                                    </div>

                                    {/* Course Info */}
                                    {hasCourse ? (
                                        <div className="flex-1 flex flex-col justify-end text-center">
                                            <p className="text-white font-bold text-sm mb-2">{item.course}</p>
                                            <div className="flex items-center justify-center gap-2 text-white/90">
                                                <Clock className="w-4 h-4" />
                                                <span className="text-sm font-semibold">{item.time}</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex-1 flex items-end justify-center">
                                            <p className="text-white/60 text-sm font-medium">Repos</p>
                                        </div>
                                    )}
                                </div>

                                {/* Today Indicator */}
                                {isToday && (
                                    <div className="absolute top-0 right-0 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-bl-lg">
                                        Aujourd'hui
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Mobile List View */}
                <div className="md:hidden max-w-md mx-auto space-y-4">
                    {schedule.map((item) => {
                        const isToday = item.dayNumber === currentDay;
                        const hasCourse = item.course !== null;

                        return (
                            <div
                                key={item.day}
                                className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${isToday ? 'ring-4 ring-yellow-400' : ''
                                    }`}
                            >
                                {/* Background Gradient */}
                                <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-90`} />

                                {/* Content */}
                                <div className="relative p-6 flex items-center gap-4">
                                    {/* Icon */}
                                    <div className="text-4xl flex-shrink-0">
                                        {item.icon}
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1">
                                        <h3 className={`text-xl font-bold mb-1 ${isToday ? 'text-yellow-300' : 'text-white'}`}>
                                            {item.day}
                                            {isToday && <span className="ml-2 text-sm">(Aujourd'hui)</span>}
                                        </h3>
                                        {hasCourse ? (
                                            <>
                                                <p className="text-white font-semibold mb-1">{item.course}</p>
                                                <div className="flex items-center gap-2 text-white/90">
                                                    <Clock className="w-4 h-4" />
                                                    <span className="text-sm font-medium">{item.time}</span>
                                                </div>
                                            </>
                                        ) : (
                                            <p className="text-white/60 text-sm">Repos</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Info Section */}
                <div className="max-w-4xl mx-auto mt-16 bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border-2 border-yellow-400/30">
                    <div className="flex items-center gap-3 mb-6">
                        <Dumbbell className="w-8 h-8 text-yellow-400" />
                        <h2 className="text-2xl font-bold text-yellow-400">Informations Pratiques</h2>
                    </div>

                    <div className="space-y-4 text-white/80">
                        <div className="flex items-start gap-3">
                            <span className="text-yellow-400 font-bold">📍</span>
                            <div>
                                <p className="font-semibold text-white">Lieu</p>
                                <p>Iron Gym - 71 Rue Aristide Briand, 77124 Villenoy</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <span className="text-yellow-400 font-bold">👥</span>
                            <div>
                                <p className="font-semibold text-white">Inscription</p>
                                <p>Réservation auprès du coach ou en ligne </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <span className="text-yellow-400 font-bold">💪</span>
                            <div>
                                <p className="font-semibold text-white">Niveau</p>
                                <p>Tous niveaux - Débutants bienvenus</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <span className="text-yellow-400 font-bold">⏰</span>
                            <div>
                                <p className="font-semibold text-white">Durée</p>
                                <p>1 heure par session</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 p-4 bg-yellow-400/10 rounded-lg border border-yellow-400/30">
                        <p className="text-yellow-400 font-semibold text-center">
                            ⚠️ Planning valable toute l'année - Sous réserve de modifications exceptionnelles
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Planning;

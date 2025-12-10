import React from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import SEO from "../composants/SEO";

const Contact = () => {
    const contactInfo = {
        address: "71 Rue Aristide Briand, 77124 Villenoy",
        phone: "01 75 78 31 28",
        email: "iron-gym@hotmail.fr",
        mapsLink: "https://www.google.com/maps/place/Iron+Gym/@48.9477625,2.8678739,17z/data=!3m1!4b1!4m6!3m5!1s0x47e8a0e12502f93b:0x43c5a396e934b2ac!8m2!3d48.947759!4d2.8704488!16s%2Fg%2F12hnctg6v?entry=ttu&g_ep=EgoyMDI1MTIwMi4wIKXMDSoASAFQAw%3D%3D",
        hours: {
            weekday: "7h - 23h",
            weekend: "9h - 20h"
        }
    };

    return (
        <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
            <SEO
                title="Contact & Horaires"
                description="Contactez Iron Gym Villenoy (77124). Adresse : 71 Rue Aristide Briand. Ouvert 7j/7. Téléphone : 01 75 78 31 28. Venez vous entraîner !"
                keywords="contact iron gym, adresse salle de sport villenoy, horaires musculation 77"
            />
            {/* Header */}
            <div className="text-center mb-16">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-yellow-400 mb-4 drop-shadow-lg">
                    Contactez-nous
                </h1>
                <p className="text-white/80 text-lg max-w-2xl mx-auto">
                    Vous avez des questions ? N'hésitez pas à nous contacter, notre équipe est là pour vous !
                </p>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Google Maps */}
                <div className="relative group">
                    <div
                        className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border-2 border-yellow-400/30 cursor-pointer hover:border-yellow-400 transition-all duration-300"
                        onClick={() => window.open(contactInfo.mapsLink, '_blank')}
                    >
                        <div className="aspect-video relative bg-gray-800">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2619.8447891234567!2d2.8678739!3d48.9477625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e8a0e12502f93b%3A0x43c5a396e934b2ac!2sIron%20Gym!5e0!3m2!1sfr!2sfr!4v1234567890"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="eager"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="absolute inset-0 pointer-events-none"
                                title="Iron Gym Location"
                            ></iframe>

                            {/* Overlay pour indiquer que c'est cliquable */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-yellow-400 text-black px-6 py-3 rounded-full font-bold shadow-lg">
                                    Ouvrir dans Google Maps
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-6">
                    {/* Address Card */}
                    <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-yellow-400/30 rounded-2xl p-6 hover:border-yellow-400 transition-all duration-300 shadow-xl">
                        <div className="flex items-start gap-4">
                            <div className="bg-yellow-400/20 p-3 rounded-full">
                                <MapPin className="w-6 h-6 text-yellow-400" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-yellow-400 mb-2">Adresse</h3>
                                <p className="text-white/90 mb-4">{contactInfo.address}</p>
                                <button
                                    onClick={() => window.open(contactInfo.mapsLink, '_blank')}
                                    className="w-full bg-yellow-400 text-black px-6 py-3 rounded-lg font-bold hover:bg-yellow-300 transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                                >
                                    <MapPin className="w-5 h-5" />
                                    Voir sur la carte
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Phone Card */}
                    <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-yellow-400/30 rounded-2xl p-6 hover:border-yellow-400 transition-all duration-300 shadow-xl">
                        <div className="flex items-start gap-4">
                            <div className="bg-yellow-400/20 p-3 rounded-full">
                                <Phone className="w-6 h-6 text-yellow-400" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-yellow-400 mb-2">Téléphone</h3>
                                <a
                                    href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                                    className="text-white/90 hover:text-yellow-400 transition text-lg no-underline"
                                >
                                    {contactInfo.phone}
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Email Card */}
                    <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-yellow-400/30 rounded-2xl p-6 hover:border-yellow-400 transition-all duration-300 shadow-xl">
                        <div className="flex items-start gap-4">
                            <div className="bg-yellow-400/20 p-3 rounded-full">
                                <Mail className="w-6 h-6 text-yellow-400" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-yellow-400 mb-2">Email</h3>
                                <a
                                    href={`mailto:${contactInfo.email}`}
                                    className="text-white/90 hover:text-yellow-400 transition no-underline"
                                >
                                    {contactInfo.email}
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Hours Card */}
                    <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-yellow-400/30 rounded-2xl p-6 hover:border-yellow-400 transition-all duration-300 shadow-xl">
                        <div className="flex items-start gap-4">
                            <div className="bg-yellow-400/20 p-3 rounded-full">
                                <Clock className="w-6 h-6 text-yellow-400" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-yellow-400 mb-3">Horaires</h3>
                                <div className="space-y-2 text-white/90">
                                    <div className="flex justify-between">
                                        <span>Lundi - Vendredi</span>
                                        <span className="font-semibold text-yellow-400">{contactInfo.hours.weekday}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Samedi - Dimanche</span>
                                        <span className="font-semibold text-yellow-400">{contactInfo.hours.weekend}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Social Media Card */}
                    <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-yellow-400/30 rounded-2xl p-6 hover:border-yellow-400 transition-all duration-300 shadow-xl">
                        <div className="flex items-start gap-4">
                            <div className="bg-yellow-400/20 p-3 rounded-full">
                                <span className="text-2xl">📱</span>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-yellow-400 mb-3">Réseaux Sociaux</h3>
                                <div className="flex gap-4">
                                    <a
                                        href="https://www.instagram.com/irongymofficiel"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-yellow-400/10 p-3 rounded-full hover:bg-yellow-400 hover:text-black transition-all duration-300"
                                        aria-label="Instagram"
                                    >
                                        Instagram
                                    </a>
                                    <a
                                        href="https://www.tiktok.com/@irongymofficiel"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-yellow-400/10 p-3 rounded-full hover:bg-yellow-400 hover:text-black transition-all duration-300"
                                        aria-label="TikTok"
                                    >
                                        TikTok
                                    </a>
                                    <a
                                        href="https://www.facebook.com/share/1aGGtuBjer"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-yellow-400/10 p-3 rounded-full hover:bg-yellow-400 hover:text-black transition-all duration-300"
                                        aria-label="Facebook"
                                    >
                                        Facebook
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;

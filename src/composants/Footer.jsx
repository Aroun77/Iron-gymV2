import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Instagram from "lucide-react/dist/esm/icons/instagram";
import Facebook from "lucide-react/dist/esm/icons/facebook";
import logo from "/Logo.png";

// Icône TikTok
const TikTok = (props) => (
    <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
);

const Footer = () => {
    const contactInfo = {
        address: "71 Rue Aristide Briand, 77124 Villenoy",
        phone: "01 75 78 31 28",
        email: "iron-gym@hotmail.fr",
        hours: {
            weekday: "7h - 23h",
            weekend: "9h - 20h"
        }
    };

    const navLinks = [
        { path: "/", label: "Accueil" },
        { path: "/abonnement", label: "Abonnement" },
        { path: "/machines", label: "Machines" },
        { path: "/tableau", label: "Performances" },
        { path: "/contact", label: "Contact" },
    ];

    const socialLinks = [
        {
            name: "Instagram",
            url: "https://www.instagram.com/iron_gym77/",
            icon: Instagram
        },
        {
            name: "Facebook",
            url: "https://www.facebook.com/IronGym77",
            icon: Facebook
        },
        {
            name: "TikTok",
            url: "https://www.tiktok.com/@iron_gym77",
            icon: TikTok
        },
    ];

    return (
        <footer className="bg-gradient-to-b from-black to-gray-900 border-t border-yellow-400/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Logo et Description */}
                    <div className="space-y-4">
                        <Link
                            to="/"
                            className="flex items-center gap-3 group no-underline"
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        >
                            <img
                                src={logo}
                                alt="Logo Iron Gym"
                                className="h-16 w-16 object-contain transition-transform duration-300 group-hover:scale-110"
                            />
                            <span className="text-2xl font-bold text-yellow-400">
                                IRON GYM
                            </span>
                        </Link>
                        <p className="text-white/70 text-sm">
                            Votre salle de sport à Villenoy. Power Lifting, Cross Training, Weight Lifting et Cardio Training.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 className="text-yellow-400 font-bold text-lg mb-4">Navigation</h3>
                        <ul className="space-y-2 list-none p-0 m-0">
                            {navLinks.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="text-white/70 hover:text-yellow-400 transition-colors text-sm no-underline"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Informations de Contact */}
                    <div>
                        <h3 className="text-yellow-400 font-bold text-lg mb-4">Contact</h3>
                        <ul className="space-y-3 text-sm list-none p-0 m-0">
                            <li className="flex items-start gap-2 text-white/70">
                                <MapPin className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                                <span>{contactInfo.address}</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                                <a
                                    href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                                    className="text-white/70 hover:text-yellow-400 transition-colors no-underline"
                                >
                                    {contactInfo.phone}
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                                <a
                                    href={`mailto:${contactInfo.email}`}
                                    className="text-white/70 hover:text-yellow-400 transition-colors no-underline"
                                >
                                    {contactInfo.email}
                                </a>
                            </li>
                            <li className="flex items-start gap-2 text-white/70">
                                <Clock className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                                <div>
                                    <div>Lun-Ven: {contactInfo.hours.weekday}</div>
                                    <div>Sam-Dim: {contactInfo.hours.weekend}</div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Réseaux Sociaux */}
                    <div>
                        <h3 className="text-yellow-400 font-bold text-lg mb-4">Suivez-nous</h3>
                        <div className="flex gap-4">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={social.name}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-yellow-400/10 p-3 rounded-full hover:bg-yellow-400 hover:text-black transition-all duration-300 group"
                                        aria-label={social.name}
                                    >
                                        <Icon className="w-5 h-5 text-yellow-400 group-hover:text-black transition-colors" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 pt-8 border-t border-yellow-400/10 text-center">
                    <p className="text-white/50 text-sm">
                        © {new Date().getFullYear()} Iron Gym. Tous droits réservés.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

import React from 'react';
import { MessageCircle, Mail, Instagram } from 'lucide-react';

const Footer = () => {
    return (
        <footer id="contact" className="bg-green-deep text-background py-16 px-6 rounded-t-[3rem] relative overflow-hidden">
            {/* Decorative Blur */}
            <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black/5 to-transparent pointer-events-none"></div>

            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-4xl md:text-6xl font-disco mb-8 text-pink-pale tracking-wide">
                    Let's make this happen.
                </h2>
                <p className="text-lg md:text-xl font-sans text-green-light/90 mb-10 max-w-2xl mx-auto font-medium">
                    Enquiry based pricing for workshops and custom orders. Drop us a message—we don't bite (usually).
                </p>

                <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-16">
                    <a
                        href="https://wa.me/918825836031"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 bg-pink-hot text-background px-8 py-3 rounded-full font-serif text-lg hover:bg-white hover:text-pink-hot transition-all duration-300"
                    >
                        <MessageCircle size={24} />
                        WhatsApp Us
                    </a>
                    <a
                        href="mailto:Crossfadearthousea@gmail.com"
                        className="flex items-center gap-3 border border-pink-pale text-pink-pale px-8 py-3 rounded-full font-serif text-lg hover:bg-pink-pale hover:text-green-deep transition-all duration-300"
                    >
                        <Mail size={24} />
                        Email Us
                    </a>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-end border-t border-green-light/30 pt-8 text-green-light/90 text-base font-sans gap-8">
                    <div className="flex flex-col text-left">
                        <p className="mb-2 uppercase tracking-widest text-pink-hot font-bold">Location</p>
                        <p className="font-medium">No Permanent Store.<br />We are everywhere (mostly client venues & pop-ups).</p>
                    </div>
                    <div className="text-center md:text-right font-medium">
                        <p>&copy; {new Date().getFullYear()} Crossfade Art House.</p>
                        <p>Designed with ❤️</p>
                        <p className="mt-2 text-sm opacity-90 font-bold text-pink-pale">Powered by Akzorium Media and Tech</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

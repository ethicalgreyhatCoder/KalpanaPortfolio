import React from 'react';

const Contact = () => {
    return (
        <section id="contact" className="min-h-[70vh] flex flex-col justify-between py-20 bg-theme-text text-white">
            <div className="container mx-auto px-6 text-center flex-grow flex flex-col justify-center">
                <p className="text-theme-accent tracking-widest uppercase text-sm mb-6 font-medium">Start a Conversation</p>
                <h2 className="text-5xl mobile-lg:text-7xl font-serif font-black mb-12 text-white leading-tight">
                    Let's Create<br />Magic Together.
                </h2>

                <button className="inline-block px-12 py-5 border-2 border-white rounded-full text-lg text-white hover:bg-white hover:text-theme-text transition-all duration-300 mx-auto uppercase tracking-wider font-medium">
                    Book a Consultation
                </button>
            </div>

            <div className="container mx-auto px-6 mt-20 flex flex-col mobile-lg:flex-row justify-between items-center text-sm text-gray-400 border-t border-gray-700 pt-8">
                <p>&copy; 2025 Kalpana Portfolio.</p>
                <div className="flex gap-8 mt-4 mobile-lg:mt-0 uppercase tracking-wider text-xs font-bold">
                    <a href="#" className="hover:text-theme-accent transition-colors">Instagram</a>
                    <a href="#" className="hover:text-theme-accent transition-colors">LinkedIn</a>
                    <a href="#" className="hover:text-theme-accent transition-colors">Email</a>
                </div>
            </div>
        </section>
    );
};

export default Contact;

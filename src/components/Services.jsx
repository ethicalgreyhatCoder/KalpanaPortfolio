import React from 'react';

const Services = () => {
    const services = [
        { title: 'Bridal Makeup', desc: 'Timeless elegance for your special day.' },
        { title: 'Editorial & Fashion', desc: 'Avant-garde looks for high-fashion shoots.' },
        { title: 'HD Photoshoot', desc: 'Flawless finishes for the camera lens.' },
        { title: 'Consultation', desc: 'Personalized beauty advice and trials.' }
    ];

    return (
        <section id="services" className="py-32 bg-theme-bg">
            <div className="container mx-auto px-6 max-w-4xl">
                <h2 className="text-4xl font-bold mb-16 text-center text-theme-text font-serif">Services</h2>

                <div className="divide-y divide-theme-border">
                    {services.map((service, index) => (
                        <div key={index} className="flex flex-col mobile-lg:flex-row justify-between py-10 group hover:bg-theme-surface transition-colors duration-300 px-6 rounded-lg">
                            <h3 className="text-2xl font-serif text-theme-text group-hover:text-theme-accent transition-colors">
                                {service.title}
                            </h3>
                            <p className="text-theme-text/70 mt-4 mobile-lg:mt-0 font-sans max-w-md text-right mobile-lg:text-left">
                                {service.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;

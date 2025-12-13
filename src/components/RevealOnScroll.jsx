import React, { useEffect, useRef, useState } from 'react';

const RevealOnScroll = ({ children, className = "" }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIsVisible(entry.isIntersecting);
        }, { threshold: 0.1 });

        if (ref.current) observer.observe(ref.current);

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref} className={`${className} transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0 reveal-visible' : 'opacity-0 translate-y-10'}`}>
            {children}
        </div>
    );
};

export default RevealOnScroll;

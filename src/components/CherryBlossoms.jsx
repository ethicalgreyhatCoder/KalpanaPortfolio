import React, { useState, useEffect, useMemo } from 'react';

const CherryBlossoms = React.memo(() => {
    const [petalCount, setPetalCount] = useState(50);

    useEffect(() => {
        const updateCount = () => {
            setPetalCount(window.innerWidth < 768 ? 40 : 50);
        };

        // Initial check
        updateCount();

        // Add resize listener
        window.addEventListener('resize', updateCount);
        return () => window.removeEventListener('resize', updateCount);
    }, []);

    const petalStyles = useMemo(() =>
        Array.from({ length: petalCount }, () => ({
            // eslint-disable-next-line react-hooks/purity
            left: `${Math.random() * 100}%`,
            top: '-50px',
            // eslint-disable-next-line react-hooks/purity
            width: `${Math.random() * 10 + 10}px`,
            // eslint-disable-next-line react-hooks/purity
            height: `${Math.random() * 10 + 10}px`,
            // eslint-disable-next-line react-hooks/purity
            animationDelay: `${Math.random() * 10}s`,
            // eslint-disable-next-line react-hooks/purity
            animationDuration: `${Math.random() * 10 + 10}s`
        }))
        , [petalCount]);

    return (
        <div className="cherry-blossom-container fixed inset-0 pointer-events-none -z-1 overflow-hidden">
            {petalStyles.map((style, i) => (
                <div key={i} className="petal" style={style}></div>
            ))}
        </div>
    );
});

export default CherryBlossoms;

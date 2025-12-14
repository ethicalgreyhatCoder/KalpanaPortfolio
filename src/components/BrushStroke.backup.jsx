import React, { useState, useEffect } from 'react';
import './BrushStroke.css';

const BrushStroke = ({ color, colorName, index }) => {
    const [useAsset, setUseAsset] = useState(false);
    const [assetLoaded, setAssetLoaded] = useState(false);

    // Check if brush stroke asset exists
    useEffect(() => {
        const img = new Image();
        img.src = `/assets/brush-stroke-${index + 1}.png`;

        img.onload = () => {
            setUseAsset(true);
            setAssetLoaded(true);
        };

        img.onerror = () => {
            setUseAsset(false);
            setAssetLoaded(true);
        };
    }, [index]);

    // Render image-based brush stroke if available
    if (useAsset && assetLoaded) {
        return (
            <div className="brush-stroke-wrapper" style={{ '--brush-color': color }}>
                <div className="brush-stroke-image-container">
                    <img
                        src={`/assets/brush-stroke-${index + 1}.png`}
                        alt={colorName}
                        className="brush-stroke-asset"
                        style={{ filter: `hue-rotate(${index * 30}deg)` }}
                    />
                    <span className="brush-color-name">{colorName}</span>
                </div>
            </div>
        );
    }

    // Fallback to organic circular SVG shape
    return (
        <div className="brush-stroke-wrapper" style={{ '--brush-color': color }}>
            <svg
                className="brush-stroke-svg-organic"
                viewBox="0 0 60 60"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <radialGradient id={`radial-${index}`}>
                        <stop offset="0%" style={{ stopColor: color, stopOpacity: 1 }} />
                        <stop offset="70%" style={{ stopColor: color, stopOpacity: 0.95 }} />
                        <stop offset="100%" style={{ stopColor: color, stopOpacity: 0.85 }} />
                    </radialGradient>
                    <filter id={`soft-shadow-${index}`}>
                        <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
                        <feOffset dx="0" dy="1" result="offsetblur" />
                        <feFlood floodColor="rgba(0,0,0,0.15)" />
                        <feComposite in2="offsetblur" operator="in" />
                        <feMerge>
                            <feMergeNode />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Organic circular base - no borders */}
                <ellipse
                    cx="30"
                    cy="30"
                    rx="24"
                    ry="26"
                    fill={`url(#radial-${index})`}
                    filter={`url(#soft-shadow-${index})`}
                    className="organic-shape"
                    style={{
                        transform: `rotate(${index * 15}deg)`,
                        transformOrigin: '30px 30px'
                    }}
                />

                {/* Inner highlight for depth */}
                <ellipse
                    cx="27"
                    cy="26"
                    rx="11"
                    ry="13"
                    fill="rgba(255, 255, 255, 0.3)"
                    className="inner-highlight"
                    style={{
                        filter: 'blur(2px)',
                        transform: `rotate(${index * 15}deg)`,
                        transformOrigin: '27px 26px'
                    }}
                />
            </svg>
            <span className="brush-color-name">{colorName}</span>
        </div>
    );
};

export default BrushStroke;


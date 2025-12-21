import React from 'react';
import './BrushStroke.css';

const BrushStroke = ({ color, colorName, index }) => {
    return (
        <div className="brush-stroke-wrapper" style={{ '--brush-color': color }}>
            <svg
                className="brush-stroke-svg-organic"
                viewBox="0 0 60 60"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    {/* Main radial gradient for base color */}
                    <radialGradient id={`radial-${index}`}>
                        <stop offset="0%" style={{ stopColor: color, stopOpacity: 1 }} />
                        <stop offset="70%" style={{ stopColor: color, stopOpacity: 0.95 }} />
                        <stop offset="100%" style={{ stopColor: color, stopOpacity: 0.85 }} />
                    </radialGradient>

                    {/* Linear gradient for highlight - lower-right to upper-left */}
                    <linearGradient id={`highlight-${index}`} x1="100%" y1="100%" x2="0%" y2="0%">
                        <stop offset="0%" style={{ stopColor: color, stopOpacity: 0 }} />
                        <stop offset="50%" style={{ stopColor: color, stopOpacity: 0.3 }} />
                        <stop offset="100%" style={{ stopColor: color, stopOpacity: 0.6 }} />
                    </linearGradient>

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

                {/* Organic circular base */}
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

                {/* Gradient highlight instead of white patch - lower-right to upper-left */}
                <ellipse
                    cx="30"
                    cy="30"
                    rx="14"
                    ry="16"
                    fill={`url(#highlight-${index})`}
                    className="inner-highlight"
                    style={{
                        filter: 'blur(3px)',
                        transform: `rotate(${index * 15}deg)`,
                        transformOrigin: '30px 30px'
                    }}
                />
            </svg>
            <span className="brush-color-name">{colorName}</span>
        </div>
    );
};

export default BrushStroke;



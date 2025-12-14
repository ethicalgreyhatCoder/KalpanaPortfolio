import React, { useEffect, useRef, useState } from 'react';
import { skillsData, getSkillById } from '../data/skillsData';
import SkillModal from './SkillModal';
import './Skills.css';

const Skills = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [selectedSkillId, setSelectedSkillId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Trigger animation on scroll in AND scroll out
                if (entry.isIntersecting) {
                    setIsVisible(true);
                } else {
                    setIsVisible(false);
                }
            },
            {
                threshold: 0.15,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        const currentRef = sectionRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    const handleSkillClick = (skill) => {
        if (skill.clickable && skill.id) {
            setSelectedSkillId(skill.id);
            setIsModalOpen(true);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedSkillId(null), 300);
    };

    const selectedSkill = selectedSkillId ? getSkillById(selectedSkillId) : null;

    return (
        <>
            <section id="skills" className="skills-section" ref={sectionRef}>
                <div className="skills-container">
                    {/* Section Title */}
                    <h2 className="skills-title">Skills & Expertise</h2>

                    {/* Skills Cards - Stacked Vertically on Mobile */}
                    <div className="skills-cards">

                        {/* Card 1: Makeup Skills */}
                        <div className={`skill-card ${isVisible ? 'visible' : ''}`}>
                            <h3 className="card-title">{skillsData.makeup.title}</h3>
                            <p className="card-subtitle">{skillsData.makeup.subtitle}</p>

                            {skillsData.makeup.skillGroups.map((group, groupIndex) => (
                                <div key={groupIndex}>
                                    <ul className="skills-list">
                                        {group.skills.map((skill, skillIndex) => (
                                            <li
                                                key={skillIndex}
                                                className={`skill-item ${skill.clickable ? 'skill-item-clickable' : ''}`}
                                                onClick={() => handleSkillClick(skill)}
                                                role={skill.clickable ? 'button' : undefined}
                                                tabIndex={skill.clickable ? 0 : undefined}
                                                aria-expanded={skill.clickable && isModalOpen && selectedSkillId === skill.id ? 'true' : undefined}
                                                onKeyDown={(e) => {
                                                    if (skill.clickable && (e.key === 'Enter' || e.key === ' ')) {
                                                        e.preventDefault();
                                                        handleSkillClick(skill);
                                                    }
                                                }}
                                            >
                                                <span className="skill-icon">
                                                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                                                        <circle cx="4" cy="4" r="3" fill="currentColor" opacity="0.9"/>
                                                    </svg>
                                                </span>
                                                <span className="skill-text">{skill.title}</span>
                                                {skill.clickable && (
                                                    <svg className="skill-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <polyline points="9 18 15 12 9 6"></polyline>
                                                    </svg>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                    {groupIndex < skillsData.makeup.skillGroups.length - 1 && (
                                        <div className="skill-group-divider"></div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Card 2: Business Skills */}
                        <div className={`skill-card skill-card-delayed ${isVisible ? 'visible' : ''}`}>
                            <h3 className="card-title">{skillsData.business.title}</h3>
                            <p className="card-subtitle">{skillsData.business.subtitle}</p>

                            {skillsData.business.skillGroups.map((group, groupIndex) => (
                                <div key={groupIndex}>
                                    <ul className="skills-list">
                                        {group.skills.map((skill, skillIndex) => (
                                            <li
                                                key={skillIndex}
                                                className={`skill-item ${skill.clickable ? 'skill-item-clickable' : ''}`}
                                                onClick={() => handleSkillClick(skill)}
                                                role={skill.clickable ? 'button' : undefined}
                                                tabIndex={skill.clickable ? 0 : undefined}
                                                aria-expanded={skill.clickable && isModalOpen && selectedSkillId === skill.id ? 'true' : undefined}
                                                onKeyDown={(e) => {
                                                    if (skill.clickable && (e.key === 'Enter' || e.key === ' ')) {
                                                        e.preventDefault();
                                                        handleSkillClick(skill);
                                                    }
                                                }}
                                            >
                                                <span className="skill-icon">
                                                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                                                        <circle cx="4" cy="4" r="3" fill="currentColor" opacity="0.9"/>
                                                    </svg>
                                                </span>
                                                <span className="skill-text">{skill.title}</span>
                                                {skill.clickable && (
                                                    <svg className="skill-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <polyline points="9 18 15 12 9 6"></polyline>
                                                    </svg>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                    {groupIndex < skillsData.business.skillGroups.length - 1 && (
                                        <div className="skill-group-divider"></div>
                                    )}
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </section>

            {/* Skill Detail Modal */}
            <SkillModal
                skill={selectedSkill}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </>
    );
};

export default Skills;

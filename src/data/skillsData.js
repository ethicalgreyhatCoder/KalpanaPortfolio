// ========================================
// SKILLS & EXPERTISE DATA
// Interactive system with bottom-sheet modals
// ========================================

export const skillsData = {
    makeup: {
        title: "Makeup Skills",
        subtitle: "Crafting beauty with precision and care.",
        skillGroups: [
            {
                // Core Artistry - Interactive
                skills: [
                    {
                        id: "bridal-makeup",
                        title: "Bridal Makeup",
                        clickable: true,
                        tagline: "Creating timeless bridal looks that last from ceremony to celebration.",
                        experience: [
                            "3+ years of bridal makeup experience",
                            "Gujarati, Rajasthani & Marathi brides",
                            "Long-wear, sweat-proof techniques",
                            "Customized for rituals & traditional attire"
                        ],
                        approach: "My focus is enhancing confidence and celebrating each bride's unique beauty, not masking identity.",
                        practical: "I adapt techniques based on skin type, wedding duration, climate, and cultural traditions to ensure flawless results throughout the day."
                    },
                    {
                        id: "skin-prep",
                        title: "Skin Prep & Color Theory",
                        clickable: true,
                        tagline: "The foundation of flawless makeup starts with understanding skin.",
                        experience: [
                            "Advanced color theory training",
                            "Skin analysis & undertone matching",
                            "Custom prep routines for different skin types",
                            "Corrective techniques for various concerns"
                        ],
                        approach: "Great makeup isn't about covering—it's about preparing the canvas and choosing colors that harmonize with natural skin tones.",
                        practical: "I assess hydration levels, texture, and undertones before selecting products, ensuring makeup blends seamlessly and lasts beautifully."
                    },
                    {
                        id: "face-shape",
                        title: "Face Shape Analysis",
                        clickable: true,
                        tagline: "Enhancing natural features through strategic contour and placement.",
                        experience: [
                            "Facial structure analysis training",
                            "Customized contour mapping",
                            "Feature-balancing techniques",
                            "Strategic highlight placement"
                        ],
                        approach: "Every face tells a story. My job is to highlight what makes you uniquely beautiful.",
                        practical: "I analyze bone structure, proportions, and features to create customized makeup maps that enhance rather than alter."
                    }
                ]
            },
            {
                // Professional Practice - Static
                skills: [
                    {
                        title: "Product Knowledge",
                        clickable: false
                    },
                    {
                        title: "Hygiene & Sanitation",
                        clickable: false
                    }
                ]
            }
        ]
    },
    business: {
        title: "Business & Management Skills",
        subtitle: "Supporting creativity with business intelligence.",
        skillGroups: [
            {
                // Client & Brand - Interactive
                skills: [
                    {
                        id: "branding",
                        title: "Branding & Personal Marketing",
                        clickable: true,
                        tagline: "Building a memorable brand that attracts the right clients.",
                        experience: [
                            "BBA with marketing concentration",
                            "Personal brand development",
                            "Visual identity & consistency",
                            "Client positioning strategies"
                        ],
                        approach: "Your brand is the promise you make before the brush ever touches skin. It must be authentic, consistent, and memorable.",
                        practical: "I've developed cohesive branding across social media, portfolio, and client touchpoints—from visual aesthetics to tone of voice."
                    },
                    {
                        id: "crm",
                        title: "Client Relationship Management",
                        clickable: true,
                        tagline: "Turning first-time clients into lifelong advocates.",
                        experience: [
                            "Client journey mapping",
                            "Communication & follow-up systems",
                            "Feedback integration",
                            "Referral program development"
                        ],
                        approach: "Great client relationships aren't transactional—they're built on trust, communication, and consistent delivery.",
                        practical: "I maintain organized client databases, follow-up schedules, and personalized touchpoints that keep clients engaged beyond the booking."
                    }
                ]
            },
            {
                // Business Foundation - Static
                skills: [
                    {
                        title: "Pricing & Budgeting",
                        clickable: false
                    },
                    {
                        title: "Social Media Strategy",
                        clickable: false
                    },
                    {
                        title: "Entrepreneurship Basics",
                        clickable: false
                    }
                ]
            }
        ]
    }
};

// Helper function to get skill by ID
export const getSkillById = (skillId) => {
    const allSkills = [
        ...skillsData.makeup.skillGroups.flatMap(group => group.skills),
        ...skillsData.business.skillGroups.flatMap(group => group.skills)
    ];
    return allSkills.find(skill => skill.id === skillId);
};


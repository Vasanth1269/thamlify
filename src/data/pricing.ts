import type { IPricing } from "../types";

export const pricingData: IPricing[] = [
    {
        name: "Basic",
        price: 29,
        period: "month",
        features: [
            "50 AI thumbnails / month",
            "YouTube presets",
            "HD exports",
            "Basic styles",
            "Community support"
        ],
        mostPopular: false
    },
    {
        name: "Pro",
        price: 79,
        period: "month",
        features: [
            "Unlimited thumbnails",
            "Advanced AI styles",
            "Background removal",
            "Brand colors & text",
            "Fast generation",
            "Commercial use",
            "Priority support"
        ],
        mostPopular: true
    },
    {
        name: "Enterprise",
        price: 199,
        period: "month",
        features: [
            "Everything in Pro",
            "Team access",
            "Brand kits",
            "Unlimited exports",
            "API access",
            "Dedicated support"
        ],
        mostPopular: false
    }
];


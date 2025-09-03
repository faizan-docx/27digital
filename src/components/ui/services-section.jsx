"use client";
import React from "react";
import { FlipCard } from "./flip-card";

export const ServicesSection = () => {
  const services = [
    {
      title: "Website Development",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=600&fit=crop&crop=center",
      description: "Whether you need an intuitive corporate site or fully-loaded eCommerce portal, our experts can meet your vision. We'll purchase your domain, assist with hosting, and ensure your site loads fast and functions properly. With an eye on aesthetics and usability, we build websites that effectively attract, engage, and convert visitors."
    },
    {
      title: "SEO",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=600&fit=crop&crop=center",
      description: "SEO strategies are tailored to help you attract more of your ideal visitors and achieve measurable growth. Analytics and audits of your content, site structure, Google Business Profile, and citations uncover specific opportunities for improvement. With targeted optimisations, your website becomes a trusted destination that searchers rely on for solutions. Expect improved ranking, organic growth, and enhanced brand visibility that steadily builds over time."
    },
    {
      title: "Performance Advertising",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=600&fit=crop&crop=center",
      description: "Your paid campaigns can be managed across platforms like Google, Meta, LinkedIn, X, and more, tailored to meet your specific goals. Leverage programmatic advertising to extend your reach to users as they browse apps, websites, or the wider internet. We use optimisations to connect you with the best suited audiences and tailor them into customers. Whether the focus is brand awareness or lead generation, we demonstrate the true value of your advertising investments using data-driven insights."
    }
  ];

  return (
    <div className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive digital solutions to help your business grow and succeed online
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {services.map((service, index) => (
            <FlipCard key={index} className="w-full md:w-auto">
              <div className="relative h-full">
                <img
                  src={service.image}
                  alt={service.title}
                  className="size-full rounded-2xl object-cover shadow-2xl shadow-black/40"
                />
                <div className="absolute bottom-4 left-4 text-xl font-bold text-white">
                  {service.title}
                </div>
              </div>
              <div className="flex min-h-full flex-col gap-2">
                <h1 className="text-xl font-bold text-white">{service.title}</h1>
                <p className="mt-1 border-t border-t-gray-200 py-4 text-base font-medium leading-normal text-gray-100">
                  {service.description}
                </p>
              </div>
            </FlipCard>
          ))}
        </div>
      </div>
    </div>
  );
};

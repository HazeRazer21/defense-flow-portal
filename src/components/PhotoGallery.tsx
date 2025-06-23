
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const PhotoGallery = () => {
  const [activeTab, setActiveTab] = useState('Classes');
  
  const tabs = ['Classes', 'Events', 'Facilities'];
  
  const galleryImages = {
    Classes: [
      {
        src: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=800&h=600&fit=crop',
        alt: 'Martial Arts Training Session'
      },
      {
        src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
        alt: 'Self Defense Training'
      },
      {
        src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop',
        alt: 'Online Learning Platform'
      }
    ],
    Events: [
      {
        src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
        alt: 'Tournament Event'
      },
      {
        src: 'https://images.unsplash.com/photo-1549576490-b0b4831ef60a?w=800&h=600&fit=crop',
        alt: 'Martial Arts Competition'
      }
    ],
    Facilities: [
      {
        src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
        alt: 'Training Facility'
      },
      {
        src: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop',
        alt: 'Modern Equipment'
      }
    ]
  };

  return (
    <section className="py-20 bg-martial-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Photo Gallery
          </h2>
          <p className="text-xl text-gray-300">
            See our academy in action
          </p>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-martial-gray rounded-lg p-2">
            {tabs.map((tab) => (
              <Button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`mx-1 ${
                  activeTab === tab
                    ? 'bg-martial-purple text-white'
                    : 'bg-transparent text-gray-300 hover:text-white'
                }`}
              >
                {tab}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages[activeTab as keyof typeof galleryImages].map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg bg-martial-gray aspect-video card-hover"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-martial-purple/0 group-hover:bg-martial-purple/20 transition-colors duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhotoGallery;

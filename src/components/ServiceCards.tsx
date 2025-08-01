import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Video, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServiceCards = () => {
  const services = [
    {
      icon: Calendar,
      title: 'Book a Class',
      description: 'Reserve your spot in upcoming classes. View schedule and book online.',
      actions: [
        { label: 'Book Now', primary: true, href: '/classes' },
        { label: 'View Schedule', primary: false, href: '/classes' }
      ]
    },
    {
      icon: User,
      title: 'Membership Plans',
      description: 'Explore flexible membership options and manage your subscription.',
      actions: [
        { label: 'Join Now', primary: true, href: '/signup' },
        { label: 'See Plans', primary: false, href: '/classes' }
      ]
    },
    {
      icon: Video,
      title: 'Learning Videos',
      description: 'Access premium training videos and martial arts techniques.',
      actions: [
        { label: 'Watch Videos', primary: true, href: '/videos' },
        { label: 'Browse Library', primary: false, href: '/videos' }
      ]
    }
  ];

  return (
    <section className="py-20 bg-martial-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Your Journey Starts Here
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choose your path to martial arts mastery with our comprehensive training programs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="bg-martial-dark border-martial-gray card-hover group"
            >
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-martial-purple/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-martial-purple/30 transition-colors duration-300">
                  <service.icon className="w-8 h-8 text-martial-purple" />
                </div>
                <CardTitle className="text-2xl font-bold text-white mb-2">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-gray-300 text-lg">
                  {service.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {service.actions.map((action, actionIndex) => (
                  <Link key={actionIndex} to={action.href}>
                    <Button
                      className={action.primary ? 'btn-primary w-full' : 'btn-secondary w-full'}
                    >
                      {action.label}
                    </Button>
                  </Link>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCards;

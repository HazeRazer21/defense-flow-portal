
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Users, MapPin } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Classes = () => {
  const [selectedClass, setSelectedClass] = useState<number | null>(null);

  const classes = [
    {
      id: 1,
      name: 'Basic Self Defense',
      instructor: 'Master Chen',
      date: '2024-01-15',
      time: '18:00 - 19:30',
      duration: '90 minutes',
      location: 'Main Dojo',
      capacity: 15,
      enrolled: 8,
      price: 50,
      level: 'Beginner',
      description: 'Learn fundamental self-defense techniques for everyday situations.'
    },
    {
      id: 2,
      name: 'Advanced Combat Training',
      instructor: 'Sensei Rodriguez',
      date: '2024-01-17',
      time: '19:00 - 20:30',
      duration: '90 minutes',
      location: 'Training Hall A',
      capacity: 12,
      enrolled: 5,
      price: 75,
      level: 'Advanced',
      description: 'Advanced techniques for experienced practitioners.'
    },
    {
      id: 3,
      name: 'Women\'s Self Defense',
      instructor: 'Master Sarah',
      date: '2024-01-20',
      time: '10:00 - 11:30',
      duration: '90 minutes',
      location: 'Main Dojo',
      capacity: 20,
      enrolled: 12,
      price: 55,
      level: 'All Levels',
      description: 'Specialized self-defense techniques designed for women.'
    }
  ];

  const handleBookClass = (classId: number) => {
    setSelectedClass(classId);
    console.log('Booking class:', classId);
    // TODO: Implement actual booking logic
  };

  return (
    <div className="min-h-screen bg-martial-dark">
      <Navigation />
      
      <div className="pt-20 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Class Schedule
            </h1>
            <p className="text-xl text-gray-300">
              Book your spot in our upcoming training sessions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {classes.map((classItem) => (
              <Card key={classItem.id} className="bg-martial-gray border-martial-gray card-hover">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl text-white">
                      {classItem.name}
                    </CardTitle>
                    <Badge 
                      variant="secondary" 
                      className={`${
                        classItem.level === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                        classItem.level === 'Advanced' ? 'bg-red-500/20 text-red-400' :
                        'bg-martial-purple/20 text-martial-purple'
                      }`}
                    >
                      {classItem.level}
                    </Badge>
                  </div>
                  <p className="text-gray-300 text-sm">
                    {classItem.description}
                  </p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-300">
                      <Calendar size={16} className="mr-2" />
                      <span>{new Date(classItem.date).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-300">
                      <Clock size={16} className="mr-2" />
                      <span>{classItem.time}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-300">
                      <MapPin size={16} className="mr-2" />
                      <span>{classItem.location}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-300">
                      <Users size={16} className="mr-2" />
                      <span>{classItem.enrolled}/{classItem.capacity} enrolled</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-4">
                    <span className="text-2xl font-bold text-martial-purple">
                      ${classItem.price}
                    </span>
                    <Button 
                      onClick={() => handleBookClass(classItem.id)}
                      className="btn-primary"
                      disabled={classItem.enrolled >= classItem.capacity}
                    >
                      {classItem.enrolled >= classItem.capacity ? 'Full' : 'Book Now'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Classes;

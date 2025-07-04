
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Users, MapPin, Lock } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SubscriptionPlans from '@/components/SubscriptionPlans';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useSubscription } from '@/hooks/useSubscription';

const Classes = () => {
  const [showSubscriptionPlans, setShowSubscriptionPlans] = useState(false);
  const { user } = useAuth();
  const { subscriptionData, loading, checkSubscription } = useSubscription();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      checkSubscription();
    }
  }, [user]);

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
      level: 'Beginner',
      description: 'Learn fundamental self-defense techniques for everyday situations.',
      requiresSubscription: false
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
      level: 'Advanced',
      description: 'Advanced techniques for experienced practitioners.',
      requiresSubscription: true
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
      level: 'All Levels',
      description: 'Specialized self-defense techniques designed for women.',
      requiresSubscription: false
    }
  ];

  const handleBookClass = (classItem: any) => {
    if (!user) {
      toast({
        title: "Login Diperlukan",
        description: "Silakan login terlebih dahulu untuk mendaftar kelas",
        variant: "destructive",
      });
      return;
    }

    if (classItem.requiresSubscription && !subscriptionData.subscribed) {
      toast({
        title: "Berlangganan Diperlukan",
        description: "Kelas ini memerlukan berlangganan aktif",
        variant: "destructive",
      });
      setShowSubscriptionPlans(true);
      return;
    }

    toast({
      title: "Berhasil Mendaftar!",
      description: `Anda telah mendaftar untuk kelas ${classItem.name}`,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-martial-dark">
        <Navigation />
        <div className="pt-20 pb-20 flex items-center justify-center">
          <div className="text-white text-xl">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-martial-dark">
      <Navigation />
      
      <div className="pt-20 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Jadwal Kelas
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Pilih kelas yang sesuai dengan level dan kebutuhan Anda
            </p>

            {!user && (
              <div className="bg-martial-purple/20 border border-martial-purple rounded-lg p-6 max-w-2xl mx-auto mb-8">
                <h3 className="text-xl font-semibold text-white mb-2">
                  Login Untuk Mendaftar Kelas
                </h3>
                <p className="text-gray-300 mb-4">
                  Silakan login untuk dapat mendaftar dan mengakses kelas-kelas kami
                </p>
                <Button className="btn-primary">
                  Login Sekarang
                </Button>
              </div>
            )}

            {user && !subscriptionData.subscribed && (
              <div className="bg-martial-purple/20 border border-martial-purple rounded-lg p-6 max-w-2xl mx-auto mb-8">
                <h3 className="text-xl font-semibold text-white mb-2">
                  Berlangganan Untuk Akses Penuh
                </h3>
                <p className="text-gray-300 mb-4">
                  Dapatkan akses ke semua kelas dengan berlangganan bulanan
                </p>
                <Button 
                  className="btn-primary"
                  onClick={() => setShowSubscriptionPlans(true)}
                >
                  Lihat Paket Berlangganan
                </Button>
              </div>
            )}
          </div>

          {showSubscriptionPlans ? (
            <div className="space-y-8">
              <div className="text-center">
                <Button 
                  variant="outline" 
                  onClick={() => setShowSubscriptionPlans(false)}
                  className="text-white border-white hover:bg-white hover:text-black mb-8"
                >
                  ← Kembali ke Kelas
                </Button>
              </div>
              <SubscriptionPlans />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {classes.map((classItem) => {
                const canAccess = !classItem.requiresSubscription || subscriptionData.subscribed;
                
                return (
                  <Card key={classItem.id} className="bg-martial-gray border-martial-gray card-hover relative">
                    {classItem.requiresSubscription && !subscriptionData.subscribed && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-martial-purple text-white">
                          <Lock size={12} className="mr-1" />
                          Premium
                        </Badge>
                      </div>
                    )}

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
                          <span>{new Date(classItem.date).toLocaleDateString('id-ID')}</span>
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
                          <span>{classItem.enrolled}/{classItem.capacity} terdaftar</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center pt-4">
                        <span className="text-lg font-semibold text-gray-300">
                          Instructor: {classItem.instructor}
                        </span>
                        <Button 
                          onClick={() => handleBookClass(classItem)}
                          className={`${canAccess ? 'btn-primary' : 'bg-gray-600 hover:bg-gray-700'}`}
                          disabled={classItem.enrolled >= classItem.capacity || (!canAccess && !user)}
                        >
                          {classItem.enrolled >= classItem.capacity ? 'Penuh' : 
                           !canAccess ? 'Berlangganan' : 'Daftar'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Classes;

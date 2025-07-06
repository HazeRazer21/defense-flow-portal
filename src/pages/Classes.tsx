
import { useState, useEffect, useCallback } from 'react';
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
import { supabase } from '@/integrations/supabase/client';

const Classes = () => {
  const [showSubscriptionPlans, setShowSubscriptionPlans] = useState(false);
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { subscriptionData, loading: subscriptionLoading } = useSubscription();
  const { toast } = useToast();

  const fetchClasses = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('classes')
        .select('*')
        .order('date', { ascending: true });

      if (error) {
        throw error;
      }

      setClasses(data || []);
    } catch (error) {
      console.error('Error fetching classes:', error);
      toast({
        title: "Error",
        description: "Gagal memuat kelas. Silakan refresh halaman.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  const handleBookClass = async (classItem: any) => {
    if (!user) {
      toast({
        title: "Login Diperlukan",
        description: "Silakan login terlebih dahulu untuk mendaftar kelas",
        variant: "destructive",
      });
      return;
    }

    if (classItem.requires_subscription && !subscriptionData?.subscribed) {
      toast({
        title: "Berlangganan Diperlukan",
        description: "Kelas ini memerlukan berlangganan aktif",
        variant: "destructive",
      });
      setShowSubscriptionPlans(true);
      return;
    }

    try {
      const { error } = await supabase
        .from('class_registrations')
        .insert([
          {
            class_id: classItem.id,
            user_id: user.id
          }
        ]);

      if (error) {
        if (error.code === '23505') {
          toast({
            title: "Sudah Terdaftar",
            description: "Anda sudah terdaftar untuk kelas ini",
            variant: "destructive",
          });
          return;
        }
        throw error;
      }

      toast({
        title: "Berhasil Mendaftar!",
        description: `Anda telah mendaftar untuk kelas ${classItem.name}`,
      });

      fetchClasses();
    } catch (error) {
      console.error('Error booking class:', error);
      toast({
        title: "Error",
        description: "Gagal mendaftar kelas. Silakan coba lagi.",
        variant: "destructive",
      });
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-martial-dark">
        <Navigation />
        <div className="pt-20 pb-20 flex items-center justify-center">
          <div className="text-white text-xl">Memuat kelas...</div>
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

            {user && !subscriptionLoading && !subscriptionData?.subscribed && (
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
              {classes.length === 0 ? (
                <div className="col-span-full text-center text-gray-300">
                  <p>Belum ada kelas yang tersedia.</p>
                </div>
              ) : (
                classes.map((classItem) => {
                  const canAccess = !classItem.requires_subscription || (subscriptionData?.subscribed && !subscriptionLoading);
                  
                  return (
                    <Card key={classItem.id} className="bg-martial-gray border-martial-gray card-hover relative">
                      {classItem.requires_subscription && (!subscriptionData?.subscribed || subscriptionLoading) && (
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
                            disabled={classItem.enrolled >= classItem.capacity || (!canAccess && !user) || subscriptionLoading}
                          >
                            {subscriptionLoading ? 'Loading...' :
                             classItem.enrolled >= classItem.capacity ? 'Penuh' : 
                             !canAccess ? 'Berlangganan' : 'Daftar'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Classes;

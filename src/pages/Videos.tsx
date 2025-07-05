
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Lock, Clock, Star } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SubscriptionPlans from '@/components/SubscriptionPlans';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useSubscription } from '@/hooks/useSubscription';

const Videos = () => {
  const [showSubscriptionPlans, setShowSubscriptionPlans] = useState(false);
  const { user } = useAuth();
  const { subscriptionData, loading, checkSubscription } = useSubscription();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      checkSubscription();
    }
  }, [user]);

  const videoCategories = [
    {
      id: 1,
      title: 'Teknik Dasar',
      videos: [
        {
          id: 1,
          title: 'Sikap Dasar Bela Diri',
          duration: '12:45',
          difficulty: 'Beginner',
          thumbnail: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=300&fit=crop',
          isPremium: false
        },
        {
          id: 2,
          title: 'Pukulan & Blokir Dasar',
          duration: '18:30',
          difficulty: 'Beginner',
          thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
          isPremium: true
        }
      ]
    },
    {
      id: 2,
      title: 'Skenario Bela Diri',
      videos: [
        {
          id: 3,
          title: 'Lepas dari Cengkeraman Tangan',
          duration: '15:20',
          difficulty: 'Intermediate',
          thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop',
          isPremium: true
        },
        {
          id: 4,
          title: 'Teknik Pertahanan di Tanah',
          duration: '22:15',
          difficulty: 'Advanced',
          thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
          isPremium: true
        }
      ]
    }
  ];

  const handleVideoClick = (videoId: number, isPremium: boolean) => {
    if (!user) {
      toast({
        title: "Login Diperlukan",
        description: "Silakan login terlebih dahulu untuk menonton video",
        variant: "destructive",
      });
      return;
    }

    if (isPremium && !subscriptionData.subscribed) {
      toast({
        title: "Berlangganan Diperlukan",
        description: "Video ini memerlukan berlangganan aktif",
        variant: "destructive",
      });
      setShowSubscriptionPlans(true);
      return;
    }

    console.log('Playing video:', videoId);
    toast({
      title: "Memulai Video",
      description: "Video player akan terbuka di sini dalam implementasi lengkap",
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
              Video Pembelajaran
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Kuasai teknik bela diri dengan koleksi video pembelajaran komprehensif kami
            </p>
            
            {!user && (
              <div className="bg-martial-purple/20 border border-martial-purple rounded-lg p-6 max-w-2xl mx-auto mb-8">
                <h3 className="text-xl font-semibold text-white mb-2">
                  Login Untuk Akses Video
                </h3>
                <p className="text-gray-300 mb-4">
                  Silakan login untuk dapat mengakses video pembelajaran kami
                </p>
                <Button className="btn-primary">
                  Login Sekarang
                </Button>
              </div>
            )}

            {user && !subscriptionData.subscribed && (
              <div className="bg-martial-purple/20 border border-martial-purple rounded-lg p-6 max-w-2xl mx-auto mb-8">
                <h3 className="text-xl font-semibold text-white mb-2">
                  Buka Konten Premium
                </h3>
                <p className="text-gray-300 mb-4">
                  Dapatkan akses ke semua video premium dengan berlangganan bulanan
                </p>
                <div className="flex gap-4 justify-center">
                  <Button 
                    className="btn-primary"
                    onClick={() => setShowSubscriptionPlans(true)}
                  >
                    Berlangganan Mulai Rp 29.000/bulan
                  </Button>
                  <Button 
                    variant="outline" 
                    className="text-white border-white hover:bg-white hover:text-black"
                    onClick={() => window.location.href = '/classes'}
                  >
                    Lihat Kelas
                  </Button>
                </div>
              </div>
            )}

            {user && subscriptionData.subscribed && (
              <div className="bg-green-500/20 border border-green-500 rounded-lg p-4 max-w-2xl mx-auto mb-8">
                <p className="text-green-400">
                  ✅ Anda memiliki akses ke semua konten premium!
                </p>
                <p className="text-sm text-gray-300 mt-1">
                  Plan: {subscriptionData.subscription_tier || 'Basic'}
                </p>
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
                  ← Kembali ke Video
                </Button>
              </div>
              <SubscriptionPlans />
            </div>
          ) : (
            <>
              {videoCategories.map((category) => (
                <div key={category.id} className="mb-12">
                  <h2 className="text-3xl font-bold text-white mb-6">
                    {category.title}
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.videos.map((video) => {
                      const canWatch = !video.isPremium || subscriptionData.subscribed;
                      
                      return (
                        <Card key={video.id} className="bg-martial-gray border-martial-gray card-hover overflow-hidden">
                          <div className="relative">
                            <img 
                              src={video.thumbnail} 
                              alt={video.title}
                              className="w-full h-48 object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                              <button
                                onClick={() => handleVideoClick(video.id, video.isPremium)}
                                className="w-16 h-16 bg-martial-purple/80 rounded-full flex items-center justify-center hover:bg-martial-purple transition-colors"
                              >
                                {video.isPremium && !canWatch ? (
                                  <Lock className="w-6 h-6 text-white" />
                                ) : (
                                  <Play className="w-6 h-6 text-white ml-1" />
                                )}
                              </button>
                            </div>
                            
                            <div className="absolute top-4 right-4 flex gap-2">
                              {video.isPremium && (
                                <Badge className="bg-martial-purple text-white">
                                  <Star size={12} className="mr-1" />
                                  Premium
                                </Badge>
                              )}
                            </div>
                            
                            <div className="absolute bottom-4 right-4">
                              <Badge variant="secondary" className="bg-black/60 text-white">
                                <Clock size={12} className="mr-1" />
                                {video.duration}
                              </Badge>
                            </div>
                          </div>
                          
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg text-white">
                              {video.title}
                            </CardTitle>
                          </CardHeader>
                          
                          <CardContent>
                            <Badge 
                              variant="outline" 
                              className={`${
                                video.difficulty === 'Beginner' ? 'border-green-500 text-green-400' :
                                video.difficulty === 'Intermediate' ? 'border-yellow-500 text-yellow-400' :
                                'border-red-500 text-red-400'
                              }`}
                            >
                              {video.difficulty}
                            </Badge>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Videos;

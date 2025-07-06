
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SubscriptionPlans from '@/components/SubscriptionPlans';
import VideoCategory from '@/components/VideoCategory';
import SubscriptionStatus from '@/components/SubscriptionStatus';
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
  }, [user, checkSubscription]);

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

    if (isPremium && !subscriptionData?.subscribed) {
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
            
            <SubscriptionStatus 
              user={user}
              subscriptionData={subscriptionData}
              onShowPlans={() => setShowSubscriptionPlans(true)}
            />
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
                <VideoCategory
                  key={category.id}
                  category={category}
                  subscriptionData={subscriptionData}
                  onVideoClick={handleVideoClick}
                />
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

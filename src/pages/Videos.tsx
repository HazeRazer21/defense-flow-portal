
import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SubscriptionPlans from '@/components/SubscriptionPlans';
import VideoCategory from '@/components/VideoCategory';
import SubscriptionStatus from '@/components/SubscriptionStatus';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useSubscription } from '@/hooks/useSubscription';
import { supabase } from '@/integrations/supabase/client';

const Videos = () => {
  const [showSubscriptionPlans, setShowSubscriptionPlans] = useState(false);
  const [videoCategories, setVideoCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { subscriptionData, loading: subscriptionLoading } = useSubscription();
  const { toast } = useToast();

  const fetchVideos = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      // Group videos by category
      const groupedVideos = (data || []).reduce((acc: any, video: any) => {
        const category = video.category;
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push({
          id: video.id,
          title: video.title,
          duration: video.duration || '0:00',
          difficulty: video.difficulty,
          thumbnail: video.thumbnail_url || 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=300&fit=crop',
          isPremium: video.is_premium || false
        });
        return acc;
      }, {});

      // Convert to array format expected by VideoCategory component
      const categories = Object.keys(groupedVideos).map((categoryName, index) => ({
        id: index + 1,
        title: categoryName,
        videos: groupedVideos[categoryName]
      }));

      setVideoCategories(categories);
    } catch (error) {
      console.error('Error fetching videos:', error);
      toast({
        title: "Error",
        description: "Gagal memuat video. Silakan refresh halaman.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // Only fetch videos once on mount
  useEffect(() => {
    fetchVideos();
  }, []); // Remove dependencies to prevent refetching

  const handleVideoClick = (videoId: number, isPremium: boolean) => {
    if (!user) {
      toast({
        title: "Login Diperlukan",
        description: "Silakan login terlebih dahulu untuk menonton video",
        variant: "destructive",
      });
      return;
    }

    // Only check subscription if video is premium
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

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-martial-dark">
        <Navigation />
        <div className="pt-20 pb-20 flex items-center justify-center">
          <div className="text-white text-xl">Memuat video...</div>
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
              {videoCategories.length === 0 ? (
                <div className="text-center text-gray-300">
                  <p>Belum ada video yang tersedia. Silakan hubungi admin untuk menambahkan video.</p>
                </div>
              ) : (
                videoCategories.map((category) => (
                  <VideoCategory
                    key={category.id}
                    category={category}
                    subscriptionData={subscriptionData}
                    onVideoClick={handleVideoClick}
                  />
                ))
              )}
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Videos;

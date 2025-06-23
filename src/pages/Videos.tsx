
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Lock, Clock, Star } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PaymentModal from '@/components/PaymentModal';
import { useToast } from '@/hooks/use-toast';

const Videos = () => {
  const [userHasAccess, setUserHasAccess] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user has purchased any classes or subscriptions
    const payments = JSON.parse(localStorage.getItem('payments') || '[]');
    const hasValidPayment = payments.length > 0;
    setUserHasAccess(hasValidPayment);
  }, []);

  const subscriptionInfo = {
    name: 'Premium Video Access',
    price: 29,
    date: 'Monthly Subscription'
  };

  const videoCategories = [
    {
      id: 1,
      title: 'Basic Techniques',
      videos: [
        {
          id: 1,
          title: 'Fundamental Stances',
          duration: '12:45',
          difficulty: 'Beginner',
          thumbnail: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=300&fit=crop',
          isPremium: false
        },
        {
          id: 2,
          title: 'Basic Punches & Blocks',
          duration: '18:30',
          difficulty: 'Beginner',
          thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
          isPremium: true
        }
      ]
    },
    {
      id: 2,
      title: 'Self Defense Scenarios',
      videos: [
        {
          id: 3,
          title: 'Escape from Wrist Grab',
          duration: '15:20',
          difficulty: 'Intermediate',
          thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop',
          isPremium: true
        },
        {
          id: 4,
          title: 'Ground Defense Techniques',
          duration: '22:15',
          difficulty: 'Advanced',
          thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
          isPremium: true
        }
      ]
    }
  ];

  const handleVideoClick = (videoId: number, isPremium: boolean) => {
    if (isPremium && !userHasAccess) {
      setIsPaymentModalOpen(true);
      return;
    }
    console.log('Playing video:', videoId);
    toast({
      title: "Video Starting",
      description: "Video player would open here in a real implementation",
    });
  };

  const handlePaymentSuccess = () => {
    setUserHasAccess(true);
    setIsPaymentModalOpen(false);
    toast({
      title: "Welcome to Premium!",
      description: "You now have access to all premium video content",
    });
  };

  const handlePaymentCancel = () => {
    setIsPaymentModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-martial-dark">
      <Navigation />
      
      <div className="pt-20 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Learning Videos
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Master self-defense techniques with our comprehensive video library
            </p>
            
            {!userHasAccess && (
              <div className="bg-martial-purple/20 border border-martial-purple rounded-lg p-6 max-w-2xl mx-auto">
                <h3 className="text-xl font-semibold text-white mb-2">
                  Unlock Premium Content
                </h3>
                <p className="text-gray-300 mb-4">
                  Get access to all premium videos with our monthly subscription
                </p>
                <div className="flex gap-4 justify-center">
                  <Button 
                    className="btn-primary"
                    onClick={() => setIsPaymentModalOpen(true)}
                  >
                    Subscribe for $29/month
                  </Button>
                  <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                    View Classes
                  </Button>
                </div>
              </div>
            )}

            {userHasAccess && (
              <div className="bg-green-500/20 border border-green-500 rounded-lg p-4 max-w-2xl mx-auto">
                <p className="text-green-400">
                  ✅ You have access to all premium content!
                </p>
              </div>
            )}
          </div>

          {videoCategories.map((category) => (
            <div key={category.id} className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">
                {category.title}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.videos.map((video) => (
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
                          {video.isPremium && !userHasAccess ? (
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
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={handlePaymentCancel}
        onSuccess={handlePaymentSuccess}
        classInfo={subscriptionInfo}
      />
      
      <Footer />
    </div>
  );
};

export default Videos;

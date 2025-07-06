
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

const SubscriptionPlans = () => {
  const { subscriptionData, createCheckout, openCustomerPortal } = useSubscription();
  const { toast } = useToast();
  const { user } = useAuth();

  const plans = [
    {
      id: 'basic',
      name: 'Basic Plan',
      price: 29000,
      description: 'Akses ke kelas-kelas dasar',
      features: [
        'Akses Basic Self Defense',
        'Akses Women\'s Self Defense',
        'Dukungan email',
        'Video tutorial dasar'
      ],
      popular: false
    },
    {
      id: 'premium',
      name: 'Premium Plan',
      price: 49000,
      description: 'Akses ke semua kelas dan fitur premium',
      features: [
        'Akses semua kelas',
        'Advanced Combat Training',
        'Video tutorial premium',
        'Dukungan prioritas',
        'Jadwal kelas fleksibel'
      ],
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise Plan',
      price: 99000,
      description: 'Akses unlimited dengan pelatihan personal',
      features: [
        'Semua fitur Premium',
        'Pelatihan personal 1-on-1',
        'Akses video library lengkap',
        'Dukungan 24/7',
        'Sertifikat resmi',
        'Program diet & nutrisi'
      ],
      popular: false
    }
  ];

  const handleSubscribe = async (planType: string) => {
    if (!user) {
      toast({
        title: "Login Diperlukan",
        description: "Silakan login terlebih dahulu untuk berlangganan",
        variant: "destructive",
      });
      return;
    }

    try {
      toast({
        title: "Memproses...",
        description: "Membuat sesi pembayaran Stripe",
      });

      await createCheckout(planType);
      
      toast({
        title: "Membuka Halaman Pembayaran",
        description: "Anda akan diarahkan ke halaman pembayaran Stripe",
      });
    } catch (error) {
      console.error('Subscription error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan';
      
      toast({
        title: "Error",
        description: `Gagal membuka halaman pembayaran: ${errorMessage}`,
        variant: "destructive",
      });
    }
  };

  const handleManageSubscription = async () => {
    if (!user) {
      toast({
        title: "Login Diperlukan",
        description: "Silakan login terlebih dahulu",
        variant: "destructive",
      });
      return;
    }

    try {
      await openCustomerPortal();
      toast({
        title: "Membuka Portal Pelanggan",
        description: "Anda akan diarahkan ke portal manajemen berlangganan",
      });
    } catch (error) {
      console.error('Portal error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan';
      
      toast({
        title: "Error",
        description: `Gagal membuka portal pelanggan: ${errorMessage}`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-8">
      {subscriptionData.subscribed && (
        <div className="bg-green-500/20 border border-green-500 rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold text-white mb-2">
            Status Berlangganan: Aktif
          </h3>
          <p className="text-green-400 mb-4">
            Plan: {subscriptionData.subscription_tier || 'Basic'} 
            {subscriptionData.subscription_end && (
              <span className="block text-sm mt-1">
                Berakhir: {new Date(subscriptionData.subscription_end).toLocaleDateString('id-ID')}
              </span>
            )}
          </p>
          <Button 
            onClick={handleManageSubscription}
            className="btn-primary"
          >
            Kelola Berlangganan
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const isCurrentPlan = subscriptionData.subscribed && 
            subscriptionData.subscription_tier?.toLowerCase() === plan.id;
          
          return (
            <Card 
              key={plan.id} 
              className={`relative bg-martial-gray border-martial-gray ${
                plan.popular ? 'ring-2 ring-martial-purple' : ''
              } ${isCurrentPlan ? 'ring-2 ring-green-500' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-martial-purple text-white px-3 py-1">
                    <Star size={12} className="mr-1" />
                    Paling Populer
                  </Badge>
                </div>
              )}
              
              {isCurrentPlan && (
                <div className="absolute -top-3 right-4">
                  <Badge className="bg-green-500 text-white px-3 py-1">
                    Plan Aktif
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-white mb-2">
                  {plan.name}
                </CardTitle>
                <div className="text-3xl font-bold text-martial-purple">
                  Rp {plan.price.toLocaleString('id-ID')}
                  <span className="text-sm text-gray-300">/bulan</span>
                </div>
                <p className="text-gray-300 text-sm">{plan.description}</p>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <Check size={16} className="text-green-400 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button 
                  onClick={() => handleSubscribe(plan.id)}
                  className={`w-full ${
                    plan.popular ? 'btn-primary' : 'bg-martial-gray border border-martial-purple text-white hover:bg-martial-purple'
                  }`}
                  disabled={isCurrentPlan}
                >
                  {isCurrentPlan ? 'Plan Aktif' : 'Berlangganan Sekarang'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default SubscriptionPlans;


import { Button } from '@/components/ui/button';

interface SubscriptionStatusProps {
  user: any;
  subscriptionData: any;
  onShowPlans: () => void;
}

const SubscriptionStatus = ({ user, subscriptionData, onShowPlans }: SubscriptionStatusProps) => {
  if (!user) {
    return (
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
    );
  }

  if (!subscriptionData?.subscribed) {
    return (
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
            onClick={onShowPlans}
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
    );
  }

  return (
    <div className="bg-green-500/20 border border-green-500 rounded-lg p-4 max-w-2xl mx-auto mb-8">
      <p className="text-green-400">
        ✅ Anda memiliki akses ke semua konten premium!
      </p>
      <p className="text-sm text-gray-300 mt-1">
        Plan: {subscriptionData.subscription_tier || 'Basic'}
      </p>
    </div>
  );
};

export default SubscriptionStatus;

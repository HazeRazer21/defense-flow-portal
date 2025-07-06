
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const RegistrationsList = () => {
  const { toast } = useToast();
  
  const registrations = [
    {
      id: 1,
      studentName: 'John Doe',
      email: 'john@example.com',
      className: 'Basic Self Defense',
      date: '2024-01-15',
      paymentStatus: 'Paid',
      amount: 50
    },
    {
      id: 2,
      studentName: 'Jane Smith',
      email: 'jane@example.com',
      className: 'Women\'s Self Defense',
      date: '2024-01-20',
      paymentStatus: 'Pending',
      amount: 55
    }
  ];

  const handlePaymentConfirmation = (registrationId: number) => {
    console.log('Confirming payment for registration:', registrationId);
    toast({
      title: "Pembayaran Dikonfirmasi",
      description: "Status pembayaran telah diperbarui",
    });
  };

  return (
    <Card className="bg-martial-gray border-martial-gray">
      <CardHeader>
        <CardTitle className="text-white">Pendaftaran Terbaru</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {registrations.map((registration) => (
            <div key={registration.id} className="flex items-center justify-between p-4 bg-martial-dark rounded-lg">
              <div className="flex-1">
                <h4 className="text-white font-semibold">{registration.studentName}</h4>
                <p className="text-gray-300 text-sm">{registration.email}</p>
                <p className="text-gray-400 text-sm">
                  {registration.className} - {registration.date}
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-white font-semibold">Rp {registration.amount * 1000}</p>
                  <Badge 
                    variant={registration.paymentStatus === 'Paid' ? 'default' : 'secondary'}
                    className={registration.paymentStatus === 'Paid' ? 'bg-green-500' : 'bg-yellow-500'}
                  >
                    {registration.paymentStatus}
                  </Badge>
                </div>
                
                {registration.paymentStatus === 'Pending' && (
                  <Button
                    size="sm"
                    onClick={() => handlePaymentConfirmation(registration.id)}
                    className="btn-primary"
                  >
                    <CheckCircle size={16} className="mr-1" />
                    Konfirmasi
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RegistrationsList;

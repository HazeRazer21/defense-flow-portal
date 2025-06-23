
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { QrCode, CreditCard, X } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  classInfo: {
    name: string;
    price: number;
    date: string;
  };
}

const PaymentModal = ({ isOpen, onClose, classInfo }: PaymentModalProps) => {
  const [paymentMethod, setPaymentMethod] = useState<'qris' | 'card'>('qris');
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'success'>('pending');

  if (!isOpen) return null;

  const handlePayment = () => {
    setPaymentStatus('processing');
    
    // Simulate payment processing
    setTimeout(() => {
      setPaymentStatus('success');
      setTimeout(() => {
        onClose();
        setPaymentStatus('pending');
      }, 2000);
    }, 2000);
  };

  const generateQRISCode = () => {
    // This would generate an actual QRIS code in a real implementation
    return `QRIS_${classInfo.name}_${classInfo.price}_${Date.now()}`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-martial-gray border-martial-gray">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white">Payment</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X size={20} className="text-gray-400" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {paymentStatus === 'pending' && (
            <>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {classInfo.name}
                </h3>
                <p className="text-gray-300">{classInfo.date}</p>
                <p className="text-2xl font-bold text-martial-purple mt-2">
                  ${classInfo.price}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex gap-2">
                  <Button
                    variant={paymentMethod === 'qris' ? 'default' : 'outline'}
                    onClick={() => setPaymentMethod('qris')}
                    className="flex-1"
                  >
                    <QrCode size={16} className="mr-2" />
                    QRIS
                  </Button>
                  <Button
                    variant={paymentMethod === 'card' ? 'default' : 'outline'}
                    onClick={() => setPaymentMethod('card')}
                    className="flex-1"
                  >
                    <CreditCard size={16} className="mr-2" />
                    Card
                  </Button>
                </div>

                {paymentMethod === 'qris' && (
                  <div className="text-center space-y-4">
                    <div className="bg-white p-4 rounded-lg mx-auto w-fit">
                      <div className="w-48 h-48 bg-gray-100 flex items-center justify-center">
                        <QrCode size={64} className="text-gray-400" />
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm">
                      Scan QR code with your banking app
                    </p>
                    <p className="text-xs text-gray-400 font-mono">
                      {generateQRISCode()}
                    </p>
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-gray-300">Card Number</Label>
                      <Input
                        placeholder="1234 5678 9012 3456"
                        className="bg-martial-dark border-martial-gray text-white"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-gray-300">Expiry</Label>
                        <Input
                          placeholder="MM/YY"
                          className="bg-martial-dark border-martial-gray text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-gray-300">CVV</Label>
                        <Input
                          placeholder="123"
                          className="bg-martial-dark border-martial-gray text-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <Button onClick={handlePayment} className="btn-primary w-full">
                  Pay Now
                </Button>
              </div>
            </>
          )}

          {paymentStatus === 'processing' && (
            <div className="text-center py-8">
              <div className="animate-spin w-8 h-8 border-2 border-martial-purple border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-white">Processing payment...</p>
            </div>
          )}

          {paymentStatus === 'success' && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Payment Successful!</h3>
              <p className="text-gray-300">You have been registered for the class.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentModal;

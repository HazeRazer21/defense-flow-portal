
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, User } from 'lucide-react';

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-martial-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-300">
            Ready to start your martial arts journey? Contact us today!
          </p>
        </div>
        
        <Card className="bg-martial-gray border-martial-gray">
          <CardHeader>
            <CardTitle className="text-2xl text-white text-center">
              Send us a Message
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-gray-300 flex items-center gap-2">
                  <User size={16} />
                  Your Name
                </label>
                <Input
                  placeholder="Enter your name"
                  className="bg-martial-dark border-martial-gray text-white placeholder:text-gray-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-gray-300 flex items-center gap-2">
                  <Mail size={16} />
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-martial-dark border-martial-gray text-white placeholder:text-gray-500"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-gray-300">Message</label>
              <Textarea
                placeholder="How can we help you?"
                className="bg-martial-dark border-martial-gray text-white placeholder:text-gray-500 min-h-32"
              />
            </div>
            
            <Button className="btn-primary w-full text-lg py-3">
              Send Message
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ContactSection;

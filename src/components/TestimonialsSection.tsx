
import { Card, CardContent } from '@/components/ui/card';
import { User } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Incredible Instructors!',
      content: 'The classes are fun and challenging. I\'ve grown so much!',
      avatar: User
    },
    {
      name: 'Mike Chen',
      role: 'Welcoming Community',
      content: 'I felt at home from day one. Highly recommend!',
      avatar: User
    }
  ];

  return (
    <section className="py-20 bg-martial-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Student Testimonials
          </h2>
          <p className="text-xl text-gray-300">
            Hear from our amazing community
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-martial-dark border-martial-gray card-hover">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-martial-purple/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <testimonial.avatar className="w-6 h-6 text-martial-purple" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">
                      {testimonial.role}
                    </h4>
                    <p className="text-gray-300 mb-4 italic">
                      "{testimonial.content}"
                    </p>
                    <p className="text-martial-purple font-medium">
                      - {testimonial.name}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

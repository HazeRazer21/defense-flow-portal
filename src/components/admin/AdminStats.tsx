
import { Card, CardContent } from '@/components/ui/card';
import { Users, Calendar, Video, DollarSign } from 'lucide-react';

const AdminStats = () => {
  const stats = [
    {
      title: 'Total Students',
      value: '247',
      icon: Users,
      color: 'text-martial-purple'
    },
    {
      title: 'Active Classes',
      value: '12',
      icon: Calendar,
      color: 'text-martial-purple'
    },
    {
      title: 'Video Library',
      value: '68',
      icon: Video,
      color: 'text-martial-purple'
    },
    {
      title: 'Monthly Revenue',
      value: '$3,240',
      icon: DollarSign,
      color: 'text-martial-purple'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card key={stat.title} className="bg-martial-gray border-martial-gray">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">{stat.title}</p>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </div>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AdminStats;
